import { getAllStates } from "../services/StateService.js ";

export const indexState = async (req, res) => {
  const states = await getAllStates();

  return res.status(200).json(states);
}
