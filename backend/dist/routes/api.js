"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _LoanController = require("../controllers/LoanController.js");

var _LoanValidate = require("../middleware/LoanValidate.js");

var _SimulationValidate = require("../middleware/SimulationValidate.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var indexRouter = _express["default"].Router();

indexRouter.post('/loan/simulation', (0, _LoanValidate.loanValidate)(), _LoanController.simulate);
indexRouter.post('/loan', (0, _SimulationValidate.simulationValidate)(), _LoanController.create);
indexRouter.get('/loan', _LoanController.index);
var _default = indexRouter;
exports["default"] = _default;