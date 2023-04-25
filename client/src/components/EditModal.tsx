import React, { useState } from 'react'
import axios from 'axios'
import { UserDataProps } from '../types/types'

type EditModalProps = {
    isEditModalOpen: string
    openCloseEditModal: () => void
    userData: UserDataProps[]
}

export default function EditModal({isEditModalOpen, openCloseEditModal, userData}: EditModalProps) {
  
  const user = JSON.parse(localStorage.getItem('user')!)

  const test = userData.find(item => item.id === user.id)

  const [updateForm, setUpdateForm] = useState({
    username: test?.username,
    firstName: test?.firstName,
    lastName: test?.lastName
  })
  
  
  
  


  function editProfileFormHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const element = e.target.name;
    const value = e.target.value;
    setUpdateForm((prevState) => {
      return {...prevState, [element]: value}
    })
  }


  async function submit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if(user){

        const newInfo = {
          id: user.id,
          username: updateForm.username,
          firstName: updateForm.firstName,
          lastName: updateForm.lastName
        }
        
        await axios.post('http://localhost:8000/user/updateprofile', newInfo)
        user.username = updateForm.username
        localStorage.setItem("user", JSON.stringify(user))
        window.location.href = '/myprofile'
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  
  return (
    <div >
      <div className={`edit-hidden-div ${isEditModalOpen}`} onClick={openCloseEditModal}>
      </div>
        <div className={`edit-modal ${isEditModalOpen}`}>
            <div className='edit-modal-header'>
                <h2>Edit Profile</h2>
                <button className='close-button' onClick={openCloseEditModal}>X</button>
            </div>
            <div onChange={editProfileFormHandler} className='edit-profile-form-container'>
            <form onSubmit={submit} >
                <div>
                    New Username
                    <input type='text' name='username' />
                </div>
                <div>
                    New First Name
                    <input type='text' name='firstName' />
                </div>
                <div>
                    New Last Name
                    <input type='text' name='lastName' />
                </div>
                <button type='submit' onClick={openCloseEditModal}>Save</button>
            </form>
            </div>
        </div>
    </div>
  )
}
