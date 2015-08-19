import React, { PropTypes } from 'react';
import { Link }             from 'react-router';

export default class CardsView extends React.Component {
  static propTypes = {
    items:    PropTypes.array.isRequired,
    emptyMsg: PropTypes.string
  }

  render() {
    const cards = this.props.items.map((item, index) => {
      const footerStyle = {
        display: item.footer ? 'inherit' : 'none'
      };

      return (
        <Link to={item.href} key={index}>
          <div className="card-wrapper">
            <div className="card">
              <div className="card-header">{item.title}</div>
              <div className="card-body"><em>{item.body}</em></div>
              <div style={footerStyle} className="card-footer">{item.footer}</div>
            </div>
            </div>
        </Link>
      );
    });

    return (
      <div className="cards">
        {
          (() => {
            if(cards.length)
              return <div className="cards">{cards}</div>;
            else
              return <h2>{this.props.emptyMsg}</h2>;
          })()
        }
      </div>
    );
  }
}
