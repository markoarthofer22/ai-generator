import {
  amountOptions,
  resolutionOptions,
} from '@/app/(dashboard)/(routes)/image/const';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructions: ChatCompletionRequestMessage = {
  role: 'assistant',
  content:
    'You are a code generator. Please answer in code snippets if needed. Also please add code comments if needed. If you can type the response.',
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      prompt,
      amount = amountOptions[0].value,
      resolution = resolutionOptions[1].value,
    } = body;

    if (!userId) {
      return new NextResponse('Unathorized', { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI key not configured', { status: 500 });
    }

    if (!prompt) {
      return new NextResponse('Prompt is required!', { status: 400 });
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
