import * as z from 'zod';

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'This field is required!',
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = ['1', '2', '3', '4', '5'].map((item, index) => ({
  value: item,
  label: `${item} Photo${index !== 0 ? 's' : ''}`,
}));

export const resolutionOptions = [
  '256x256',
  '512x512',
  '1024x1024',
  '1920x1080',
  '3440x2560',
].map((item) => ({
  value: item,
  label: item,
}));
