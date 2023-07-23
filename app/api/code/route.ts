import { CheckApiLimit, IncreaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
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
    const { messages } = body;

    if (!userId) {
      return new NextResponse('Unathorized', { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI key not configured', { status: 500 });
    }

    if (!messages) {
      return new NextResponse('Messages are required!', { status: 400 });
    }

    const freeTrial = await CheckApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse('Free trial has expired!', { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [instructions, ...messages],
    });

    if (!isPro) {
      await IncreaseApiLimit();
    }

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
