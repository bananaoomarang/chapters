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
              <li key={element.id}>
                <div className="list-item">
                  <Link to={element.href}>
                    <div className="title">
                      <span>
                        {element.title}
                      </span>
                    </div>
                    <div className="description">
                      <span>
                        {element.description}
                      </span>
                    </div>
                  </Link>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
