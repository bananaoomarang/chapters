import React    from 'react';
import Slider   from 'react-slick';
import { Link } from 'react-router';

export default class Carousel extends React.Component {
  render() {

    var cfg = {
      slidesToShow:   3,
      slidesToScroll: 1,
      dragging:       true
    };

    return (
      <Slider {...cfg} >
        {
          this.props.stories.toJS().map( (story, index) => {
            return (
              <div key={index}>
                <h3>
                  <Link to={`stories/${story.id}`} >{story.title}</Link>
                </h3>
              </div>
            );
          })
        }
      </Slider>
    );
  }
}
