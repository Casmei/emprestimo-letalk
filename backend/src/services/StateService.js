import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const findState = async (stateId) => {

  const state = prisma.state.findFirst({
    where: { id: stateId }
  });

  return state;
}
