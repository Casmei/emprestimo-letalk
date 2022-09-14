"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loanValidate = void 0;

var _expressValidator = require("express-validator");

var loanValidate = function loanValidate() {
  return [(0, _expressValidator.check)('cpf').isLength({
    min: 11
  }).isNumeric().notEmpty(), (0, _expressValidator.check)('stateId').isUUID().notEmpty(), (0, _expressValidator.check)('birthDate').isDate().notEmpty(), (0, _expressValidator.check)('value').isFloat().notEmpty(), (0, _expressValidator.check)('portionValue').isFloat().notEmpty(), function (req, res, next) {
    var errors = (0, _expressValidator.validationResult)(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    next();
  }];
};

exports.loanValidate = loanValidate;