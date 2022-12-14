import { check, validationResult } from "express-validator"

export const loanValidate = () => {

  return [
    check('cpf').isLength({ min: 11 }).isNumeric().notEmpty(),
    check('stateId').isUUID().notEmpty(),
    check('birthDate').isDate().notEmpty(),
    check('value').isFloat().notEmpty(),
    check('portionValue').isFloat().notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
      }
      next();
    }
  ];
}
