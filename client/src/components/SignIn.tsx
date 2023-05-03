import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useShoppingCart } from '../context/shoppingCartContext';
import { useUser } from '../context/userContext';

  type LoginModalProps = {
    isLoginModalOpen: string
    openCloseLoginModal: () => void
    switcher: () => void
  }

export default function SignIn({isLoginModalOpen, openCloseLoginModal, switcher}: LoginModalProps) {
    const {signIn} = useUser()
    const [signInForm, setSignInForm] = useState({
        email: '',
        password: '',
    })
    const [passToggle, setPassToggle] = useState({
      showPassword: "",
    });
  
    function show_hidePassword(e: string) {
      setPassToggle({
        ...passToggle,
        showPassword: e === passToggle.showPassword ? "" : e,
      });
    }

      function signInFormHandler(e: React.ChangeEvent<HTMLInputElement>){
        const element = e.target.name;
        const value = e.target.value;
        setSignInForm((prevState) => {
            return {...prevState, [element]: value}
        });
    }
    
    async function submit(e: React.FormEvent){
        e.preventDefault();
        const userData = {
            email: signInForm.email,
            password: signInForm.password,
        }
        signIn(userData)
        openCloseLoginModal()
        e.target.reset()
      }

  return (
    <div>
      <div className={`login-hidden-div ${isLoginModalOpen}`} onClick={openCloseLoginModal}></div>
      <div className={`login-modal ${isLoginModalOpen}`}>
      <div className='login-modal-header'>
                <h2>Login</h2>
                <button className='close-button' onClick={openCloseLoginModal}>X</button>
            </div>

        <div className='login-form-container' onChange={signInFormHandler}>
      <form onSubmit={submit}>
        <div>email
        <input type='text' name='email'/>
        </div>
        <div className='password-container'>password
        <input type={
                  passToggle.showPassword === "password" ? "text" : "password"
                }
                name='password'
                required
                minLength={6}
                autoComplete=''
                />
                {passToggle.showPassword === "password" ? (
                <AiOutlineEyeInvisible
                  className="showHidePassword"
                  onClick={() => show_hidePassword("password")}
                />
              ) : (
                <AiOutlineEye
                  className="showHidePassword"
                  onClick={() => show_hidePassword("password")}
                />
              )}
        </div>
        <button type='submit'>
            Login
        </button>
      </form>
        </div>
      </div>
    </div>
  )
}
