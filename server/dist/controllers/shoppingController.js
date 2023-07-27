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
exports.removeItem = exports.updateItem = exports.getUserItems = exports.getAllItems = exports.addItems = void 0;
const ShoppingItems_1 = __importDefault(require("../models/ShoppingItems"));
const addItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemName, price, imgUrl, userId } = req.body;
    const allItems = yield ShoppingItems_1.default.find();
    const Id = allItems.reduce((a, b) => {
        return Math.max(a, b.itemId);
    }, 0) + 1;
    const newItem = yield ShoppingItems_1.default.create({
        owner: userId,
        itemId: Id,
        itemName,
        price,
        imgUrl,
    });
    res.status(200).json(newItem);
});
exports.addItems = addItems;
const getAllItems = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allItems = yield ShoppingItems_1.default.find();
    res.status(200).json(allItems);
});
exports.getAllItems = getAllItems;
const getUserItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const userItems = yield ShoppingItems_1.default.find({ owner: id });
    res.status(200).json(userItems);
});
exports.getUserItems = getUserItems;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId, itemName, price, imgUrl } = req.body;
    try {
        yield ShoppingItems_1.default.findOneAndUpdate({ itemId }, {
            itemName,
            price,
            imgUrl,
        });
        res.status(200).json(`${itemName} was updated successfully`);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateItem = updateItem;
const removeItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId, itemName } = req.body;
    try {
        yield ShoppingItems_1.default.findOneAndRemove({ itemId });
        res.status(200).json(`${itemName} deleted`);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.removeItem = removeItem;
