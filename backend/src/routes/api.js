import express from 'express';
import { indexLoan, create, simulate } from '../controllers/LoanController.js'
import { indexState } from '../controllers/StateController.js';
import { loanValidate } from '../middleware/LoanValidate.js';
import { simulationValidate } from '../middleware/SimulationValidate.js';

var indexRouter = express.Router();

indexRouter.post('/loan/simulation', loanValidate(), simulate)
indexRouter.post('/loan', simulationValidate(), create);
indexRouter.get('/loan', indexLoan);
indexRouter.get('/state', indexState)

export default indexRouter;
