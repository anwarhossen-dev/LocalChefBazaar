import React from 'react';
import HeroBanner from './HeroBanner';
import HeroOverlay from './HeroOverlay';

// Removed HeroOverlay from being an absolute overlay due to functional and UI/UX conflicts.
// If HeroOverlay is intended as a separate section, it should be placed outside of Hero.
const Hero = () => (
  <section className="relative">
    <HeroBanner />
  </section>
);

export default Hero;
