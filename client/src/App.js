import React from 'react';
import Navbar from './components/layout/navbar/Navbar';
import Carousel from './components/layout/carousel/Carousel';
import { CarouselData } from './components/layout/carousel/CarouselData';
import Home from './components/Pages/home/Home';
import './sass/main.css';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Carousel slides={CarouselData} />
      <Home />
    </div>
  );
};

export default App;
