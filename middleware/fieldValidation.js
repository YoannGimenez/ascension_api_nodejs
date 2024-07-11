const { validationResult, check } = require('express-validator');

class FieldValidation{

    _validationRules = [];

    textValidator(text, require, min, max, fieldName, punctuation = false) {

        const validationRule = check(text);

        let regex = /^[a-zA-ZÀ-ÿ\s]+$/;

        validationRule.isString().withMessage(`${fieldName} must be text.`).isLength({ min: min, max: max }).withMessage(`${fieldName} must have a size of minimum ${min} and maximum ${max} characters`);

        this._addValidationRule(validationRule);
    }

    emailValidator(email, required){

        const validationRule = check(email);

        if (required) {
            validationRule.notEmpty().withMessage('Email address is required');
        }

        validationRule.isEmail().withMessage('Email address is invalid').normalizeEmail()



        this._addValidationRule(validationRule);
    }

    passwordValidator(password){
        // Create rule
        const validationRule = check(password);

        // Add basic rules for password (Must have a regulated size and have an uppercase letter, a number and a special character)
        validationRule.isLength({ min: 8}).withMessage('Password must have a size of minimum 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage('Password must contain a number, an uppercase letter and a lowercase letter.');

        // Push rules in rules array
        this._addValidationRule(validationRule);
    }

    _addValidationRule(rule) {
        this._validationRules.push(rule);
    }

    async validateRules(req){

        // Asynchronously apply all validation rules to the query fields
        await Promise.all(this._validationRules.map(validationRule => validationRule.run(req)));

        // Get the validation results for the query
        return validationResult(req);
    };

}


module.exports = FieldValidation;
