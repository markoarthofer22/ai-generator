'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChatCompletionRequestMessage } from 'openai';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';

import { CodeIcon } from '@radix-ui/react-icons';
import Heading from '@/components/heading';

import { formSchema } from './const';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar';
import BotAvatar from '@/components/bot-avatar';

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const res = await axios.post('/api/code', {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, res.data]);

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
        title='Code generation'
        description="Who likes to dev? Ask ME, I'm better."
        iconColor='text-green-700'
        bgColor='bg-green-700/10'
        icon={CodeIcon}
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
                      placeholder='Give me .map() function for vanilla JS'
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
          {messages.length === 0 && !isLoading && (
            <Empty label="Conversation wasn't started" />
          )}
          <div className='flex flex-col-reverse gap-y-4'>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-full items-start gap-x-8 rounded-lg p-8',
                  msg.role === 'user'
                    ? 'justify-end border border-black/10 bg-white'
                    : 'bg-muted',
                )}
              >
                <div
                  className={cn(
                    'flex items-start justify-start gap-x-4',
                    msg.role === 'user'
                      ? 'flex-row-reverse items-center justify-end'
                      : 'flex-row',
                  )}
                >
                  {msg.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                  {msg.role === 'user' ? (
                    <p className='text-sm font-semibold'>{msg.content}</p>
                  ) : (
                    <ReactMarkdown
                      components={{
                        pre: ({ node, ...props }) => (
                          <div className='my-2 w-full overflow-auto rounded-lg bg-black/10 p-2'>
                            <pre {...props} />
                          </div>
                        ),
                        code: ({ node, ...props }) => (
                          <code
                            className='rounded-lg bg-black/10 p-1'
                            {...props}
                          />
                        ),
                      }}
                      className='overflow-hidden text-sm leading-7'
                    >
                      {msg.content || ''}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
