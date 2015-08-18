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
          <div className="card">
            <div className="card-header">{item.title}</div>
            <div className="card-body">{item.body}</div>
            <div style={footerStyle} className="card-footer">{item.footer}</div>
          </div>
        </Link>
      );
    });

    return (
      <div className="cards">
        {
          (() => {
            if(cards.length)
              return cards;
            else
              return <h2>{this.props.emptyMsg}</h2>;
          })()
        }
      </div>
    );
  }
}
