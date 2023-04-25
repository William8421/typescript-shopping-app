import { useEffect, useState } from 'react'
import { useShoppingCart } from '../context/shoppingCartContext'
import { NavLink, useNavigate } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState('loginModalOff')
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState('signUpModalOff')
  const [menu, setMenu] = useState('off');
  const [burger, setBurger] = useState('close');

  function switcher() {
    setMenu(menu === 'off' ? 'on' : 'off');
    setBurger(burger === 'close' ? 'open' : 'close');
    
  }

  const {openCloseCart, cartQuantity,
  } = useShoppingCart()
  const isLoggedIn = JSON.parse(localStorage.getItem("user")!)
  const navigate = useNavigate()

  function openCloseLoginModal(){
    setIsLoginModalOpen(isLoginModalOpen === 'loginModalOff'? 'loginModalOn' : 'loginModalOff')
  }
  function openCloseSignUpModal(){
    setIsSignUpModalOpen(isSignUpModalOpen === 'signUpModalOff'? 'signUpModalOn' : 'signUpModalOff')
  }


  function signout(){
    localStorage.removeItem('user');
    switcher()
    navigate('/store')
  }
  
  
  return (
    <div className='navbar-container'>

      <div className='navbar-sub-container'>
        <div className='pages'>
          <div className={`burger-menu ${menu}`}>
            <div className='routes-container'>
          <NavLink to={"/"} ><button onClick={switcher}>Home</button></NavLink>
          <NavLink to={"/store"}><button onClick={switcher}>Store</button></NavLink>
          </div>
        <div>
        {!isLoggedIn? (
        <div className='signUp-login-container'>
        <button onClick={openCloseSignUpModal}>Sign Up</button>
        <button onClick={openCloseLoginModal}>Login</button>
        </div>
        )
        :
        (<div className='signUp-login-container'><button onClick={signout} >Logout</button></div>)
        }
        </div>
          </div>
        </div>
        <div className='bar-button' onClick={switcher}>
          <div className={`bar top ${burger}`}></div>
          <div className={`bar middle ${burger}`}></div>
          <div className={`bar bottom ${burger}`}></div>
        </div>
        <div className='username-container'>
        {isLoggedIn? (<div><NavLink className='username' to='myprofile' >{isLoggedIn.username[0].toUpperCase()}</NavLink></div>):(<div className='no-username'></div>)}
        <h2>Shopping App</h2>
        </div>
      </div>

              <button className='cart-button' onClick={openCloseCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
              >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            {cartQuantity > 0?
            <div className='shopping-cart'>
              {cartQuantity}
            </div>
            : 
            (null)
            }
            </button>
            
            <SignIn isLoginModalOpen={isLoginModalOpen} openCloseLoginModal={openCloseLoginModal} switcher={switcher}/>
            <SignUp isSignUpModalOpen={isSignUpModalOpen} openCloseSignUpModal={openCloseSignUpModal} switcher={switcher}/>
    </div>
  )

}
