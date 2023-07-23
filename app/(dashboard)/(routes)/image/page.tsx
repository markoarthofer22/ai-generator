'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DownloadIcon, ImageIcon } from '@radix-ui/react-icons';
import Heading from '@/components/heading';

import { amountOptions, formSchema, resolutionOptions } from './const';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Card, CardFooter } from '@/components/ui/card';
import Image from 'next/image';

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: amountOptions[0].value,
      resolution: resolutionOptions[1].value,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const res = await axios.post('/api/image', values);

      const urls = res.data.map((img: { url: string }) => img.url);

      setImages(urls);

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
        title='Generate an image'
        description='Who needs google? Generate you Image here.'
        iconColor='text-pink-700'
        bgColor='bg-pink-700/10'
        icon={ImageIcon}
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
                <FormItem className='col-span-12 lg:col-span-6'>
                  <FormControl className='m-0 p-0'>
                    <Input
                      className='border-0 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                      disabled={isLoading}
                      placeholder='Describe me a picture that you need.'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name='amount'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name='resolution'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            <div className='p-20'>
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label='No images generated' />
          )}
          <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {images.map((img, index) => (
              <Card key={index} className='overflow-hidden rounded-lg'>
                <div className='relative aspect-square'>
                  <Image fill src={img} alt={`Image #${index + 1}`} />
                </div>
                <CardFooter className='p-2'>
                  <Button
                    onClick={() => window.open(img)}
                    variant='secondary'
                    className='w-full'
                  >
                    <DownloadIcon className='mr-2 h-4 w-4' />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
