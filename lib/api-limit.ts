import { auth } from '@clerk/nextjs';
import { MAX_FREE_COUNTS } from '@/const';
import prismadb from '@/lib/prismadb';

export const IncreaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) return;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userID: userId,
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userID: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: {
        userID: userId,
        count: 1,
      },
    });
  }
};

export const CheckApiLimit = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userID: userId,
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) return true;
  else return false;
};

export const GetApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) return 0;

  const limit = await prismadb.userApiLimit.findUnique({
    where: {
      userID: userId,
    },
  });

  if (!limit) return 0;

  return limit.count;
};
