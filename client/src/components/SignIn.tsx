import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

  type LoginModalProps = {
    isLoginModalOpen: string
    openCloseLoginModal: () => void
    switcher: () => void
  }

export default function SignIn({isLoginModalOpen, openCloseLoginModal, switcher}: LoginModalProps) {
    const navigate = useNavigate()
    const [signInForm, setSignInForm] = useState({
        email: '',
        password: '',
    })

      function signUpFormHandler(e: React.ChangeEvent<HTMLInputElement>){
        const element = e.target.name;
        const value = e.target.value;
        setSignInForm((prevState) => {
            return {...prevState, [element]: value}
        });
    }
    
    async function submit(e: React.FormEvent){
        e.preventDefault();
        try {
            const userData = {
                email: signInForm.email,
                password: signInForm.password,
            }
            const response = await axios.post('http://localhost:8000/user/signin', userData)
            const userStorage = {
                username: response.data.user.username,
                id: response.data.user.id,
                token: response.data.token,
                isAuthenticated: true
              };
              localStorage.setItem("user", JSON.stringify(userStorage));
              openCloseLoginModal()
              e.target.reset()        
              switcher()
              navigate('/myprofile')
            
        } catch (error) {
            if(error.response.data.errors){
                alert(error.response.data.errors[0].msg);                
            }
            else if(error.response){
                alert(error.response.data.msg);                
            }
            console.log(error);            
        }
        
      }

  return (
    <div>
      <div className={`login-hidden-div ${isLoginModalOpen}`} onClick={openCloseLoginModal}></div>
      <div className={`login-modal ${isLoginModalOpen}`}>
      <div className='login-modal-header'>
                <h2>Login</h2>
                <button className='close-button' onClick={openCloseLoginModal}>X</button>
            </div>

        <div className='login-form-container' onChange={signUpFormHandler}>
      <form onSubmit={submit}>
        <div>email
        <input type='text' name='email'/>
        </div>
        <div>password
        <input type='text' name='password'/>
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
