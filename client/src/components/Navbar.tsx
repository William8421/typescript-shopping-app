import { useShoppingCart } from '../context/shoppingCartContext'
import { NavLink } from 'react-router-dom'
import { useUser } from '../context/userContext'
import { IoCart } from 'react-icons/io5'
import { useEffect } from 'react'

export default function Navbar() {
  const { openCloseLoginModal, openCloseSignUpModal, switcher, menu, burger, signOut, isLoggedIn, validateToken } = useUser()

  const { openCloseCart, cartQuantity } = useShoppingCart()


  useEffect(() => {
    validateToken();
  }, []);

  return (
    <div className='navbar-container'>
      <div className='navbar-sub-container'>
        <div className='bar-button' onClick={switcher}>
          <div className={`bar top ${burger}`}></div>
          <div className={`bar middle ${burger}`}></div>
          <div className={`bar bottom ${burger}`}></div>
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
                <div className='signUp-login-container'>
                  <button onClick={openCloseSignUpModal}>Sign Up</button>
                  <button onClick={openCloseLoginModal}>Login</button>
                </div>
              )
                :
                (<div className='signUp-login-container'><button onClick={signOut} >Logout</button></div>)
              }
            </div>
          </div>
        </div>
        <div className='username-container'>
          {isLoggedIn ? (<div><NavLink className='username' to='myprofile' >{isLoggedIn.username[0].toUpperCase()}</NavLink></div>) : (<div className='no-username'></div>)}
        </div>
      </div>
      <div className='app-name-landscape'>
        <NavLink className='app-name' to='/'><h2>Shopping App</h2></NavLink>
        <div className='landscape-username-container'>
          {isLoggedIn ? (<div><NavLink className='landscape-username' to='myprofile' >{isLoggedIn.username[0].toUpperCase()}</NavLink></div>) : (<div className='landscape-no-username'></div>)}
        </div>
      </div>


      <div className='landscape-bar'>
        <NavLink className='landscape-routes' to='/'>Home</NavLink>
        <NavLink className='landscape-routes' to='/store'>Store</NavLink>
        <NavLink className='landscape-routes' to='/about'>About</NavLink>
        <div>
          {!isLoggedIn ? (
            <div className='landscape-signUp-login-container'>
              <button onClick={openCloseSignUpModal}>Sign Up</button>
              <button onClick={openCloseLoginModal}>Login</button>
            </div>
          )
            :
            (<div className='landscape-signUp-login-container'><button onClick={signOut} >Logout</button></div>)
          }
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
