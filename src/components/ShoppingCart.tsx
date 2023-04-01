import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/shoppingCartContext'
import formatCurrency from '../utilities/formatCurrency'
import CartItem from './CartItem'
import  ShoppingItem  from "../data/items.json"

type ShoppingCartProps = {
    isOpen: boolean
}

export default function ShoppingCart({isOpen}: ShoppingCartProps) {
    const {closeCart, cartItems, emptyCart} = useShoppingCart()
    
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement ="end">
      <Offcanvas.Header closeButton style={{backgroundColor: "#669BBC"}}>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>{cartItems.map(item => (
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
        <button onClick={() => emptyCart()}>Empty Cart</button>
        :
        <span onClick={() => closeCart()}>Back to Shopping</span>
        }
        
        
        </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
