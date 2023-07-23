'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { VideoIcon } from '@radix-ui/react-icons';
import Heading from '@/components/heading';

import { formSchema } from './const';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';

const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const res = await axios.post('/api/video', values);

      setVideo(res.data[0]);
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
        title='Generate Video'
        description='Turn your input to the live video'
        iconColor='text-orange-700'
        bgColor='bg-orange-700/10'
        icon={VideoIcon}
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
                      placeholder='Describe me a video'
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
          {!video && !isLoading && <Empty label='No videos for now...' />}
          {video && (
            <video
              controls
              className='mt-8 aspect-video w-full rounded-lg border bg-black'
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
