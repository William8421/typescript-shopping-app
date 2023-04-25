import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

type SignUpModalProps = {
  isSignUpModalOpen: string
  openCloseSignUpModal: () => void
  switcher: () => void
}

export default function SignUp({isSignUpModalOpen, openCloseSignUpModal, switcher}: SignUpModalProps) {
    const navigate = useNavigate()
    const [signUpForm, setSignUpForm] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })



      async function submit(e: React.FormEvent){
        e.preventDefault();
        try {
            const userData = {
                username: signUpForm.username,
                firstName: signUpForm.firstName ,
                lastName: signUpForm.lastName,
                email: signUpForm.email,
                password: signUpForm.password,
                confirmPassword: signUpForm.confirmPassword,
            }
            const response = await axios.post('http://localhost:8000/user/signup', userData)
            
            const userStorage = {
                username: response.data.user.username,
                id: response.data.user.id,
                token: response.data.token,
              };
              localStorage.setItem("user", JSON.stringify(userStorage));
              openCloseSignUpModal()
              switcher()
              e.target.reset()
              navigate('/myprofile')
        } catch (error) {
            if(error.response.data.msg){

                alert(error.response.data.msg)           
            }else if(error.response.data.errors[0].msg){
                alert(error.response.data.errors[0].msg)
            }
            console.log(error);
            
        }
        
      }

    function signUpFormHandler(e){
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
        <div className='signUp-form-container' onChange={(e) => signUpFormHandler(e)}>
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
        <div>password
        <input type='text' name='password'/>
        </div>
        <div>confirm password
        <input type='text' name='confirmPassword'/>
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
