import axios from 'axios'
import { SelectedItemProps } from '../types/types'
type DeleteItemProps ={
    isDeleteItemModalOpen: string
    openCloseDeleteItemModal: () => void
    selectedItem: SelectedItemProps
}

export default function DeleteItemModal({isDeleteItemModalOpen, openCloseDeleteItemModal, selectedItem}: DeleteItemProps) {
    async function deleteItem(){
        try {
          const item = {
            itemId: selectedItem.itemID,
            itemName: selectedItem.itemName
          }
          await axios.post('http://localhost:8000/items/removeitem', {itemId: item.itemId, itemName: item.itemName})
          .then(response => console.log(response)
          )
          window.location.href = '/myprofile'
          console.log(item);
          
        } catch (error) {
          console.log(error);
          
        }
      }
  return (
    <div>
        <div className={`delete-item-hidden-div ${isDeleteItemModalOpen}`}></div>
      <div className={`delete-item-modal ${isDeleteItemModalOpen}`}>
        <div className='delete-item-modal-header'>
                <h2>Warning</h2>
                <button className='close-button' onClick={openCloseDeleteItemModal}>X</button>
        </div>
        <div className='delete-item-body'>
            <div>
            Are you sure you want to delete {selectedItem.itemName}?
            </div>
            <button onClick={() => deleteItem()}>Delete</button>
        </div>
      </div>
    </div>
  )
}
