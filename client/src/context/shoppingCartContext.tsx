import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import OffCanvas from '../components/OffCanvas'
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  ShoppingCartProviderProps,
  shoppingCartContext,
  CartItem,
} from '../types/types'
import axios from "axios";






const shoppingCartContext = createContext({} as shoppingCartContext)
export function useShoppingCart() {
    return useContext(shoppingCartContext)
}



export function ShoppingCartProvider({children}:
    ShoppingCartProviderProps){
        const [isOpen, setIsOpen] = useState('off')
        const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])
        const [allData, setAllData] = useState([])

        async function fetchData(){     
          const allItems = (await axios.get('http://localhost:8000/items/allitems'))          
          setAllData(allItems.data)
        }

        
          

        function openCloseCart(){
          setIsOpen(isOpen === 'off'? 'on' : 'off')          
        }

        const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
        

        function getItemQuantity(itemId: number){
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
        function emptyCart(){
          setCartItems([])
        }

        
    return <shoppingCartContext.Provider value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        emptyCart,
        cartQuantity,
        cartItems,
        openCloseCart,
        fetchData,
        allData,
        setAllData,
        }}>
        {children}
        {<OffCanvas isOpen= {isOpen}/>}
        </shoppingCartContext.Provider>
}