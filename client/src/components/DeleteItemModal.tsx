import { SelectedItemProps } from '../types/userTypes'
import { useUser } from '../context/userContext'


type DeleteItemProps = {
  isDeleteItemModalOpen: string
  openCloseDeleteItemModal: () => void
  selectedItem: SelectedItemProps
  triggerRefresh: () => void;
}

export default function DeleteItemModal({ isDeleteItemModalOpen, openCloseDeleteItemModal, selectedItem, triggerRefresh }: DeleteItemProps) {
  const { removeItem } = useUser()
  async function deleteItem() {
    const item = {
      itemId: selectedItem.itemID,
      itemName: selectedItem.itemName
    }
    await removeItem(item)
    openCloseDeleteItemModal()
    triggerRefresh()
  }

  return (
    <div>
      <div className={`hidden-div ${isDeleteItemModalOpen}`} onClick={openCloseDeleteItemModal}></div>
      <div className={`modal ${isDeleteItemModalOpen}`}>
        <div className='modal-header'>
          <h2>Warning</h2>
          <button className='close-button' onClick={openCloseDeleteItemModal}>X</button>
        </div>
        <div className='form-container'>
          <div className='delete-modal-body'>
            Are you sure you want to delete {selectedItem.itemName}?
          <button className='main-button' onClick={() => deleteItem()}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}
