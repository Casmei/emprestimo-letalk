"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simulationValidate = void 0;

var _expressValidator = require("express-validator");

var simulationValidate = function simulationValidate() {
  return [(0, _expressValidator.check)('cpf').isLength({
    min: 11
  }).isNumeric(), (0, _expressValidator.check)('stateId').isUUID().notEmpty(), (0, _expressValidator.check)('birthDate').isDate(), (0, _expressValidator.check)('value').isFloat().notEmpty(), (0, _expressValidator.check)('portionValue').isFloat().notEmpty(), function (req, res, next) {
    var errors = (0, _expressValidator.validationResult)(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    next();
  }];
};

exports.simulationValidate = simulationValidate;