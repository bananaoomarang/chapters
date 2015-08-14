import React    from 'react';
import Slider   from 'react-slick';
import { Link } from 'react-router';

export default class Carousel extends React.Component {
  render() {
    const cfg = {
      slidesToShow:   3,
      slidesToScroll: 1,
      dragging:       true,
      speed:          2000,
      autoplaySpeed:  5000,
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
                <h3>
                  <Link to={`/stories/${story.id}`} >{story.title}</Link>
                </h3>
                <span>By {story.author}</span>
              </div>
            );
          })
        }
      </Slider>
    );
  }
}