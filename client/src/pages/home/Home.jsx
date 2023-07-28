import React from 'react';
import { Footer } from '../../components/homecmp/Footer';
import { Hero } from '../../components/homecmp/Hero';
import { Nav } from '../../components/homecmp/Nav';
import { AccordionSection } from '../../components/homecmp/Accordion';

export const Home = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <AccordionSection />
      <Footer />
    </div>
  );
};
