import axios from 'axios';
import React, { useState } from 'react';

type AddItemModalProps = {
    isAddItemsOpen: string
    openCloseAddItemsModal: () => void
}

export default function AddItemModal({isAddItemsOpen, openCloseAddItemsModal}: AddItemModalProps) {
    const [addItemForm, setAddItemForm] = useState({
        itemName: '',
        price: 0,
        imgUrl: ''
    })

    const user = JSON.parse(localStorage.getItem('user')!)
    

    function addItemHandler(e: React.ChangeEvent<HTMLInputElement>): void {
        const element = e.target.name;
        const value = e.target.value;
        setAddItemForm((prevState) => {
          return {...prevState, [element]: value}
        })
      }

      async function submit(e: React.FormEvent) {
        e.preventDefault()
        try {
          if(user){
    
            const newItem = {
              userId: user.id,
              itemName: addItemForm.itemName,
              price: addItemForm.price,
              imgUrl: addItemForm.imgUrl
            }
            await axios.post('http://localhost:8000/items/additems', newItem)
          }
          window.location.href = '/myprofile'
        } catch (error) {
          console.log(error);
          
        }
      }
    
  return (
    <div>
      <div className={`add-hidden-div ${isAddItemsOpen}`} onClick={openCloseAddItemsModal}>
      </div>
      <div className={`add-modal ${isAddItemsOpen}`}>
            <div className='add-modal-header'>
                <h2>Add Item</h2>
                <button className='close-button' onClick={openCloseAddItemsModal}>X</button>
            </div>
      <div onChange={addItemHandler} className='add-profile-form-container'>
            <form onSubmit={submit}>
                <div>
                    Item Name
                    <input type='text' name='itemName' />
                </div>
                <div>
                    Price
                    <input type='number' name='price' />
                </div>
                <div>
                    image
                    <input type='text' name='imgUrl' />
                </div>
                <button type='submit' onClick={openCloseAddItemsModal}>Add Item</button>
            </form>
            </div>

      </div>
    </div>
  )
}
