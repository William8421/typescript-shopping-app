import { NavLink } from 'react-router-dom'
import shoppingCartBackground from '../imgs/shopping-cart-background.png'

export default function Home() {
  return (
    <div className='home-container'>
        <div className='home-app-name'>
        <h2>Welcome to</h2>
          <h1>Shopping Cart App</h1>
        <NavLink className='start-shopping' to='/store'>
        <h3>Start Shopping</h3>
        </NavLink>
        </div>
        <div className='cart-img'>
          <img src={shoppingCartBackground} />
        </div>
    </div>
  )
}
