import React, { PropTypes } from 'react';
import { Link }             from 'react-router';

export default class CardsView extends React.Component {
  static propTypes = {
    items:    PropTypes.array.isRequired,
    id:       PropTypes.string,
    header:   PropTypes.string,
    emptyMsg: PropTypes.string
  }

  render() {
    const cards = this.props.items.map((item, index) => {
      const footerStyle = {
        display: item.footer ? 'inherit' : 'none'
      };

      return (
          <div className="card-wrapper" key={index}>
            <Link to={item.href}>
              <div className="card">
                {
                  (() => {
                    if(item.title)
                      return <div className="card-header">{item.title}</div>;
                  })()
                }

                {
                  (() => {
                    if(item.body)
                      return <div className="card-body">{item.body}</div>;
                  })()
                }

                {
                  (() => {
                    if(item.footer)
                      return <div style={footerStyle} className="card-footer">{item.footer}</div>;
                  })()
                }
                </div>
              </Link>
          </div>
      );
    });

    return (
      <div id={this.props.id || 'CardsView'}>
        {
          (() => {
            if(this.props.header)
              return <h2>{this.props.header}</h2>;
          })()
        }

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
