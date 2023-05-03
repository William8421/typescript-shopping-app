import { SelectedItemProps } from '../types/userTypes'
import { useUser } from '../context/userContext'


type DeleteItemProps ={
    isDeleteItemModalOpen: string
    openCloseDeleteItemModal: () => void
    selectedItem: SelectedItemProps
}

export default function DeleteItemModal({isDeleteItemModalOpen, openCloseDeleteItemModal, selectedItem}: DeleteItemProps) {
  const {removeItem} = useUser()
    function deleteItem(){
      const item = {
              itemId: selectedItem.itemID,
              itemName: selectedItem.itemName
            }
            removeItem(item)
            window.location.href = '/myprofile'
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
