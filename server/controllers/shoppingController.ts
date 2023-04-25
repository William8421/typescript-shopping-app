import { Request, Response } from 'express';
import ShoppingItems from '../models/ShoppingItems';
import User from '../models/User';

export const addItems = async (req: Request, res: Response) => {
    const {id, itemName, price, imgUrl, userId} = req.body;

    const allItems = await ShoppingItems.find();

    const Id =
    allItems.reduce((a, b) => {
      return Math.max(a, b.itemId);
    }, 0) + 1;
    
    const owner = await User.find({id: userId})
    const newItem = await ShoppingItems.create({
        owner: owner[0].id,
        itemId: Id,
        itemName,
        price,
        imgUrl
    })
    res.status(200).json(newItem)
}

export const getAllItems = async (req: Request, res: Response) => {
    const allItems = await ShoppingItems.find()
    
    res.status(200).json(allItems) 
}

export const getUserItems = async (req: Request, res: Response) => {
    const {id} = req.body
    const allItems = await ShoppingItems.find().populate("owner")
    const userItems = allItems.filter(item => {
        return item.owner === id
    })
    

    res.status(200).json(userItems)
}

export const updateItem = async (req: Request, res: Response) => {
    const {itemId, itemName, price, imgUrl} = req.body
    try {
        await ShoppingItems.findOneAndUpdate({itemId}, {
            itemName,
            price,
            imgUrl
        })
        res.status(200).json(`${itemName} was updated successfully`)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const removeItem = async (req: Request, res: Response) => {
    const {itemId, itemName} = req.body    
    try {
        await ShoppingItems.findOneAndRemove({itemId})
        res.status(200).json(`${itemName} deleted`)
    } catch (error) {
        res.status(500).json(error);
    }
}
