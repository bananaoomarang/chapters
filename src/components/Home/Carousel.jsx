'use strict';

var React  = require('react');
var Slider = require('react-slick');

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
          this.props.stories.map( function (slide, index) {
            return <div key={index}><h3>{slide.title}</h3></div>;
          })
        }
      </Slider>
    );
  }

};

module.exports = React.createClass(Carousel);
