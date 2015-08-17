import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import classSet             from 'classnames';
import Bluebird             from 'bluebird';

// Inject a cheeky dispatch prop
@connect(() => ({}))

export default class Form extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    dispatch:      PropTypes.func.isRequired,
    fields:        PropTypes.array.isRequired,
    id:            PropTypes.string.isRequired,
    actionCreator: PropTypes.func,
    error:         PropTypes.string,
    submitText:    PropTypes.string,
    alsoDispatch:  PropTypes.object,
    didDispatch:   PropTypes.func
  }

  handleFormSubmit = () => {
    let payload = {};

    this.props.fields
      .forEach(field => 
        payload[field.name] = this.refs[field.name].getDOMNode().value);

    if(this.props.alsoDispatch)
      Object.assign(payload, this.props.alsoDispatch)

    Bluebird.resolve(this.props.dispatch(this.props.actionCreator(payload, this.context.router.state.params)))
      .then(this.props.didDispatch || ()=>{});
  }

  render() {
    const errorClasses = classSet({
      'error-msg': true,
      'invisible': !this.props.error
    });

    return (
      <div id={this.props.id} className="form">

        {
          this.props.fields.map(field =>
            <input
              type={field.type || 'text'}
              name={field.name}
              ref={field.name}
              key={field.name}
              placeholder={field.placeholder} />
          )
        }

        <button className="btn" name={this.props.id + '-submit'} onClick={this.handleFormSubmit}>
          {this.props.submitText || 'submit'}
        </button>

        <a className={errorClasses}>{this.props.error}</a>
      </div>
    );
  }
}

