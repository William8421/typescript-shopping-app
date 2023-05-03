import { ReactNode } from "react";
export type ShoppingCartProviderProps ={
    children: ReactNode
}

export type shoppingCartContext = {
    openCloseCart: () => void
    cartItems: CartItem[]
    cartQuantity: number
    getItemQuantity: (itemId: number) => number
    increaseCartQuantity: (itemId: number) => void
    decreaseCartQuantity: (itemId: number) => void
    removeFromCart: (itemId: number) => void
    emptyCart: () => void
}



// export type SignInUserDataProps = {
//     email: string
//     password: string
// }

// export type SignUpUserDataProps = {
//     username: string
//     firstName: string
//     lastName: string
//     email: string
//     password: string
//     confirmPassword: string
// }

export type CartItem ={ 
    itemId: number
    quantity: number
}

export type CartItemProps = {
    itemId: number
    quantity: number
}

// export type ItemsDataProps = {
//     itemId: number;
//     itemName: string;
//     price: number;
//     imgUrl: string;
//   }

// export type NewItemProps = {
//     itemId?: number;
//     itemName?: string;
//     price?: number;
//     imgUrl?: string;    
// }  

// export type SelectedItemProps = {
//   itemID: number
//   itemName: string
// }


// export type UserDataProps = {
//     id: number
//     username: string
//     firstName: string
//     lastName: string
//     email: string
// }
// export type UpdateData = {
//     id: number
//     username?: string
//     firstName?: string
//     lastName?: string
// }

// export type AddItemProps ={
//     userId: number;
//     itemName: string;
//     price: number;
//     imgUrl: string
// }

// export type UserStorage = {
//     id: number
//     username: string
//     token: string
// }

// export type DeleteItemProps = {
//     itemId: number
//     itemName: string
// }