import React from 'react';
import { Carousel, Col, Flex } from 'antd';

import pic1 from '../assets/showcase1.jpg';
import pic2 from '../assets/showcase2.jpg';
import pic3 from '../assets/showcase3.jpg';
import pic4 from '../assets/showcase4.jpg';
import pic5 from '../assets/showcase5.jpg';
import pic6 from '../assets/showcase6.jpg';
import pic7 from '../assets/showcase7.jpg';
import pic8 from '../assets/1.jpg';
import pic9 from '../assets/2.jpg';
import pic10 from '../assets/showcase10.jpg';
import pic11 from '../assets/showcase122.jpg';


const SliderCarousel = () => {
  return (
    <Carousel autoplay >
        <div>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
  <img src={pic1} alt="Pic 1" style={{ ...contentStyle, backgroundImage: `url(${pic1})` }} />
  <img src={pic2} alt="Pic 2" style={{ ...contentStyle, backgroundImage: `url(${pic2})` }} />
  <img src={pic3} alt="Pic 3" style={{ ...contentStyle, backgroundImage: `url(${pic3})` }} />
  <img src={pic4} alt="Pic 4" style={{ ...contentStyle, backgroundImage: `url(${pic4})` }} />
  <img src={pic5} alt="Pic 5" style={{ ...contentStyle, backgroundImage: `url(${pic5})` }} />
  <img src={pic6} alt="Pic 6" style={{ ...contentStyle, backgroundImage: `url(${pic6})` }} />
</div>
</Col></div>
<div>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
  <img src={pic7} alt="Pic 7" style={{ ...contentStyle, backgroundImage: `url(${pic7})` }} />
  <img src={pic2} alt="Pic 2" style={{ ...contentStyle, backgroundImage: `url(${pic2})` }} />
  <img src={pic6} alt="Pic 3" style={{ ...contentStyle, backgroundImage: `url(${pic5})` }} />
  <img src={pic10} alt="Pic 4" style={{ ...contentStyle, backgroundImage: `url(${pic10})` }} />
  <img src={pic5} alt="Pic 5" style={{ ...contentStyle, backgroundImage: `url(${pic1})` }} />
  <img src={pic1} alt="Pic 6" style={{ ...contentStyle, backgroundImage: `url(${pic6})` }} />
</div>
</Col></div>
<div>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
  <img src={pic3} alt="Pic 1" style={{ ...contentStyle, backgroundImage: `url(${pic1})` }} />
  <img src={pic4} alt="Pic 2" style={{ ...contentStyle, backgroundImage: `url(${pic2})` }} />
  <img src={pic10} alt="Pic 3" style={{ ...contentStyle, backgroundImage: `url(${pic3})` }} />
  <img src={pic7} alt="Pic 4" style={{ ...contentStyle, backgroundImage: `url(${pic4})` }} />
  <img src={pic6} alt="Pic 5" style={{ ...contentStyle, backgroundImage: `url(${pic5})` }} />
  <img src={pic2} alt="Pic 6" style={{ ...contentStyle, backgroundImage: `url(${pic6})` }} />
</div>
</Col></div>

    </Carousel>
  );
};

const contentStyle: React.CSSProperties = {
  height: '175px',
  color: '#fff',
  lineHeight: '50px',
  textAlign: 'center',
  background: '#364d79',
  backgroundSize: 'cover',
};

export default SliderCarousel;
