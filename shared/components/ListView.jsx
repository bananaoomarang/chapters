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
    header:     PropTypes.string,
    createUrl:  PropTypes.string,
    onReorder:  PropTypes.func,
    editing:   PropTypes.bool,
    handleSave: PropTypes.func
  }

  state = {
    delta:       0,
    mouse:       0,
    isPressed:   false,
    lastPressed: 0,
    order:       [],
    itemHeight:  123
  }

  componentDidMount = () => {
    if(this.props.editing)
      this.bindSomeCheekyEvents();

    this.setState({
      order: range(this.props.elements.count())
    });
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.editing !== this.props.editing) {
      if(this.props.editing) this.bindSomeCheekyEvents();
      else                   this.unbindEvents();
    }
    
    if (this.props.elements !== prevProps.elements)
      this.setState({
        order: range(this.props.elements.count())
      });
  }

  componentWillUnmount = () => {
    this.unbindEvents();
  }

  bindSomeCheekyEvents = () => {
    const container = this.refs.container;

    container.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend',  this.handlePointerUp);

    container.addEventListener('mousemove', this.handlePointerMove);
    window.addEventListener('mouseup',   this.handlePointerUp);
  }

  unbindEvents = () => {
    window.removeEventListener('touchend', this.handlePointerMove);
    window.removeEventListener('mouseup',   this.handlePointerUp);
  }

  handlePointerDown = (pos, pressY, { pageY }) => {
    this.setState({
      delta:       pageY - pressY,
      mouse:       pressY,
      isPressed:   true,
      lastPressed: pos 
    });
  }

  handleTouchStart = (key, pressLocation, e) => {
    this.handlePointerDown(key, pressLocation, e.touches[0]);
  }

  handlePointerMove = ({ pageY }) => {
    const { isPressed, delta, order, lastPressed } = this.state;

    if (isPressed) {
      const mouse    = pageY - delta;
      const row      = clamp(Math.round(mouse / this.state.itemHeight), 0, this.props.elements.count() - 1);
      const newOrder = reinsert(order, order.indexOf(lastPressed), row);

      this.setState({
        mouse: mouse,
        order: newOrder
      });
    }
  }

  handleTouchMove = (e) => {
    e.preventDefault();

    this.handlePointerMove(e.touches[0]);
  }

  handlePointerUp = () => {
    this.setState({
      isPressed: false,
      delta:     0
    });
  }

  render() {
    const { mouse, isPressed, lastPressed, order } = this.state;

    const classes = {
      container: classSet({
        list:               true,
        ['no-user-select']: this.props.editing
      })
    };

    const elements = this.props.editing ?
      this.props.elements : this.props.elements;

    if(this.props.editing)
      return (
        <div className={classes.container} ref="container" style={{ height: `${this.props.elements.count()*this.state.itemHeight + 40}px` }}>
          <div className="header">
            {
              (() => {
                return this.props.header ? <h2>{this.props.header}</h2> : null;
              })()
            }
          </div>

          <ul>
            { range(elements.count()).map(i => {
                const style = (lastPressed === i && isPressed) ?
                  {
                    scale:  spring(1.1, springConfig),
                    shadow: spring(16, springConfig),
                    y:      mouse
                  }
                  :
                  {
                    scale:  spring(1, springConfig),
                    shadow: spring(1, springConfig),
                    y:      spring(order.indexOf(i) * this.state.itemHeight, springConfig)
                  };

                return (
                  <Motion style={style} key={i}>
                    {({ scale, shadow, y }) => {
                        const element   = this.props.elements.get(i);
                        let subElements = [];

                        if(element.title)
                          subElements.push(
                            <span className="title" key="title">
                              {capitalize(element.title)}
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
                          <li
                            className="list-item"
                            onMouseDown={this.handlePointerDown.bind(null, i, y)}
                            onTouchStart={this.handleTouchStart.bind(null, i, y)}
                            style={{
                              position:        'absolute',
                              width:           '100%',
                              marginLeft:      '2em',
                              boxShadow:       `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                              transform:       `translate3d(0, ${y}px, 0) scale(${scale})`,
                              WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                              zIndex:          (i === lastPressed) ? 99 : i
                            }}>
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
                    {capitalize(element.title)}
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
