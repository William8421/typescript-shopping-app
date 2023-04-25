"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorSignIn = exports.validatorSignUp = void 0;
const express_validator_1 = require("express-validator");
const validatorSignUp = () => {
    return [
        (0, express_validator_1.check)("username", "Name is required").notEmpty(),
        (0, express_validator_1.check)("firstName", "Name is required").notEmpty(),
        (0, express_validator_1.check)("lastName", "Name is required").notEmpty(),
        (0, express_validator_1.check)("email", "Please include a valid email").isEmail(),
        (0, express_validator_1.body)('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
        (0, express_validator_1.check)("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    ];
};
exports.validatorSignUp = validatorSignUp;
const validatorSignIn = () => {
    return [
        (0, express_validator_1.check)("email", "Please include a valid email").isEmail(),
        (0, express_validator_1.check)("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    ];
};
exports.validatorSignIn = validatorSignIn;
