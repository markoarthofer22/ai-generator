import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

const testimonials = [
  {
    name: 'Antonio Rodriguez',
    avatar: 'A.R.',
    title: 'Junior FE Dev',
    description: "Definitely the best tool I've used!",
  },
  {
    name: 'Emily Johnson',
    avatar: 'E.J.',
    title: 'Senior BE Dev',
    description: 'Passionate about backend development and databases.',
  },
  {
    name: 'Michael Smith',
    avatar: 'M.S.',
    title: 'UX Designer',
    description: 'Creating delightful user experiences is my passion.',
  },
  {
    name: 'Sophia',
    avatar: 'S',
    title: 'Product Manager',
    description: 'Bringing innovative products to life is what I do.',
  },
  {
    name: 'William Davis',
    avatar: 'W.D.',
    title: 'Data Analyst',
    description: 'Analyzing data to uncover valuable insights.',
  },
  {
    name: 'Olivia Martinez',
    avatar: 'O.M.',
    title: 'Software Engineer',
    description: 'Building software to solve real-world problems.',
  },
  {
    name: 'James Brown',
    avatar: 'J.B.',
    title: 'Frontend Architect',
    description: 'Crafting scalable and maintainable frontend solutions.',
  },
  {
    name: 'Isabella',
    avatar: 'I',
    title: 'Graphic Designer',
    description: 'Transforming ideas into visually appealing designs.',
  },
  {
    name: 'Ethan Lee',
    avatar: 'E.L.',
    title: 'Mobile App Developer',
    description: 'Passionate about creating innovative mobile apps.',
  },
  {
    name: 'Emma Wilson',
    avatar: 'E.W.',
    title: 'Data Scientist',
    description: 'Exploring the wonders of data and machine learning.',
  },
];

const LandingContent = () => {
  return (
    <div className='px-10 pb-20'>
      <h2 className='mb-10 text-center text-4xl font-extrabold text-white'>
        Testimonials
      </h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {testimonials.map((item, index) => (
          <Card key={index} className='border-none bg-[#192339] text-white'>
            <CardHeader>
              <CardTitle className='flex flex-col items-center gap-x-2 text-center'>
                <Avatar className='mb-2'>
                  <AvatarFallback className='bg-purple-200/80 text-purple-600'>
                    {item.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className='w-full flex-1'>
                  <p className='text-lg text-purple-600'>{item.name}</p>
                  <p className='text-sm text-zinc-400'> {item.title}</p>
                </div>
              </CardTitle>
              <CardContent className='px-0 pt-4 text-center'>
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
