
import { Prisma } from '@prisma/client';

export type CustomUserWhereInput = Prisma.UserWhereInput & {
  applications?: {
    some?: {
      clerkId: string;
    };
  };
};
