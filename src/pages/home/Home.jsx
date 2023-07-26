import React from 'react';
import { Footer } from '../../components/Footer';
import { Hero } from '../../components/Hero';
import { Nav } from '../../components/Nav';
import { Faq } from '../../components/Accordion';

export const Home = () => {
  return (
    <div>
      <Nav />
      {/* <Navbar /> */}
      <Hero />

      <Faq />
      <Footer />
    </div>
  );
};
