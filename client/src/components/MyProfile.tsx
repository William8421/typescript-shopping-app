import { useEffect, useState } from 'react';
import MyItems from './MyItems';
import EditModal from './EditModal';
import { useUser } from '../context/userContext';

export default function MyProfile() {
  const { isLoggedIn, getUserInfo, userData } = useUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState('editModalOff');

  function openCloseEditModal(): void {
    setIsEditModalOpen(isEditModalOpen === 'editModalOff' ? 'editModalOn' : 'editModalOff');
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo();
    }
  }, []);

  return (
    <div className='myProfile-container'>
      <h2>My Information</h2>
      {isLoggedIn ? (
        <div>
          <div className='my-info-container' key={userData.id}>
            <div className='info'>
              <span>Username:</span> <span>{userData.username}</span>
            </div>
            <div className='info'>
              <span>First Name:</span> <span>{userData.firstName}</span>
            </div>
            <div className='info'>
              <span>Last Name:</span> <span>{userData.lastName}</span>
            </div>
            <div className='info'>
              <span>Email:</span> <span>{userData.email}</span>
            </div>
          </div>
        </div>
      ) : (
        <div>please sign in to see your information</div>
      )}
      <div className='edit-profile-container'>
        <button className='main-button' onClick={openCloseEditModal}>
          Edit Information
        </button>
      </div>
      <EditModal isEditModalOpen={isEditModalOpen} openCloseEditModal={openCloseEditModal} />
      <MyItems />
    </div>
  );
}
