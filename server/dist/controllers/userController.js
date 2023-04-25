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
exports.removeUser = exports.updateUser = exports.getInfo = exports.signInUser = exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../helper/generateToken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { username, firstName, lastName, email, password, itemName, price, imgUrl } = req.body;
    const user = yield User_1.default.findByEmail(email);
    if (user)
        return res.status(409).json({ msg: "Sorry the e-mail already exists" });
    const userName = yield User_1.default.findByUsername(username);
    if (userName)
        return res.status(409).json({ msg: "Sorry the username already exists" });
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const allUsers = yield User_1.default.find();
    const Id = allUsers.reduce((a, b) => {
        return Math.max(a, b.id);
    }, 0) + 1;
    allUsers.map(user => user.password);
    const newUser = yield User_1.default.create({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        id: Id,
        itemName,
        price,
        imgUrl
    });
    if (newUser) {
        const payload = {
            id: Id,
            username: username,
        };
        const token = (0, generateToken_1.default)(payload);
        res
            .status(200)
            .json({ user: newUser, token, msg: "Thank you for signing up!" });
    }
});
exports.registerUser = registerUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { email, password } = req.body;
    const user = yield User_1.default.findByEmail(email);
    if (!user) {
        return res.status(404).json({
            msg: 'Either email or password is incorrect!'
        });
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(404).json({
            msg: 'Either email or password is incorrect!'
        });
    }
    const token = (0, generateToken_1.default)({ id: user.id, name: user.name });
    res.status(200).json({
        message: "you are logged in !!!",
        token: token,
        user: user,
    });
});
exports.signInUser = signInUser;
const getInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const user = yield User_1.default.findOne({ id });
        res.status(200).json([user]);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getInfo = getInfo;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, firstName, lastName, } = req.body;
    try {
        yield User_1.default.findOneAndUpdate({ id }, {
            username,
            firstName,
            lastName,
        });
        res.status(200).json(`your information was updated successfully`);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateUser = updateUser;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, username } = req.body;
    try {
        yield User_1.default.findByIdAndRemove({ _id });
        res.status(200).json(`${username} deleted successfully`);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.removeUser = removeUser;
