import {useEffect, useState } from 'react'
import {ItemsDataProps, SelectedItemProps} from '../types/userTypes'
import AddItemModal from './AddItemModal';
import UpdateItem from './UpdateItem';
import DeleteItemModal from './DeleteItemModal';
import formatCurrency from '../utilities/formatCurrency';
import { useUser } from '../context/userContext';




export default function MyItems() {
    const {isLoggedIn, getUserItems, itemsData} = useUser()
      
    const [isAddItemsOpen, setIsAddModalOpen] = useState('addModalOff')
    const [isUpdateItemModalOpen, setIsUpdateItemModalOpen] = useState('updateItemModalOff')
    const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState('deleteItemModalOff')
    const [selectedItem, setSelectedItem] = useState<SelectedItemProps>({
      itemID : 0,
      itemName: ''
    })
    

    function openCloseAddItemsModal(): void{
        setIsAddModalOpen(isAddItemsOpen === 'addModalOff'? 'addModalOn' : 'addModalOff')                  
      }
    function openCloseUpdateItemModal(): void{
      setIsUpdateItemModalOpen(isUpdateItemModalOpen === 'updateItemModalOff'? 'updateItemModalOn' : 'updateItemModalOff')                  
      }
    function openCloseDeleteItemModal(): void{
      setIsDeleteItemModalOpen(isDeleteItemModalOpen === 'deleteItemModalOff'? 'deleteItemModalOn' : 'deleteItemModalOff')                  
      }

    
    
    useEffect(() => {
      if(isLoggedIn){
        getUserItems()
      }
    }, [])
    
    

  return (
    <div className='my-items-container'>
      <h2>My Items</h2>

  {isLoggedIn? (<div>{
    itemsData.length > 0?
    (<div className='my-items-sub-container'>
      {itemsData.map(item => { 
      return (
        <div className='my-items-item-container' key={item.itemId}>
              <img src={item.imgUrl}/>
              <div className='my-items-name-price-container'>
              <h3>{item.itemName}</h3>
              <span className="item-price">{formatCurrency(item.price)}</span>
              </div>
                <div className='edit-item-button-container' onClick={openCloseUpdateItemModal}>
              <button className='main-button' onClick={(e) => setSelectedItem({itemID: item.itemId, itemName: item.itemName})}>
                  Edit Item
              </button>
                </div>
                <div className='delete-item-container' onClick={openCloseDeleteItemModal}>
              <button className='main-button' onClick={(e) => setSelectedItem({itemID: item.itemId, itemName: item.itemName})}>Delete Item</button>
              </div>
          </div>
      )
    })}</div>)
    :(
    <div className='no-items-yet'>
      you don't have items yet
      </div>)
  }
  </div>):(<div>please sign in to see your items</div>)}
          <button className='main-button' onClick={openCloseAddItemsModal}>Add Items</button>
          <AddItemModal isAddItemsOpen={isAddItemsOpen} openCloseAddItemsModal={openCloseAddItemsModal} />
          <UpdateItem isUpdateItemModalOpen={isUpdateItemModalOpen} openCloseUpdateItemModal={openCloseUpdateItemModal} selectedItem={selectedItem} data={itemsData}/>
          <DeleteItemModal isDeleteItemModalOpen={isDeleteItemModalOpen} openCloseDeleteItemModal={openCloseDeleteItemModal} selectedItem={selectedItem} />
    </div>
  )
}
