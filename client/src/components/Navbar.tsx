import { useShoppingCart } from '../context/shoppingCartContext'
import { NavLink } from 'react-router-dom'
import { useUser } from '../context/userContext'
import { IoCart } from 'react-icons/io5'

export default function Navbar() {
  const { openCloseSignInModal, openCloseSignUpModal, switcher, menu, burger, signOut, isLoggedIn } = useUser()

  const { openCloseCart, cartQuantity } = useShoppingCart()

  return (
    <div className='navbar-container'>
      <div className={`backdrop ${menu}`} onClick={switcher}></div>
      <div className='navbar-sub-container'>
        <div className="bar-button-username">
        <div className='bar-button' onClick={switcher}>
          <div className={`bar top ${burger}`}></div>
          <div className={`bar middle ${burger}`}></div>
          <div className={`bar bottom ${burger}`}></div>
        </div>
        {isLoggedIn && <div className='username-container'>
        <div><NavLink className='username' to='myprofile' >{isLoggedIn.username[0].toUpperCase()}</NavLink></div>
          </div>}
        <NavLink className="app-name" to="/"><h2>Shopping App</h2></NavLink>
        </div>
        <div className='pages'>
          <div className={`burger-menu ${menu}`}>
            <div className='routes-container'>
              <NavLink to={"/"} ><button onClick={switcher}>Home</button></NavLink>
              <NavLink to={"/store"}><button onClick={switcher}>Store</button></NavLink>
              <NavLink to={"/about"}><button onClick={switcher}>About</button></NavLink>
            </div>
            <div>
              {!isLoggedIn ? (
                <div className='signUp-signIn-container'>
                  <button onClick={openCloseSignUpModal}>Sign up</button>
                  <button onClick={openCloseSignInModal}>Sign in</button>
                </div>
              )
                :
                (<div className='signUp-signIn-container'><button onClick={signOut} >Logout</button></div>)
              }
            </div>
          </div>
        </div>
      </div>
      <div className='cart-button-div'>
        <button className='cart-button' onClick={openCloseCart}>
          <IoCart className='cart-icon' />
          {cartQuantity > 0 ?
            <div className='shopping-cart'>
              {cartQuantity}
            </div>
            :
            (null)
          }
        </button>
      </div>
    </div>
  )

}
