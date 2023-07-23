import Image from 'next/image';
import React from 'react';

export const Loader = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-y-4'>
      <div className='relative h-10 w-10 animate-spin'>
        <Image alt='Loader' fill src='/logo.png' />
      </div>
      <p className='text-sm text-muted-foreground'>
        Let me think about this...
      </p>
    </div>
  );
};
