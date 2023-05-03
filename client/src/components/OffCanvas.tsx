import { useShoppingCart } from '../context/shoppingCartContext'
import { useUser } from '../context/userContext'
import { ItemsDataProps } from '../types/userTypes'
import formatCurrency from '../utilities/formatCurrency'
import CartItem from './CartItem'

type ShoppingCartProps = {
    isOpen: string
}

export default function ShoppingCart({isOpen}: ShoppingCartProps) {
    const {openCloseCart, cartItems, emptyCart} = useShoppingCart()
    const {allData} = useUser()

  return (
    <div>
      <div className={`hidden-div ${isOpen}`} onClick={openCloseCart}></div>
      <div className={`off-canvas ${isOpen}`}>
        <div className='off-canvas-header'>
          <h2>Cart</h2>
          <button className='close-button' onClick={openCloseCart}>X</button>
        </div>
      <div className='items-container'>
    {cartItems.map(item => (
            <CartItem key={item.itemId} {...item}/>
        ))}
        <div className='total'>
          <div>
            Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                const item = allData?.find((i: ItemsDataProps) => i.itemId === cartItem.itemId)
                return total + (item?.price || 0) * cartItem.quantity
            }, 0))}
          </div>
            {cartItems.length !== 0?
            <div>
            <button onClick={() => emptyCart()}>Empty Cart</button>
            <button>Check Out</button>
            </div>
            :
            <span onClick={() => openCloseCart()}>Add Items</span>
        }
      </div>
      </div>
      </div>
    </div>
  )
}
