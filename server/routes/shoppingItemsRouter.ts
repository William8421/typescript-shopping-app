import { Router } from "express";
import { addItems, getAllItems, getUserItems, removeItem, updateItem } from "../controllers/shoppingController";

const shoppingItemsRouter = Router()

/**
 * @method POST /items/additems
 * @desc add shopping items
 * @access Private
 */
shoppingItemsRouter.post('/additems', addItems)

/**
 * @method POST /items/allitems
 * @desc get all items
 * @access Public
 */
shoppingItemsRouter.get('/allitems', getAllItems)

/**
 * @method POST /items/useritems
 * @desc get all user items
 * @access Private
 */
shoppingItemsRouter.post('/useritems', getUserItems)

/**
 * @method POST /items/updateitems
 * @desc update items
 * @access Private
 */
shoppingItemsRouter.post('/updateitem', updateItem)

/**
 * @method POST /items/removeitem
 * @desc remove item
 * @access Private
 */
shoppingItemsRouter.post('/removeitem', removeItem)

export default shoppingItemsRouter