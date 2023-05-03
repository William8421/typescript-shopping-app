import { useShoppingCart } from "../context/shoppingCartContext"
import { useUser } from "../context/userContext"
import {CartItemProps } from "../types/shoppingCartTypes"
import {ItemsDataProps} from '../types/userTypes'
import formatCurrency from "../utilities/formatCurrency"



export default function CartItem({itemId, quantity}: CartItemProps) {
  const {removeFromCart,increaseCartQuantity,decreaseCartQuantity} = useShoppingCart()
  const {allData} = useUser()
  
  const item = allData?.find((i: ItemsDataProps) => i.itemId === itemId)
  if(item == null) return null
  return (
    <div className="cart-item">
        <img src={item.imgUrl}/>

        <div className="cart-container">
          <div className="name-quantity">
            <div className="cart-item-name">{item.itemName} </div>
            <div className="cart-item-quantity">
              <button onClick={() => decreaseCartQuantity(itemId)}>-</button>
              x{quantity}
              <button onClick={() => increaseCartQuantity(itemId)}>+</button>
            </div>
            
          </div>
        
          <div className="price-total">
            
            <div className="cart-item-price">{formatCurrency(item.price)}</div>
            <div className="cart-item-total">{formatCurrency(item.price * quantity)}</div>
          </div>

        </div>

        <button onClick={() => removeFromCart(item.itemId)}>Remove</button>
    </div>
  )
}
