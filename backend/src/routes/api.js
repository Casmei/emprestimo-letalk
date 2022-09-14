import express from 'express';
import { index, create, simulate } from '../controllers/LoanController.js'
import { loanValidate } from '../middleware/LoanValidate.js';
import { simulationValidate } from '../middleware/SimulationValidate.js';

var indexRouter = express.Router();

indexRouter.post('/loan/simulation', loanValidate(), simulate)
indexRouter.post('/loan', simulationValidate(), create);
indexRouter.get('/loan', index);

export default indexRouter;
