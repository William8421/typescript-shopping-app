import {Schema, model} from 'mongoose';

interface shoppingItems{
    owner: number;
    itemId: number;
    itemName: string;
    price: number;
    imgUrl: string
}

const shoppingItemsSchema = new Schema<shoppingItems>({
    owner: Number,
    itemId: Number,
    itemName: String,
    price: Number,
    imgUrl: String
})

const ShoppingItems = model<shoppingItems>('ShoppingItems', shoppingItemsSchema);

export default ShoppingItems
