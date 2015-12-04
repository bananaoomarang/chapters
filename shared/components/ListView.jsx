import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import capitalize           from 'lib/capitalize';
import { List }             from 'immutable';
import classSet             from 'classnames';

export default class ListView extends React.Component {
  static propTypes = {
    elements:   PropTypes.instanceOf(List).isRequired,
    header:     PropTypes.string,
    createUrl:  PropTypes.string,
    onReorder:  PropTypes.func,
    editable:   PropTypes.bool,
    handleSave: PropTypes.func
  }

  state = {
    dragging: false,
    editing:  false
  }

  componentDidMount = () => {
    if(this.props.editable)
      this.bindSomeCheekyEvents();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.editable === false && this.props.editable)
      return this.bindSomeCheekyEvents();
    
    if (prevProps.editable === true && !this.props.editable)
      return this.unbindEvents();
  }

  componentWillUnmount = () => {
    this.unbindEvents();
  }

  bindSomeCheekyEvents = () => {
    const container = this.refs.container;

    container.addEventListener('touchmove', this.handlePointerMove);
    window.addEventListener('touchend',     this.handlePointerUp);

    container.addEventListener('mousemove', this.handlePointerMove);
    window.addEventListener('mouseup',      this.handlePointerUp);

    for (let r in this.refs) {
      if(/^listitem-/.test(r)) {
        this
          .refs[r]
          .onmousedown = this.handlePointerDown;
      }
    }
  }

  unbindEvents = () => {
    window.removeEventListener('touchmove', this.handlePointerMove);
    window.removeEventListener('mouseup',   this.handlePointerUp);
  }

  handlePointerDown = e => {
    this.setState({ dragging: e.target });
  }

  handlePointerMove = e => {
    if(!this.state.dragging)
      return;

    // We assume they are all the same height (for now)
    const EL_HEIGHT = this.state.dragging.clientHeight;
    const yPosition = e.clientY - e.offsetY;

    const index = this.state.dragging.dataset.index;
    const insertAt = Math.round(yPosition / EL_HEIGHT) - 2;

    if(index !== insertAt) {
      this.props.onReorder(index, insertAt);
      this.setState({ dragging: this.refs['listitem-' + insertAt] });
    }
  }

  handlePointerUp = () => {
    this.setState({ dragging: false });
  }

  render() {

    const classes = {
      container: {
        list:               true,
        ['no-user-select']: this.props.editable
      },
      editButton: {
        btn: true,
        hidden: !(this.props.editable && !this.state.editing)
      },
      saveButton: {
        btn: true,
        hidden: !this.state.editing
      }
    };

    const elements = this.state.editing ?
      this.props.elements
        .concat([
          {
            title: 'New',
            href:  this.props.createUrl
          }
        ]) : this.props.elements;


    return (
      <div className={classSet(classes.container)} ref="container">
        <div className="header">
          {
            (() => {
              return this.props.header ? <h2>{this.props.header}</h2> : null;
            })()
          }

        </div>

        <button className={classSet(classes.editButton)} onClick={() => this.setState({ editing: true })}>Edit</button>
        <button className={classSet(classes.saveButton)} onClick={this.props.handleSave}>Save</button>

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
                <li key={index} ref={'listitem-' + index} data-index={index} className="list-item">
                  <Link to={element.href}>
                    {subElements}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
