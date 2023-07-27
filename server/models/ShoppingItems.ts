import { Schema, model } from 'mongoose';

interface ShoppingItem {
  owner: number;
  itemId: number;
  itemName: string;
  price: number;
  imgUrl: string;
}

const shoppingItemsSchema = new Schema<ShoppingItem>({
  owner: Number,
  itemId: Number,
  itemName: String,
  price: Number,
  imgUrl: String
});

const ShoppingItems = model<ShoppingItem>('ShoppingItems', shoppingItemsSchema);

export default ShoppingItems;