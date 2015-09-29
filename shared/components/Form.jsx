import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import classSet             from 'classnames';

// Inject a cheeky dispatch prop
@connect(() => ({}))

export default class Form extends React.Component {
  static propTypes = {
    dispatch:      PropTypes.func.isRequired,
    routeParams:   PropTypes.object.isRequired,
    fields:        PropTypes.array.isRequired,
    id:            PropTypes.string.isRequired,
    actionCreator: PropTypes.func,
    checks:        PropTypes.object,
    error:         PropTypes.string,
    submitText:    PropTypes.string,
    alsoDispatch:  PropTypes.object,
    didDispatch:   PropTypes.func
  }

  state = {}

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { fields, checks } = this.props;

    let payload = {};

    for(let field of fields) {
      const value = this.refs[field.name].getDOMNode().value;

      if(!value)
        return this.setState({ error: 'Required fields missing' });

      payload[field.name] = value;
    }


    if(this.props.alsoDispatch)
      Object.assign(payload, this.props.alsoDispatch)

    if(checks)
      for(let c in checks) {
        const check = checks[c];


        if(!check.check(payload))
          return this.setState({ error: check.error });
      }

    for(let field of fields)
      if(field.dispatch !== undefined && !field.dispatch)
        delete payload[field.name];

    Promise.resolve(this.props.dispatch(this.props.actionCreator(payload, this.props.routeParams)))
      .then(this.props.didDispatch || function(){});
  }

  render() {
    const errorClasses = classSet({
      'error-msg': true,
      'invisible': (!this.props.error && !this.state.error)
    });

    return (
      <form id={this.props.id} className="form" onSubmit={this.handleFormSubmit}>

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

        <input type="submit" name={this.props.id + '-submit'} value={this.props.submitText || 'submit'} />

        <br />

        <a className={errorClasses}>{this.props.error || this.state.error}</a>
      </form>
    );
  }
}

