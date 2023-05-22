import React, { useState } from 'react';
import { useUser } from '../context/userContext';
import axios from 'axios';

type AddItemModalProps = {
    isAddItemsOpen: string
    openCloseAddItemsModal: () => void
}

export default function AddItemModal({isAddItemsOpen, openCloseAddItemsModal}: AddItemModalProps) {
  const {isLoggedIn, AddItem} = useUser()
    const [addItemForm, setAddItemForm] = useState({
        itemName: '',
        price: 0,
        imgUrl: ''
    })
    

    function addItemHandler(e: React.ChangeEvent<HTMLInputElement>): void {
        const element = e.target.name;
        const value = e.target.value;
        setAddItemForm((prevState) => {
          return {...prevState, [element]: value}
        })
      }

      const [imgSelected, setImgSelected] = useState<File | string>('')
      const [uploaded, setUploaded] = useState('')

      function imageHandler(e: any){
        setImgSelected(e.target.files[0])
      }

      const uploadImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", imgSelected);
        formData.append("upload_preset", "WilliamMallak");
        formData.append("upload_name", "denpxdokx");
        formData.append('folder', 'shopping-cart');
    
        axios
          .post(
            "https://api.cloudinary.com/v1_1/denpxdokx/image/upload",
            formData
          )
          .then((response) =>
          {
            setUploaded(response.data.secure_url)            
            setAddItemForm({ ...addItemForm, imgUrl: response.data.secure_url})}
          )
          .catch((err) => {
            return console.log(err);
          });
      };
      

      function submit(e: React.FormEvent) {
        e.preventDefault()
        try {
          if(isLoggedIn){
    
            const newItem = {
              userId: isLoggedIn.id,
              itemName: addItemForm.itemName,
              price: addItemForm.price,
              imgUrl: addItemForm.imgUrl
            }
            AddItem(newItem)

            setTimeout(() => {
              window.location.href = '/myprofile'
            }, 1000)
          }
        } catch (error) {
          console.log(error);
          
        }
        // window.location.href = '/myprofile'
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
      <div onChange={addItemHandler} className='add-item-form-container'>
            <form onSubmit={submit}>
                <div>
                    Item Name
                    <input type='text' name='itemName' />
                </div>
                <div>
                    Price
                    <input type='number' name='price'/>
                </div>
                <div>
                    Image
                    <input type='file' name='imgUrl' onChange={(e) => imageHandler(e)} />
                    {addItemForm.imgUrl !== ''? (
                    <button className='main-button' onClick={(e) => uploadImage(e)}>Upload</button>
                    ): (<div>please upload image</div>)}
                </div>
                {uploaded && addItemForm.itemName && addItemForm.price ? 
                (<button className='main-button' type='submit' onClick={openCloseAddItemsModal}>Add Item</button>)
                :
                (<button style={{backgroundColor: "grey"}} disabled>Add Item</button>)
                }
            </form>
            </div>

      </div>
    </div>
  )
}
