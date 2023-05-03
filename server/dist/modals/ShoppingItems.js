"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shoppingItemsSchema = new mongoose_1.Schema({
    owner: Number,
    itemId: Number,
    itemName: String,
    price: Number,
    imgUrl: String
});
const ShoppingItems = (0, mongoose_1.model)('ShoppingItems', shoppingItemsSchema);
exports.default = ShoppingItems;
