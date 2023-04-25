import axios from 'axios';
import { useEffect, useState } from 'react'
import MyItems from './MyItems';
import { UserDataProps} from '../types/types';
import EditModal from './EditModal';



export default function MyProfile() {
    const [userData, setUserData] = useState<UserDataProps[]>([])
    const [isEditModalOpen, setIsEditModalOpen] = useState('editModalOff')

    const isLoggedIn = JSON.parse(localStorage.getItem("user")!)

    function openCloseEditModal(): void{
        setIsEditModalOpen(isEditModalOpen === 'editModalOff'? 'editModalOn' : 'editModalOff')                  
      }
    
      useEffect(() => {

        async function getUser() {
          try {
            await axios.post('http://localhost:8000/user/getinfo', isLoggedIn)
            .then(response => setUserData(response.data))
          } catch (error) {
            console.log(error);            
          }
        }
        if(isLoggedIn){
          getUser()
        }
      }, [])
    
  return (
    <div className='myProfile-container'>
        <h2>My Information</h2>
      {isLoggedIn? (<div>
        {userData.map(item => {
            return(
                <div className='my-info-container' key={item.id}>
                <div className='info'><span>Username:</span> <span>{item.username}</span></div>
                <div className='info'><span>First Name:</span> <span>{item.firstName}</span></div>
                <div className='info'><span>Last Name:</span> <span>{item.lastName}</span></div>
                <div className='info'><span>Email:</span> <span>{item.email}</span></div>
                </div>
        )})
        }</div>):(<div>please sign in to see your items</div>)}
        <div className='edit-profile-container'>
        <button onClick={openCloseEditModal}>Edit Profile</button>
        </div>
        <EditModal isEditModalOpen={isEditModalOpen} openCloseEditModal={openCloseEditModal} userData={userData}/>
        <MyItems/>
    </div>
  )
}
