import { useState } from 'react'
import axios from 'axios'
import {ItemsDataProps, SelectedItemProps} from '../types/types'

type UpdateItemProps = {
    isUpdateItemModalOpen: string
    openCloseUpdateItemModal: () => void
    data: ItemsDataProps[]
    selectedItem: SelectedItemProps
}

export default function UpdateItem({isUpdateItemModalOpen, openCloseUpdateItemModal, data, selectedItem}: UpdateItemProps) {

  const itemOldData = data.find(item => item.itemId === selectedItem.itemID)

    const [updateItemForm, setUpdateItemForm] = useState({
        itemName: itemOldData?.itemName,
        price: itemOldData?.price,
        imgUrl: itemOldData?.imgUrl
    })


    const user = JSON.parse(localStorage.getItem('user') || '{}')

    function updateItemFormHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const element = e.target.name;
        const value = e.target.value;
        setUpdateItemForm((prevState) => {
          return {...prevState, [element]: value}
        })
      }

      async function submit(e: React.FormEvent) {
        e.preventDefault()
        try {
          if(user){
    
            const newItemInfo = {
              itemId: selectedItem.itemID,
              itemName: updateItemForm.itemName,
              price: updateItemForm.price,
              imgUrl: updateItemForm.imgUrl
            }
            
            await axios.post('http://localhost:8000/items/updateitem', newItemInfo)
            window.location.href = '/myprofile'
          }
        } catch (error) {
          console.log(error);          
        }
      }
  return (
    <div>
       <div className={`update-item-hidden-div ${isUpdateItemModalOpen}`} onClick={openCloseUpdateItemModal}>
      </div>
        <div className={`update-item-modal ${isUpdateItemModalOpen}`}>
            <div className='update-item-modal-header'>
                <h2>Update Item</h2>
                <button className='close-button' onClick={openCloseUpdateItemModal}>X</button>
            </div>
            <div onChange={updateItemFormHandler} className='update-item-form-container'>
            <form onSubmit={submit} >
                <div>
                    New item Name
                    <input type='text' name='itemName' />
                </div>
                <div>
                    New Price
                    <input type='number' name='price' />
                </div>
                <div>
                    New Image
                    <input type='text' name='imgUrl' />
                </div>
                <button type='submit' onClick={openCloseUpdateItemModal}>Save</button>
            </form>
            </div>
        </div>
    </div>
  )
}
