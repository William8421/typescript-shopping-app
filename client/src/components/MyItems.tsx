import axios from 'axios';
import React, {useEffect, useState } from 'react'
import {ItemsDataProps, SelectedItemProps} from '../types/types'
import AddItemModal from './AddItemModal';
import UpdateItem from './UpdateItem';
import DeleteItemModal from './DeleteItemModal';
import formatCurrency from '../utilities/formatCurrency';




export default function MyItems() {
    
    const [data, setData] = useState<ItemsDataProps[]>([])    
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

    const isLoggedIn =JSON.parse(localStorage.getItem("user")!)



           
    async function getUserItems(){
        try {
          await axios.post('http://localhost:8000/items/useritems', isLoggedIn)
          .then(response => setData(response.data)
          )
        } catch (error) {
            console.log(error);
        }
    }

    
    
    useEffect(() => {
      if(isLoggedIn){
        getUserItems()
      }
    }, [])
    
    

  return (
    <div className='my-items-container'>
      <h2>My Items</h2>

  {isLoggedIn.id? (<div>{
    data.length > 0?
    (<div className='my-items-sub-container'>
      {data.map(item => { 
      return (
        <div className='my-items-item-container' key={item.itemId}>
              <img src={item.imgUrl}/>
              <div className='my-items-name-price-container'>
              <h3>{item.itemName}</h3>
              <span className="item-price">{formatCurrency(item.price)}</span>
              </div>
                <div className='edit-item-button-container' onClick={openCloseUpdateItemModal}>
              <button onClick={(e) => setSelectedItem({itemID: item.itemId, itemName: item.itemName})}>
                  Edit Item
              </button>
                </div>
                <div className='delete-item-container' onClick={openCloseDeleteItemModal}>
              <button onClick={(e) => setSelectedItem({itemID: item.itemId, itemName: item.itemName})}>Delete Item</button>
              </div>
          </div>
      )
    })}</div>)
    :(
    <div className='no-items-yet'>
      you don't have items yet
      </div>)
  }
  </div>):(<div>please sign in</div>)}
          <button onClick={openCloseAddItemsModal}>Add Items</button>
          <AddItemModal isAddItemsOpen={isAddItemsOpen} openCloseAddItemsModal={openCloseAddItemsModal} />
          <UpdateItem isUpdateItemModalOpen={isUpdateItemModalOpen} openCloseUpdateItemModal={openCloseUpdateItemModal} selectedItem={selectedItem} data={data}/>
          <DeleteItemModal isDeleteItemModalOpen={isDeleteItemModalOpen} openCloseDeleteItemModal={openCloseDeleteItemModal} selectedItem={selectedItem} />
    </div>
  )
}
