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
          <button className='main-button' onClick={() => deleteItem()}>Delete</button>
        </div>
      </div>
    </div>
  )
}
