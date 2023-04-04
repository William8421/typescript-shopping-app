import { useShoppingCart } from "../context/shoppingCartContext"
import formatCurrency from "../utilities/formatCurrency"

type ShoppingItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export  function ShoppingItem({id, name, price, imgUrl}: ShoppingItemProps) {
    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
    const quantity = getItemQuantity(id) 
  return (
    <div className="shopping-item">
        <div className="item-container">
        <img src={imgUrl} alt={name} />
        <div className="item-info">
        <h3>{name}</h3>
        <span className="item-price">{formatCurrency(price)}</span>
        </div>
        </div>
        {quantity === 0 ? (
                <button onClick={() => increaseCartQuantity(id)} >Add To Cart</button>
            ) : <div className="buttons-container">
                <div className="adding-container">
                    <button onClick={() => decreaseCartQuantity(id)}>-</button>
                    <div className="quantity">
                    <span>{quantity}</span> in Cart
                    </div>
                    <button onClick={() => increaseCartQuantity(id)}>+</button>
                </div>
                <button onClick={() => removeFromCart(id)}>Remove</button>
            </div> }
    </div>
  )
}
