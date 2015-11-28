import React, { PropTypes } from 'react';
import Slider               from 'react-slick';
import { Link }             from 'react-router';
import { List }             from 'immutable';

export default class Carousel extends React.Component {
  static propTypes = {
    stories: PropTypes.instanceOf(List).isRequired
  }

  render() {
    const cfg = {
      slidesToShow:   3,
      slidesToScroll: 1,
      dragging:       true,
      speed:          2000,
      autoplaySpeed:  10000,
      autoplay:       true,
      infinite:       true,
      responsive: [
          {
            breakpoint: 860,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
      ]
    };

    return (
      <Slider {...cfg} >
        {
          this.props.stories.toJS().map( (story, index) => {
            return (
              <div key={index}>
                <h1>
                  <Link to={`/chapters/${story.id}`} >{story.title}</Link>
                </h1>
                <span><b>By {story.author}</b></span>
              </div>
            );
          })
        }
      </Slider>
    );
  }
}
