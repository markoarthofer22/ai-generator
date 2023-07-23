'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SideBar from '@/components/sidebar';

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <Sheet>
      <SheetTrigger>
        <Button asChild variant={'ghost'} size={'icon'} className='md:hidden'>
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className='p-0'>
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
