import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import capitalize           from 'lib/capitalize';
import { List }             from 'immutable';
import classSet             from 'classnames';
import { Motion, spring }   from 'react-motion';
import range                from 'lodash.range';

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val  = _arr[from];

  _arr.splice(from, 1);
  _arr.splice(to, 0, val);

  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const springConfig = [300, 50];

export default class ListView extends React.Component {
  static propTypes = {
    elements:   PropTypes.instanceOf(List).isRequired,

    reinsert:   PropTypes.func,
    onChange:   PropTypes.func,
    addNew:     PropTypes.func,

    header:     PropTypes.string,
    createUrl:  PropTypes.string,
    editing:    PropTypes.bool
  };

  state = {
    delta:       0,
    mouse:       0,
    isPressed:   false,
    lastPressed: 0,
    order:       [],
    itemHeight:  123
  };

  componentDidMount = () => {
    if(this.props.editing)
      this.bindSomeCheekyEvents();

    this.setState({
      order: range(this.props.elements.size + 1)
    });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.editing !== this.props.editing) {
      if (this.props.editing) {
        this.bindSomeCheekyEvents();
        this.setState({
          itemHeight: document.querySelector('.list-item') ? document.querySelector('.list-item').clientHeight : 0
        });
      }
      else {
        this.unbindEvents();
      }
    }

