import { AxiosResponse } from "axios";
import { ReactNode } from "react";
export type ShoppingCartProviderProps ={
    children: ReactNode
}

export type shoppingCartContext = {
    openCloseCart: () => void
    getItemQuantity: (itemId: number) => number
    increaseCartQuantity: (itemId: number) => void
    decreaseCartQuantity: (itemId: number) => void
    removeFromCart: (itemId: number) => void
    emptyCart: () => void
    fetchData: () => void
    cartQuantity: number
    cartItems: CartItem[]
    allData: any
    setAllData: any
}

export type CartItem ={ 
    itemId: number
    quantity: number
}

export type CartItemProps = {
    itemId: number
    quantity: number
}

export type ItemsDataProps = {
    itemId: number;
    itemName: string;
    price: number;
    imgUrl: string;
  }

export type SelectedItemProps = {
  itemID: number
  itemName: string
}


export type UserDataProps = {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
}

export type AddItemProps ={
    userId: number;
    itemName: string;
    price: number;
    imgUrl: string
}