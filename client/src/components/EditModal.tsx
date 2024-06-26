import React, { useState } from 'react'
import { UserDataProps } from '../types/userTypes'
import { useUser } from '../context/userContext'

type EditModalProps = {
  isEditModalOpen: string
  openCloseEditModal: () => void
}

export default function EditModal({ isEditModalOpen, openCloseEditModal }: EditModalProps) {
  const { isLoggedIn, editUserInfo, userData } = useUser()

  const [updateForm, setUpdateForm] = useState<UserDataProps>({
    id: 0,
    username: '',
    firstName: '',
    lastName: ''
  })


  function editProfileFormHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setUpdateForm((prevState) => {
      prevState = userData
      return { ...prevState, [name]: value }
    })
  }



  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (isLoggedIn) {
      const newInfo = {
        id: isLoggedIn.id,
        username: updateForm.username,
        firstName: updateForm.firstName,
        lastName: updateForm.lastName,
      }
      await editUserInfo(newInfo)
    }
  }


  return (
    <div >
      <div className={`hidden-div ${isEditModalOpen}`} onClick={openCloseEditModal}>
      </div>
      <div className={`modal ${isEditModalOpen}`}>
        <div className='modal-header'>
          <h2>Edit Profile</h2>
          <button className='close-button' onClick={openCloseEditModal}>X</button>
        </div>
        <div onChange={editProfileFormHandler} className='form-container'>
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
