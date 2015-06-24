import React    from 'react';
import Slider   from 'react-slick';
import { Link } from 'react-router';

var Carousel = {
  displayName: 'Carousel',

  render: function () {

    var cfg = {
      dots:           false,
      infinite:       true,
      arrows:         true,
      autoplay:       true,
      draggable:      true,
      speed:          500,
      slidesToShow:   3,
      slidesToScroll: 1
    };

    return (
      <Slider {...cfg} >
        {
          this.props.stories.map( function (story, index) {
            return (
              <div key={index}>
                <h3>
                  <Link to="story" params={ { id: story.id } }>{story.title}</Link>
                </h3>
              </div>
            );
          })
        }
      </Slider>
    );
  }

};

module.exports = React.createClass(Carousel);