    if (this.props.elements.size !== prevProps.elements.size) {
      this.setState({
        order: range(this.props.elements.size + 1)
      });
    }
  };

  componentWillUnmount = () => {
    this.unbindEvents();
  };

  bindSomeCheekyEvents = () => {
    const container = this.refs.container;

    container.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend',  this.handlePointerUp);

    container.addEventListener('mousemove', this.handlePointerMove);
    window.addEventListener('mouseup',   this.handlePointerUp);


    window.onresize = () => {
      const itemHeight = document.querySelector('.list-item') ? document.querySelector('.list-item').clientHeight : 0;

      if(this.state.itemHeight !== itemHeight)
        this.setState({
          itemHeight
        });
    }

    window.onkeyup = this.handleKeyup;
  };

  unbindEvents = () => {
    window.removeEventListener('touchend', this.handlePointerMove);
    window.removeEventListener('mouseup',   this.handlePointerUp);

    window.onkeyup = null;
  };

  handleKeyup = (e) => {
    const el = e.target;

    const change = {
      index: el.dataset.index,
      changes: {
        [el.dataset.key]: el.textContent
      }
    };

    this.props.onChange(change)
  };
  
  handlePointerDown = (pos, pressY, { pageY }) => {
    this.setState({
      delta:       pageY - pressY,
      mouse:       pressY,
      isPressed:   true,
      lastPressed: pos
    });
  };

  handleTouchStart = (key, pressLocation, e) => {
    this.handlePointerDown(key, pressLocation, e.touches[0]);
  };

  handlePointerMove = ({ pageY }) => {
    const { isPressed, delta, order, lastPressed, itemHeight } = this.state;

    if (isPressed) {
      const mouse    = pageY - delta;
      const row      = clamp(Math.round(mouse / itemHeight), 0, this.props.elements.size - 1);
      const newOrder = reinsert(order, order.indexOf(lastPressed), row);

      // This is to sync the real list
      if(order.indexOf(lastPressed) !== row)
        this.props.reinsert(order.indexOf(lastPressed), row);

      this.setState({
        mouse: mouse,
        order: newOrder
      });
    }
  };

  handleTouchMove = (e) => {
    e.preventDefault();

    this.handlePointerMove(e.touches[0]);
  };

  handlePointerUp = ({ pageY }) => {
    this.setState({
      isPressed:   false,
      delta:       0
    });
  };

  addNew = () => {
  }

  render() {
    const { mouse, isPressed, lastPressed, order, itemHeight } = this.state;

    const classes = {
      container: classSet({
        list:               true,
        ['no-user-select']: this.props.editing,
        ['list-editing']:   this.props.editing
      })
    };

    const elements = this.props.editing ?
      this.props.elements
        .concat([{
          title:       'New',
          uneditable:  true
        }]) : this.props.elements;

    if(this.props.editing)
      return (
        <div className={classes.container} ref="container" style={{ height: `${elements.size*itemHeight + 40}px` }}>
          <div className="header">
            {
              (() => {
                return this.props.header ? <h2>{this.props.header}</h2> : null;
              })()
            }
          </div>

          <ul>
            { range(elements.size).map(i => {
                const style = (lastPressed === i && isPressed) ?
                  {
                    scale:  spring(1.03, springConfig),
                    shadow: spring(6, springConfig),
                    y:      mouse
                  }
                  :
                  {
                    scale:  spring(1, springConfig),
                    shadow: spring(0, springConfig),
                    y:      spring(order.indexOf(i) * itemHeight, springConfig)
                  };

                const isNewButton = (i === elements.size - 1);

                return (
                  <Motion style={style} key={i}>
                    {({ scale, shadow, y }) => {
                        const element   = elements.get(order.indexOf(i));
                        let subElements = [];

                        const prefix = isNewButton ? '' : (order.indexOf(i) + 1) + '. ';

                       subElements.push(
                         <span className="title" key="title" contentEditable={!element.uneditable} data-index={i} data-key="title">
                           {element.title}
                         </span>
                       );

                        if(element.description) {
                          subElements.push(
                              <span className="separator" key="separator">
                                &nbsp;
                              </span>
                          );

                          subElements.push(
                            <span className="description" key="description" contentEditable={!element.uneditable} data-index={i} data-key="description">
                              <em>{element.description}</em>
                            </span>
                          );
                        }

                       subElements.push(
                         <span className="adendum" key="adendum">
                           {element.adendum}
                         </span>
                       );

                        const liStyle = {
                          position:        'absolute',
                          width:           '100%',
                          left:            '50%',
                          marginLeft:      '-45%',
                          borderBottom:    '1px solid lightgrey',
                          boxShadow:       `rgba(0, 0, 0, 0.8) ${shadow}px ${shadow}px 0px 0px`,
                          transform:       `translate3d(0, ${y}px, 0) scale(${scale})`,
                          WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                          zIndex:          (i === lastPressed) ? 99 : i
                        };

                        if(isNewButton)
                          return (
                            <li
                              className="clickable list-item"
                              style={liStyle}
                              onClick={this.props.addNew}>
                              {subElements}
                            </li>
                          )
                        return (
                          <li
                            className="list-item"
                            onMouseDown={  isNewButton ? ()=>({}) : this.handlePointerDown.bind(null, i, y)}
                            onTouchStart={ isNewButton ? ()=>({}) : this.handleTouchStart.bind(null, i, y)}
                            style={liStyle}>
                            {subElements}
                          </li>
                        );
                      }
                    }
                  </Motion>
                )
              })
            }
          </ul>
        </div>
      );

    return (
      <div className={classSet(classes.container)} ref="container">
        <div className="header">
          {
            (() => {
              return this.props.header ? <h2>{this.props.header}</h2> : null;
            })()
          }
        </div>

        <ul>
          {
            elements.map((element, index) => {
              let subElements = [];

              if(element.title)
                subElements.push(
                  <span className="title" key="title">
                    {index + 1 + '. ' + capitalize(element.title)}
                  </span>
                );

              if(element.description) {
                subElements.push(
                    <span className="separator" key="separator">
                      &nbsp;
                    </span>
                );

                subElements.push(
                  <span className="description" key="description">
                    <em>{element.description}</em>
                  </span>
                );
              }

              if(element.adendum)
                subElements.push(
                  <span className="adendum" key="adendum">
                    {element.adendum}
                  </span>
                );

              return (
                <Link to={element.href} key={index}>
                  <li ref={'listitem-' + index} data-index={index} className="clickable list-item">
                    {subElements}
                  </li>
                </Link>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
