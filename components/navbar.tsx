import React from 'react';

import { UserButton } from '@clerk/nextjs';
import MobileSidebar from '@/components/mobile-sidebar';
import { GetApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const Navbar = async () => {
  const limit = await GetApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className='flex items-center p-4'>
      <MobileSidebar isPro={isPro} limit={limit} />

      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
