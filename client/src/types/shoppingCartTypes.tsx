import { ReactNode } from "react";
export type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type shoppingCartContext = {
  openCloseCart: () => void;
  cartItems: CartItem[];
  cartQuantity: number;
  getItemQuantity: (itemId: number) => number;
  increaseCartQuantity: (itemId: number) => void;
  decreaseCartQuantity: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  emptyCart: () => void;
  calculateTotal: () => number;
};

export type CartItem = {
  itemId: number;
  quantity: number;
};

export type CartItemProps = {
  itemId: number;
  quantity: number;
};
