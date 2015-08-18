import React, { PropTypes } from 'react';
import { Link }             from 'react-router';

export default class ListView extends React.Component {
  static propTypes = {
    header:   PropTypes.string.isRequired,
    elements: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="list">
        <div classNam="header">
          <h2>
            {this.props.header}
          </h2>
        </div>
        <ul>
          {
            this.props.elements.map(element => (
              <li key={element.id} className="list-item">
                <Link to={element.href}>
                  <span className="title">
                    {element.title}
                  </span>
                  <span className="separator">
                    {element.separator}
                  </span>
                  <span className="description">
                    {element.description}
                  </span>
                  <span className="adendum">
                    {element.adendum}
                  </span>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
