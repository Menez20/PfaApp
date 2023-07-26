import React from 'react';
import { Footer } from '../../components/Footer';
import { Hero } from '../../components/Hero';
import { Nav } from '../../components/Nav';

export const Home = () => {
  return (
    <div>
      <Nav />
      {/* <Navbar /> */}
      <Hero />

      <Footer />
    </div>
  );
};
