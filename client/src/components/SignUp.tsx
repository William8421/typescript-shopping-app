import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useUser } from '../context/userContext';

type SignUpModalProps = {
  isSignUpModalOpen: string
  openCloseSignUpModal: () => void
  switcher: () => void
}

export default function SignUp({isSignUpModalOpen, openCloseSignUpModal, switcher}: SignUpModalProps) {
    const {signingUp} = useUser()
    const [signUpForm, setSignUpForm] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [passToggle, setPassToggle] = useState({
      showPassword: "",
      showConfirmPassword: "",
    });
  
    function show_hidePassword(e: string) {
      if (e === "password") {
        setPassToggle({
          ...passToggle,
          showPassword: e === passToggle.showPassword ? "" : e,
        });
      } else if (e === "confirmPassword") {
        setPassToggle({
          ...passToggle,
          showConfirmPassword: e === passToggle.showConfirmPassword ? "" : e,
        });
      }
    }



      async function submit(e: any){
        e.preventDefault();
        const userData = {
            username: signUpForm.username,
            firstName: signUpForm.firstName ,
            lastName: signUpForm.lastName,
            email: signUpForm.email,
            password: signUpForm.password,
            confirmPassword: signUpForm.confirmPassword,
        }
        signingUp(userData)
        openCloseSignUpModal()
              e.target.reset()
      }

    function signUpFormHandler(e: React.ChangeEvent<HTMLInputElement>){
        const element = e.target.name;
        const value = e.target.value;
        setSignUpForm((prevState) => {
            return {...prevState, [element]: value}
        });
    }

 
  return (
    <div>
      <div className={`signUp-hidden-div ${isSignUpModalOpen}`} onClick={openCloseSignUpModal}></div>
      <div className={`signUp-modal ${isSignUpModalOpen}`}>
        <div className='signUp-modal-header'>
          <h2>Sign Up</h2>
          <button className='close-button' onClick={openCloseSignUpModal}>X</button>
            </div>
        <div className='signUp-form-container' onChange={signUpFormHandler}>
      <form onSubmit={submit}>
        <div>
            username
            <input type='text' name='username'/>
        </div>
        <div>first name
        <input type='text' name='firstName'/>
        </div>
        <div>last name
        <input type='text' name='lastName'/>
        </div>
        <div>email
        <input type='text' name='email'/>
        </div>
        <div className='password-container'>password
        <input 
        type={
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
        <div className='password-container'>confirm password
        <input
        type={
          passToggle.showConfirmPassword === "confirmPassword"
            ? "text"
            : "password"
        }
        name='confirmPassword'
        required
        minLength={6}
        autoComplete=''
        />
        {passToggle.showConfirmPassword === "confirmPassword" ? (
                  <AiOutlineEyeInvisible
                    className="showHidePassword"
                    onClick={() => show_hidePassword("confirmPassword")}
                  />
                ) : (
                  <AiOutlineEye
                    className="showHidePassword"
                    onClick={() => show_hidePassword("confirmPassword")}
                  />
                )}
        </div>
        <button type='submit'>
            Sign Up
        </button>
      </form>
        </div>
      </div>
    </div>
  )
}
