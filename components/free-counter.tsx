'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MAX_FREE_COUNTS } from '@/const';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LightningBoltIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { useProModal } from '@/hooks/use-pro-modal';

interface IFreeCounterProps {
  limit: number;
  isPro: boolean;
}

const FreeCounter = ({ limit = 0, isPro = false }: IFreeCounterProps) => {
  const [mounted, setIsMounted] = useState(false);

  const proModal = useProModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return;

  if (isPro) return;

  return (
    <div className='px-3'>
      <Card className='border-0 bg-white/10'>
        <CardContent className='py-6'>
          <div className='mb-4 space-y-4 text-center text-sm text-white'>
            <p>
              {limit} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className={cn(' h-3 bg-white/20 ')}
              value={(limit / MAX_FREE_COUNTS) * 100}
              indicatorClassNames='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
            />
            <Button
              onClick={proModal.onOpen}
              className='w-full'
              variant='upgrade'
            >
              Go Premium!
              <LightningBoltIcon className='ml-2 h-4 w-4 fill-white' />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
