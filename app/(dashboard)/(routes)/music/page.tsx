'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { MixIcon } from '@radix-ui/react-icons';
import Heading from '@/components/heading';

import { formSchema } from './const';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const res = await axios.post('/api/music', values);

      setMusic(res.data.audio);
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title='Meet the music!'
        description='Turn your input to the music'
        iconColor='text-emerald-500'
        bgColor='bg-emerald-500/10'
        icon={MixIcon}
      />
      <div className='px-4 lg:px-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-md md:px-6'
          >
            <FormField
              name='prompt'
              render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-10'>
                  <FormControl className='m-0 p-0'>
                    <Input
                      className='border-0 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                      disabled={isLoading}
                      placeholder='Music is a lifestyle'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className='col-span-12 w-full lg:col-span-2'
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
        <div className='mt-4 space-y-4'>
          {isLoading && (
            <div className='flex w-full items-center justify-center rounded-lg bg-muted p-8'>
              <Loader />
            </div>
          )}
          {!music && !isLoading && <Empty label='No music for now!' />}
          {music && (
            <audio controls className='mt-8 w-full'>
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
