"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shoppingController_1 = require("../controllers/shoppingController");
const shoppingItemsRouter = (0, express_1.Router)();
/**
 * @route POST /items/additems
 * @desc add shopping items
 * @access Private
 */
shoppingItemsRouter.post("/additems", shoppingController_1.addItems);
/**
 * @route POST /items/allitems
 * @desc get all items
 * @access Public
 */
shoppingItemsRouter.get("/allitems", shoppingController_1.getAllItems);
/**
 * @route POST /items/useritems
 * @desc get all user items
 * @access Private
 */
shoppingItemsRouter.post("/useritems", shoppingController_1.getUserItems);
/**
 * @route PUT /items/updateitem
 * @desc Update item
 * @access Private
 */
shoppingItemsRouter.put("/updateitem", shoppingController_1.updateItem);
/**
 * @route Post /items/removeitem
 * @desc Remove item
 * @access Private
 */
shoppingItemsRouter.post("/removeitem", shoppingController_1.removeItem);
exports.default = shoppingItemsRouter;
