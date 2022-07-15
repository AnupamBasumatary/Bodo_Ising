import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div>
      <main className='main'>
        <section className='home'>
          <figure className='home__item-1'>
            <img
              src={require('./images/Front_1.jpg')}
              className='home__item-1--1 home__img img_group'
              alt='Home 1'
            ></img>
            <img
              src={require('./images/Front_11.jpg')}
              className='home__item-1--2 img_group'
              alt='Home 2'
            ></img>
            <img
              src={require('./images/Front_12.jpg')}
              className='home__item-1--3 img_group'
              alt='Home 3'
            ></img>
          </figure>
          <figure className='home__item-2'>
            <div className='home__text'>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "Neque porro quisquam est qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
            </div>
          </figure>
          <figure className='home__item-3'>
            <div className='home__text'>
              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;"There is no one who loves pain
              itself, who seeks after it and wants to have it, simply because it
              is pain..."
            </div>
          </figure>
          <figure className='home__item-4'>
            <img
              src={require('./images/Front_2.jpg')}
              className='group-2 grp2--1 img_group'
              alt='Home 4'
            ></img>
            <img
              src={require('./images/Front_21.jpg')}
              className='group-2 grp2--2 img_group'
              alt='Home 5'
            ></img>
            <img
              src={require('./images/Front_22.jpg')}
              className='group-2 grp2--3 img_group'
              alt='Home 6'
            ></img>
            <img
              src={require('./images/Front_23.jpg')}
              className='group-2 grp2--4 home__img img_group'
              alt='Home 7'
            ></img>
          </figure>
        </section>

        <div className='bottom-text'>
          “I know once people get connected to real food, they never change
          back.” – Alice Waters
        </div>
      </main>
    </div>
  );
};

export default Home;
