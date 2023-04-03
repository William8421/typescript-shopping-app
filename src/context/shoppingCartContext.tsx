import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from '../components/ShoppingCart'
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps ={
    children: ReactNode
}

type CartItem ={ 
    id: number
    quantity: number
}

type shoppingCartContext = {
    openCloseCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    emptyCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
}

const shoppingCartContext = createContext({} as shoppingCartContext)
export function useShoppingCart() {
    return useContext(shoppingCartContext)
}



export function ShoppingCartProvider({children}:
    ShoppingCartProviderProps){
        const [isOpen, setIsOpen] = useState('off')
        const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])

        function openCloseCart(){
          setIsOpen(isOpen === 'off'? 'on' : 'off')
          console.log(isOpen);
          
        }

        const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
        

        function getItemQuantity(id: number){
            return cartItems.find(item => item.id === id)?.quantity || 0
        }

        function increaseCartQuantity(id: number) {
            setCartItems(currItems => {
              if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
              } else {
                return currItems.map(item => {
                  if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 }
                  } else {
                    return item
                  }
                })
              }
            })
        }

        function decreaseCartQuantity(id: number) {
            setCartItems(currItems => {
              if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
              } else {
                return currItems.map(item => {
                  if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 }
                  } else {
                    return item
                  }
                })
              }
            })
        }
        function removeFromCart(id: number) {
            setCartItems(currItems => {
              return currItems.filter(item => item.id !== id)
            })
        }  
        function emptyCart(): void{
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
        }}>
        {children}
        {<ShoppingCart isOpen= {isOpen}/>}
        </shoppingCartContext.Provider>
}