import { useShoppingCart } from "../context/shoppingCartContext"
import  ShoppingItem  from "../data/items.json"
import formatCurrency from "../utilities/formatCurrency"

type CartItemProps = {
    id: number
    quantity: number
}

export default function CartItem({id, quantity}: CartItemProps) {
  const {removeFromCart,increaseCartQuantity,decreaseCartQuantity} = useShoppingCart()
  const item = ShoppingItem.find(i => i.id === id)
  if(item == null) return null
  return (
    <div className="cart-item">
        <img src={item.imgUrl}/>

        <div className="cart-container">
          <div className="name-price">
            <div className="cart-item-name">{item.name} </div>
            <div className="cart-item-price">{formatCurrency(item.price)}</div>
          </div>
        
          <div className="quantity-total">
            <div className="cart-item-quantity">
              <button onClick={() => decreaseCartQuantity(id)}>-</button>
              x{quantity}
              <button onClick={() => increaseCartQuantity(id)}>+</button>
            </div>
            <div className="cart-item-total">{formatCurrency(item.price * quantity)}</div>
          </div>

        </div>

        <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  )
}
