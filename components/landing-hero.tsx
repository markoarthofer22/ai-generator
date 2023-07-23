'use client';

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import TypewriterComponent from 'typewriter-effect';
import { Button } from '@/components/ui/button';

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className='space-y-5 py-36 text-center font-bold text-white'>
      <div className='space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl'>
        <h1>The best A.I tool ever written!</h1>
        <div className='bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text py-4 text-transparent'>
          <TypewriterComponent
            options={{
              strings: [
                'Chatbot.',
                'Photo Generation.',
                'Code Generation.',
                'Do you own Images.',
                'Create music at your will.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className='text-sm font-light text-zinc-400 md:text-xl'>
        Create content with all of the A.I. possibilities. <br /> All that
        power, on a palm of your hand
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button
            variant='upgrade'
            className='rounded-full p-4 font-semibold md:p-6 md:text-lg'
          >
            Start doing it for FREE!
          </Button>
        </Link>
      </div>
      <div className='text-xs font-normal text-zinc-400 md:text-sm'>
        No credit card required.
      </div>
    </div>
  );
};

export default LandingHero;
