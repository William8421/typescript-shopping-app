import React, { useState } from 'react'
import { UserDataProps } from '../types/userTypes'
import { useShoppingCart } from '../context/shoppingCartContext'
import { useUser } from '../context/userContext'

type EditModalProps = {
    isEditModalOpen: string
    openCloseEditModal: () => void
    userData: UserDataProps[]
}

export default function EditModal({isEditModalOpen, openCloseEditModal, userData}: EditModalProps) {
  const {isLoggedIn, editUserInfo} = useUser()
  

  const [updateForm, setUpdateForm] = useState({
    username: userData[0]?.username,
    firstName: userData[0]?.firstName,
    lastName: userData[0]?.lastName
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
      if(isLoggedIn){
        const newInfo = {
          id: isLoggedIn.id,
          username: updateForm.username,
          firstName: updateForm.firstName,
          lastName: updateForm.lastName,
        }
        editUserInfo(newInfo)
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
                <button className='main-button' type='submit' onClick={openCloseEditModal}>Save</button>
            </form>
            </div>
        </div>
    </div>
  )
}
