import { createContext, useContext, useState } from "react";
import OffCanvas from '../components/OffCanvas'
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  ShoppingCartProviderProps,
  shoppingCartContext,
  CartItem
} from '../types/shoppingCartTypes'






const shoppingCartContext = createContext({} as shoppingCartContext)
export function useShoppingCart() {
  return useContext(shoppingCartContext)
}



export function ShoppingCartProvider({ children }:
  ShoppingCartProviderProps) {

  // cart modal
  const [isOpen, setIsOpen] = useState('off')
  function openCloseCart() {
    setIsOpen(isOpen === 'off' ? 'on' : 'off')
  }
  //============================================================================================================


  // cart items functions
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)


  function getItemQuantity(itemId: number) {
    return cartItems.find(item => item.itemId === itemId)?.quantity || 0
  }

  function increaseCartQuantity(itemId: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.itemId === itemId) == null) {
        return [...currItems, { itemId, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.itemId === itemId) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(itemId: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.itemId === itemId)?.quantity === 1) {
        return currItems.filter(item => item.itemId !== itemId)
      } else {
        return currItems.map(item => {
          if (item.itemId === itemId) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function removeFromCart(itemId: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.itemId !== itemId)
    })
  }
  function emptyCart() {
    setCartItems([])
  }


  return <shoppingCartContext.Provider value={{
    openCloseCart,
    cartItems,
    cartQuantity,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    emptyCart
  }}>
    {children}
    {<OffCanvas isOpen={isOpen} />}
  </shoppingCartContext.Provider>
}