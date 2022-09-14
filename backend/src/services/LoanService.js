import { PrismaClient } from "@prisma/client";
import { valueRequeriments } from "./SimulationService.js";
import { findOrCreateUser } from "./UserService.js";
const prisma = new PrismaClient();

export const createLoan = async ({ cpf, stateId, birthDate, value, portionValue }) => {

  const validValueCheck = valueRequeriments(value, portionValue);
  if (validValueCheck.type == 'error') {
    return validValueCheck;
  }

  const user = await findOrCreateUser(cpf, stateId, birthDate);

  const loan = await prisma.loan.create({
    data: {
      user: {
        connect: {
          id: user.id
        }
      },
      value,
      portionValue
    }
  });

  return loan;
}


export const getLoans = async () => {
  const loans = await prisma.loan.findMany();

  return loans;
}
