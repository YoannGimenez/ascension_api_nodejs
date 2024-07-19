const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const FieldValidation = require('../middleware/fieldValidation');
const ROLE_ENUM = require("../enums/role.enum");


const authController = {
    register: async (req, res) => {

        const fieldValidation = new FieldValidation();

        fieldValidation.textValidator('username', true, 3, 50, 'Username');
        fieldValidation.emailValidator('email', true);
        fieldValidation.passwordValidator('password');
        // fieldValidation.confirmPasswordValidator('confirmPassword');

        const errors = await fieldValidation.validateRules(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array(), status: 422 });
        }

        try {
            const registerData = req.body;

            if (registerData.password !== registerData.confirmPassword){
                return res.status(400).json({ errors: [{
                    msg : "Passwords do not match.",
                    path: "confirmPassword"
                    }],
                    status: 409 });
            }

            const existingUserEmail = await User.findOne({where: {email: registerData.email}});
            if (existingUserEmail) {
                return res.status(409).json({ errors: [{
                        msg : "Email address is already in use.",
                        path: "email"
                    }],
                    status: 409 });
            }
            const existingUserUsername = await User.findOne({where: {username: registerData.username}});
            if (existingUserUsername) {
                return res.status(409).json({ errors: [{
                        msg : "Username is already in use.",
                        path: "username"
                    }],
                    status: 409 });
            }
            registerData.password = await authController._hashPassword(registerData.password);
            registerData.role = ROLE_ENUM.ROLE_USER;
            let user = await User.create(registerData);
            let token = authController._generateToken(user);
            res.status(201).json({token : token});

        } catch (err) {
            res.status(500).json({
                message : err.message,
                status : 500
            });
        }



    },
    login: async (req, res) => {

        try {

            const loginData = req.body;

            const existingUser = await User.findOne({where: {username: loginData.username}});
            if (!existingUser) {
                return res.status(409).json({ error: "Incorrect username or password", status: 409 });
            }

            const passwordMatch = await bcrypt.compare(loginData.password, existingUser.password);
            if (!passwordMatch){
                return res.status(409).json({ error: "Incorrect username or password", status: 409 });
            }

            let token = authController._generateToken(existingUser);
            res.status(201).json({token});

        } catch(err) {
            res.status(500).json({
                message : err.message,
                status : 500
            });
        }


    },
    _generateToken: (user) => {
        const payload = {
            userId: user.id,
            role: user.role
        };

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
    },

    _hashPassword: async (password) => {
        return await bcrypt.hash(password, 10);
    },
}


module.exports = authController;
