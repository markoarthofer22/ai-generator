'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { tools } from '@/const';
import { useProModal } from '@/hooks/use-pro-modal';
import { cn } from '@/lib/utils';
import { CheckIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import toast from 'react-hot-toast';

export const ProModal = () => {
  const proModal = useProModal();
  const [isLoading, setIsLoading] = useState(false);

  const onSubscribe = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/stripe');
      if (res?.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      toast.error('Something went wrong.');

      console.log('[STRIPE_CLIENT_ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex flex-col items-center justify-center gap-y-4 pb-2'>
            <div className='flex items-center gap-x-2 py-1 font-bold'>
              Upgrade to GeniusPro
              <Badge
                variant='upgrade'
                className='rounded-xl py-1 text-sm uppercase'
              >
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='space-y-4 pt-2 text-center font-medium text-zinc-900'>
            {tools.map((tool, index) => (
              <Card
                key={index}
                className='flex items-center justify-between border-black/5 p-3'
              >
                <div className='flex items-center gap-x-4'>
                  <div className={cn('w-fit rounded-md p-2', tool.bgColor)}>
                    <tool.icon className={cn('h-6 w-6', tool.color)} />
                  </div>
                  <div className='text-sm font-semibold'>{tool.label}</div>
                </div>
                <CheckIcon className='h-5 w-5 text-primary' />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={onSubscribe}
            size='lg'
            variant='upgrade'
            className='w-full'
          >
            Upgrade
            <LightningBoltIcon className='ml-2 h-4 w-4 fill-white' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <>
      <ProModal />
    </>
  );
};

export default ModalProvider;
