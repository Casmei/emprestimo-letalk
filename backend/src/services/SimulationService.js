import { PrismaClient } from "@prisma/client";
import { roundDecimals } from "../utils/numberFormat.js";
const prisma = new PrismaClient();

export const createSimulation = async ({ stateId, value, portionValue }) => {

  const validValueCheck = valueRequeriments(value, portionValue);

  if (validValueCheck.type == 'error') {
    return validValueCheck;
  }

  const fee = (await prisma.state.findFirst({
    where: { id: stateId }
  })).percent / 100;

  const month = Math.ceil(value / portionValue) + 1;

  let debitBalance = [];
  let interestPerMonth = [];
  let debitBalanceAdjusted = [];
  let installmentValue = [];
  let valueSeed = value;
  let totalInterest = 0;

  for (let index = 0; index < month; index++) {
    totalInterest += valueSeed * fee;
    debitBalance.push(roundDecimals(valueSeed, 2));
    interestPerMonth.push(roundDecimals(valueSeed * fee, 2));
    debitBalanceAdjusted.push(roundDecimals(debitBalance[index] + interestPerMonth[index], 2));
    installmentValue.push(roundDecimals(debitBalanceAdjusted[index] > portionValue ? portionValue : debitBalanceAdjusted[index], 2));
    valueSeed = valueSeed + (valueSeed * fee);
    valueSeed -= portionValue;
  }

  const totalLoan = value + totalInterest;

  return {
    data: {
      value,
      portionValue,
      fee: fee,
      month,
      totalInterest: roundDecimals(totalInterest, 2),
      totalLoan: roundDecimals(totalLoan, 2),
      debitBalance,
      interestPerMonth,
      debitBalanceAdjusted,
      installmentValue,
    }
  };
}

export const valueRequeriments = (value, portionValue) => {

  if (portionValue > value) {
    return { type: "error", msg: "valor da parcela maior que o emprestimo" }
  }


  const isMinValue = value >= 50000;

  if (!isMinValue) {
    return { type: "error", msg: "valor minimo do emprestimo não atingido!", param: "value" };
  }

  const isMinValuePortion = portionValue >= (value * 0.01);

  if (!isMinValuePortion) {
    return { type: "error", msg: "valor minimo da parcela não atingido!", param: "portionValue" };
  }

  return { type: "success" };
}
