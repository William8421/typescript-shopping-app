import {useShoppingCart } from "../context/shoppingCartContext"
import {ItemsDataProps} from '../types/userTypes'
import formatCurrency from "../utilities/formatCurrency"


export  function ShoppingItem({itemId, itemName, price, imgUrl}: ItemsDataProps) {
    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
    const quantity = getItemQuantity(itemId) 
  return (
    <div className="shopping-item">
        <div className="item-container">
        <img src={imgUrl} alt={itemName} />
        <div className="item-info">
        <h3>{itemName}</h3>
        <span className="item-price">{formatCurrency(price)}</span>
        </div>
        </div>
        {quantity === 0 ? (
                <button className='main-button' onClick={() => increaseCartQuantity(itemId)} >Add To Cart</button>
            ) : <div className="buttons-container">
                <div className="adding-container">
                    <button className='increase-decrease-buttons' onClick={() => decreaseCartQuantity(itemId)}>-</button>
                    <div className="quantity">
                    <span>{quantity}</span> in Cart
                    </div>
                    <button className='increase-decrease-buttons' onClick={() => increaseCartQuantity(itemId)}>+</button>
                </div>
                <button className='main-button' onClick={() => removeFromCart(itemId)}>Remove</button>
            </div> }
    </div>
  )
}
