'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CameraIcon,
  ChatBubbleIcon,
  CodeIcon,
  DashboardIcon,
  ImageIcon,
  MagicWandIcon,
  MixIcon,
} from '@radix-ui/react-icons';
import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';
import FreeCounter from '@/components/free-counter';
import { cn } from '@/lib/utils';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    color: 'text-sky-500',
    icon: DashboardIcon,
  },
  {
    label: 'Conversation',
    href: '/conversation',
    color: 'text-violet-500',
    icon: ChatBubbleIcon,
  },
  {
    label: 'Image Generation',
    href: '/image',
    color: 'text-pink-700',
    icon: ImageIcon,
  },
  {
    label: 'Video Generation',
    href: '/video',
    color: 'text-orange-700',
    icon: CameraIcon,
  },
  {
    label: 'Music Generation',
    href: '/music',
    color: 'text-emerald-500',
    icon: MixIcon,
  },
  {
    label: 'Code Generation',
    href: '/code',
    color: 'text-green-700',
    icon: CodeIcon,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: MagicWandIcon,
  },
];

interface ISideBarProps {
  limit: number;
  isPro: boolean;
}

const SideBar = ({ limit = 0, isPro = false }: ISideBarProps) => {
  const pathname = usePathname();
  return (
    <div className='flex h-full flex-col space-y-4 bg-[#111827] py-4 text-white'>
      <div className='flex-1 px-3 py-2'>
        <Link href={'/dashboard'} className='mb-14 flex items-center pl-3'>
          <div className='relative mr-4 h-8 w-8'>
            <Image alt='Logo' src={'/logo.png'} fill />
          </div>
          <h1 className={cn('text-2xl font-bold', montserrat.className)}>
            Genius A.I.
          </h1>
        </Link>
        <div className='space-y-1'>
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                'hover: group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium text-white transition hover:bg-white/10',
                pathname === route.href
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-400',
              )}
            >
              <div className='flex flex-1 items-center'>
                <route.icon className={cn('mr-3 h-5 w-5', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter isPro={isPro} limit={limit} />
    </div>
  );
};

export default SideBar;
