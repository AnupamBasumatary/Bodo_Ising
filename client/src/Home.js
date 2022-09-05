import React from 'react';
import Carousel from './components/layout/carousel/Carousel';
import { CarouselData } from './components/layout/carousel/CarouselData';
import Main from './components/Pages/main/Main';
import './sass/main.css';
import Footer from './components/layout/footer/Footer';

const Home = () => {
  return (
    <div>
      <Carousel slides={CarouselData} />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
