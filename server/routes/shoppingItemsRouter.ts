import { Router } from "express";
import {
  addItems,
  getAllItems,
  getUserItems,
  removeItem,
  updateItem,
} from "../controllers/shoppingController";

const shoppingItemsRouter = Router();

/**
 * @route POST /items/additems
 * @desc add shopping items
 * @access Private
 */
shoppingItemsRouter.post("/additems", addItems);

/**
 * @route POST /items/allitems
 * @desc get all items
 * @access Public
 */
shoppingItemsRouter.get("/allitems", getAllItems);

/**
 * @route POST /items/useritems
 * @desc get all user items
 * @access Private
 */
shoppingItemsRouter.post("/useritems", getUserItems);

/**
 * @route PUT /items/updateitem
 * @desc Update item
 * @access Private
 */
shoppingItemsRouter.put("/updateitem", updateItem);

/**
 * @route Post /items/removeitem
 * @desc Remove item
 * @access Private
 */
shoppingItemsRouter.post("/removeitem", removeItem);

export default shoppingItemsRouter;
