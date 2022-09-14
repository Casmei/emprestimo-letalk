import { PrismaClient } from "@prisma/client";
import { findState } from "./StateService.js";
const prisma = new PrismaClient();


export const findOrCreateUser = async (cpf, stateId, birthDate) => {

  const state = await findState(stateId);

  let user = await prisma.user.findFirst({
    where: { cpf }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        cpf,
        birthDate: new Date(birthDate),
        state: {
          connect: {
            id: state.id
          }
        }
      }
    });
  };

  return user;

}
