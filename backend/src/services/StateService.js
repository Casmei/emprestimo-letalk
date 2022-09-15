import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const findState = async (stateId) => {

  const state = await prisma.state.findFirst({
    where: { id: stateId }
  });

  return state;
}


export const getAllStates = async () => {
  const states = await prisma.state.findMany();

  return states;
}
