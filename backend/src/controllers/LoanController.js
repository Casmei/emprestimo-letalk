import { createLoan, getLoans } from '../services/LoanService.js';
import { createSimulation } from '../services/SimulationService.js';

export const create = async (req, res) => {
  const result = await createLoan({ ...req.body });
  if (result.type == "error") {
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
}

export const indexLoan = async (req, res) => {
  const result = await getLoans();

  return res.status(200).json(result);
}

export const simulate = async (req, res) => {
  const result = await createSimulation({ ...req.body });
  if (result.type == "error") {
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
}
