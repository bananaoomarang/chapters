import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import classSet             from 'classnames';
import { List }             from 'immutable';

export default class CardsView extends React.Component {
  static propTypes = {
    elements:   PropTypes.instanceOf(List).isRequired,
    id:         PropTypes.string,
    header:     PropTypes.string,
    subheader:  PropTypes.string,
    emptyMsg:   PropTypes.string,
    onReorder:  PropTypes.func,
    onChange:   PropTypes.func,
    editing:    PropTypes.bool,
    handleSave: PropTypes.func,
    addNew:     PropTypes.func
  };

  state = {
    dragging: false
  };

  componentDidMount = () => {
    if(!this.props.editing || this.state.bound)
      return;

    this.bindSomeCheekyEvents();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if(!prevProps.editing && this.props.editing)
      this.bindSomeCheekyEvents();

    if(prevProps.editing && !this.props.editing)
      this.unbindEvents();
  };

  componentWillUnmount = () => {
      this.unbindEvents();
  };

  bindSomeCheekyEvents = () => {
    const container = this.refs.container;

    container.addEventListener('touchmove', this.handlePointerMove);
    window.addEventListener('touchend',     this.handlePointerUp);

    container.addEventListener('mousemove', this.handlePointerMove);
    window.addEventListener('mouseup',      this.handlePointerUp);

    for (let r in this.refs) {
      if(/^card-/.test(r)) {
        this
          .refs[r]
          .onmousedown = this.handlePointerDown;
      }
    }

    window.addEventListener('keyup', this.handleKeyup);
  };

  unbindEvents = () => {
    window.removeEventListener('touchmove', this.handlePointerMove);
    window.removeEventListener('mouseup',   this.handlePointerUp);

    window.removeEventListener('keyup', this.handleKeyup);
  };

  handlePointerDown = e => {
    this.setState({ dragging: e.currentTarget });
  };

  handlePointerMove = e => {
    if(!this.state.dragging)
      return;

    const EL_HEIGHT = this.state.dragging.clientHeight;
    const EL_WIDTH  = this.state.dragging.clientWidth;
    const cards     = this.refs.cards;

    const yPosition   = e.clientY - e.offsetY;
    const xPosition   = e.clientX - e.offsetX;

    const index = this.state.dragging.dataset.index;
    const insertAt = Math.round(yPosition / EL_HEIGHT) - cards.offsetY;

    if(index !== insertAt) {
      this.props.onReorder(index, insertAt);
      this.setState({ dragging: this.refs['card-' + insertAt] });
    }
  };

  handlePointerUp = () => {
    this.setState({ dragging: false });
  };

  handleKeyup = (e) => {
    const el = e.currentTarget;

    if(!/card/.test(el.className)) {
      return;
    }

    const change = {
      index: el.dataset.index,
      changes: {
        [el.dataset.key]: el.textContent
      }
    };

    this.props.onChange(change)
  };

  render() {
    const classes = {
      container: {
        ['no-user-select']: this.props.editing
      }
    };

    const cardClasses = {
      ['card-wrapper']: true,
      ['card-editing']: this.props.editing
    }

    const addCard = this.props.editing ? [{
      title: 'New',
      body:  '+',
      href: this.props.createUrl,
      uneditable: true
    }] : [];


    const cards = this.props.elements.concat(addCard).map((item, index) => {
      const footerStyle = {
        display: item.footer ? 'inherit' : 'none'
      };

      const blockIfEditing = function (e) {
        if(this.props.editing && !item.uneditable) {
          e.stopPropagation();
          e.preventDefault();
        }
      }.bind(this);

      return (
        <div className={classSet(cardClasses)} key={index} ref={['card', index].join('-')} data-index={index}>
          <Link to={item.href} onClick={blockIfEditing}>
            <div className="card">
              {
                (() => {
                  if(item.title)
                    return (
                      <h2 className="card-header" contentEditable={this.props.editing && !item.uneditable} data-index={index} data-key="title">{item.title}</h2>
                    );
                })()
              }

              {
                (() => {
                  if(item.body)
                    return <div className="card-body" contentEditable={this.props.editing && !item.uneditable} data-index={index} data-key="description">{item.body}</div>;
                })()
              }

              {
                (() => {
                  if(item.footer)
                    return <div style={footerStyle} className="card-footer" contentEditable={this.props.editing && !item.uneditable} data-index={index} data-key="author">{item.footer}</div>;
                })()
              }
              </div>
            </Link>
        </div>
      );
    });

    return (
      <div id={this.props.id || 'CardsView'} className={classSet(classes.container)} ref="container">
        {
          (() => {
            if(this.props.header)
              return (
                <div id="header">
                  <h2>{this.props.header}</h2>
                </div>
              );
          })()
        }

        {
          (() => {
            if(this.props.subheader)
              return (
                <h3 id="subheader">{this.props.subheader}</h3>
              );
          })()
        }

        {
          (() => {
            if(cards.size) {
              return <div className="cards" ref="cards">{cards}</div>;
            }
            else {
              return <h2>{this.props.emptyMsg}</h2>;
            }
          })()
        }
      </div>
    );
  }
}
