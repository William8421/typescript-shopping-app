import React, { useState } from 'react';
import { useUser } from '../context/userContext';
import axios from 'axios';

type AddItemModalProps = {
  isAddItemsOpen: string
  openCloseAddItemsModal: () => void
  triggerRefresh: () => void
}

export default function AddItemModal({ isAddItemsOpen, openCloseAddItemsModal, triggerRefresh }: AddItemModalProps) {
  const { isLoggedIn, AddItem } = useUser()
  const [addItemForm, setAddItemForm] = useState({
    itemName: '',
    price: 0,
    imgUrl: ''
  })


  function addItemHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setAddItemForm((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const [imgSelected, setImgSelected] = useState<File | string>('')
  const [uploaded, setUploaded] = useState('')

  function imageHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const selectedFile = e.target.files?.[0];
    setImgSelected(selectedFile || '');
  }

  const uploadImage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault();
    if (!(imgSelected instanceof File)) return;

    const formData = new FormData();
    formData.append('file', imgSelected);
    formData.append('upload_preset', 'WilliamMallak');
    formData.append('upload_name', 'denpxdokx');
    formData.append('folder', 'shopping-cart');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/denpxdokx/image/upload', formData);
      setUploaded(response.data.secure_url);
      setAddItemForm((prevState) => ({ ...prevState, imgUrl: response.data.secure_url }));
    } catch (error) {
      console.error(error);
    }
  };


  async function submit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (isLoggedIn) {

        const newItem = {
          userId: isLoggedIn.id,
          itemName: addItemForm.itemName,
          price: addItemForm.price,
          imgUrl: addItemForm.imgUrl
        }
        await AddItem(newItem)
        openCloseAddItemsModal()
        triggerRefresh()
      }
    } catch (error) {
      console.error(error);

    }
  }

  const isFormValid = uploaded && addItemForm.itemName && addItemForm.price

  return (
    <div>
      <div className={`hidden-div ${isAddItemsOpen}`} onClick={openCloseAddItemsModal}>
      </div>
      <div className={`modal ${isAddItemsOpen}`}>
        <div className='modal-header'>
          <h2>Add Item</h2>
          <button className='close-button' onClick={openCloseAddItemsModal}>X</button>
        </div>
        <div onChange={addItemHandler} className='form-container'>
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
              Image
              <input type='file' name='imgUrl' onChange={(e) => imageHandler(e)} />
              {addItemForm.imgUrl !== '' ? (
                <button className='main-button' onClick={(e) => uploadImage(e)}>Upload</button>
              ) : (<div>please upload image</div>)}
            </div>
            {isFormValid ?
              (<button className='main-button' type='submit'>Add Item</button>)
              :
              (<button disabled >Add Item</button>)
            }
          </form>
        </div>

      </div>
    </div>
  )
}
