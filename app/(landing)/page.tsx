import React from 'react';
import LandingHero from '@/components/landing-hero';
import LandingNavbar from '@/components/landing-navbar';
import LandingContent from '@/components/laning-content';

const LadingPage = () => {
  return (
    <div className='h-full'>
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LadingPage;
