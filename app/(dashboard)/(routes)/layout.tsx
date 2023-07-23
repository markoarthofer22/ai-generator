import Navbar from '@/components/navbar';
import SideBar from '@/components/sidebar';
import { GetApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import React from 'react';

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: IDashboardLayoutProps) => {
  const limitCount = await GetApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className='relative h-full'>
      <div className='z-[45] hidden h-full bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col'>
        <SideBar isPro={isPro} limit={limitCount} />
      </div>
      <main className='md:pl-72'>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
