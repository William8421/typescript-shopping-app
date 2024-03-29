"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getInfo = exports.tokenValidator = exports.signInUser = exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../helper/generateToken"));
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findByEmail(email);
});
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findByUsername(username);
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, firstName, lastName, email, password, itemName, price, imgUrl } = req.body;
    const existingEmailUser = yield findUserByEmail(email);
    if (existingEmailUser) {
        return res.status(409).json({ msg: "Sorry, the email already exists" });
    }
    const existingUsernameUser = yield findUserByUsername(username);
    if (existingUsernameUser) {
        return res.status(409).json({ msg: "Sorry, the username already exists" });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const allUsers = yield User_1.default.find();
    const id = allUsers.reduce((a, b) => {
        return Math.max(a, b.id);
    }, 0) + 1;
    const newUser = yield User_1.default.create({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        id,
        itemName,
        price,
        imgUrl
    });
    if (newUser) {
        const payload = { id, username };
        const token = (0, generateToken_1.default)(payload);
        res.status(200).json({ user: newUser, token, msg: "Thank you for signing up!" });
    }
});
exports.registerUser = registerUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = yield findUserByEmail(email);
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        return res.status(404).json({ msg: 'Either email or password is incorrect!' });
    }
    const token = (0, generateToken_1.default)({ id: user.id, username: user.username });
    res.status(200).json({
        message: "You are logged in!",
        token,
        user
    });
});
exports.signInUser = signInUser;
const tokenValidator = (req, res) => {
    res.json(req.body);
};
exports.tokenValidator = tokenValidator;
const getInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const user = yield User_1.default.findOne({ id });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getInfo = getInfo;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, firstName, lastName } = req.body;
    try {
        yield User_1.default.findOneAndUpdate({ id }, {
            username,
            firstName,
            lastName,
        });
        res.status(200).json(`Your information was updated successfully`);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateUser = updateUser;
