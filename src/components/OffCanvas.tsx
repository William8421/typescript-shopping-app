import { useShoppingCart } from '../context/shoppingCartContext'
import formatCurrency from '../utilities/formatCurrency'
import CartItem from './CartItem'
import  ShoppingItem  from "../data/items.json"

type ShoppingCartProps = {
    isOpen: string
}

export default function ShoppingCart({isOpen}: ShoppingCartProps) {
    const {openCloseCart, cartItems, emptyCart} = useShoppingCart()
    
  return (
    <div>
      <div className={`hidden-div ${isOpen}`} onClick={openCloseCart}></div>
      <div className={`off-canvas ${isOpen}`}>
        <div className='off-canvas-header'>
          <h2>Cart</h2>
          <button onClick={openCloseCart}>X</button>
        </div>
      <div className='items-container'>
    {cartItems.map(item => (
            <CartItem key={item.id} {...item}/>
        ))}
        <div className='total'>
          <div>
            Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                const item = ShoppingItem.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
            }, 0))}
          </div>
            {cartItems.length !== 0?
            <div>
            <button onClick={() => emptyCart()}>Empty Cart</button>
            <button>Check Out</button>
            </div>
            :
            <span onClick={() => openCloseCart()}>Back to Shopping</span>
        }
      </div>
      </div>
      </div>
    </div>
  )
}
