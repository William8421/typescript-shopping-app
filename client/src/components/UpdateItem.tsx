import { useState } from 'react'
import {ItemsDataProps, SelectedItemProps} from '../types/userTypes'
import { useUser } from '../context/userContext'

type UpdateItemProps = {
    isUpdateItemModalOpen: string
    openCloseUpdateItemModal: () => void
    data: ItemsDataProps[]
    selectedItem: SelectedItemProps
}

export default function UpdateItem({isUpdateItemModalOpen, openCloseUpdateItemModal, data, selectedItem}: UpdateItemProps) {
  const {isLoggedIn, updateItem} = useUser()

  const itemOldData = data.find(item => item.itemId === selectedItem.itemID)

    const [updateItemForm, setUpdateItemForm] = useState({
        itemName: itemOldData?.itemName,
        price: itemOldData?.price,
        imgUrl: itemOldData?.imgUrl
    })

    function updateItemFormHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const element = e.target.name;
        const value = e.target.value;
        setUpdateItemForm((prevState) => {
          return {...prevState, [element]: value}
        })
      }

      function submit(e: React.FormEvent) {
        e.preventDefault()
          if(isLoggedIn){
    
            const newItemInfo = {
              itemId: selectedItem.itemID,
              itemName: updateItemForm.itemName,
              price: updateItemForm.price,
              imgUrl: updateItemForm.imgUrl
            }
            updateItem(newItemInfo)
            
            setTimeout(() => {
              window.location.href = '/myprofile'
            }, 1000)
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
                <button className='main-button' type='submit' onClick={openCloseUpdateItemModal}>Save</button>
            </form>
            </div>
        </div>
    </div>
  )
}
