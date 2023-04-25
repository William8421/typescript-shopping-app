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
exports.postTest = exports.getTest = void 0;
const Test_1 = __importDefault(require("../models/Test"));
const getTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield Test_1.default.find();
    res.status(200).json(allUsers);
});
exports.getTest = getTest;
const postTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const newTest = new Test_1.default({ name });
    try {
        yield newTest.save();
        res.status(201).json(newTest);
    }
    catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
});
exports.postTest = postTest;
