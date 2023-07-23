'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LightningBoltIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ISubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: ISubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/stripe');
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      toast.error('Something went wrong.');

      console.log('[BILLING_ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      variant={isPro ? 'default' : 'upgrade'}
      onClick={onClick}
    >
      {isPro ? 'Manage subscription' : 'Get Pro'}

      {!isPro && <LightningBoltIcon className='ml-2 h-4 w-4 fill-white' />}
    </Button>
  );
};

export default SubscriptionButton;
