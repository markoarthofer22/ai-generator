import {
  ChatBubbleIcon,
  CodeIcon,
  ImageIcon,
  MixIcon,
  VideoIcon,
} from '@radix-ui/react-icons';

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    icon: ChatBubbleIcon,
    href: '/conversation',
  },
  {
    label: 'Music Generation',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    icon: MixIcon,
    href: '/music',
  },
  {
    label: 'Image Generation',
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    icon: ImageIcon,
    href: '/image',
  },

  {
    label: 'Video Generation',
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    icon: VideoIcon,
    href: '/video',
  },

  {
    label: 'Code Generation',
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    icon: CodeIcon,
    href: '/code',
  },
];
