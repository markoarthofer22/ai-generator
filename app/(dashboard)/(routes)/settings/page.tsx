import React from 'react';

import { MagicWandIcon } from '@radix-ui/react-icons';
import Heading from '@/components/heading';
import { checkSubscription } from '@/lib/subscription';
import SubscriptionButton from '@/components/subscription-button';

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div>
      <Heading
        title='Settings'
        description='Manage your account'
        iconColor='text-gray-700'
        bgColor='bg-gray-700/10'
        icon={MagicWandIcon}
      />
      <div className='space-y-4 px-4 lg:px-8'>
        <div className='text-sm text-muted-foreground'>
          {isPro
            ? 'You are currently on a pro plan.'
            : 'Currently, you are on a Free Trial'}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
