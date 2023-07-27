import { useState } from 'react'
import { ItemsDataProps, SelectedItemProps } from '../types/userTypes'
import { useUser } from '../context/userContext'
import axios from 'axios'

type UpdateItemProps = {
  isUpdateItemModalOpen: string
  openCloseUpdateItemModal: () => void
  data: ItemsDataProps[]
  selectedItem: SelectedItemProps
  triggerRefresh: () => void
}

export default function UpdateItem({ isUpdateItemModalOpen, openCloseUpdateItemModal, data, selectedItem, triggerRefresh }: UpdateItemProps) {
  const { isLoggedIn, updateItem } = useUser()

  const itemOldData = data.find(item => item.itemId === selectedItem.itemID)

  const [updateItemForm, setUpdateItemForm] = useState({
    itemName: itemOldData?.itemName,
    price: itemOldData?.price,
    imgUrl: itemOldData?.imgUrl
  })

  function updateItemFormHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setUpdateItemForm((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const [imgSelected, setImgSelected] = useState<File | string>('')
  const [uploaded, setUploaded] = useState('')

  function imageHandler(e: any) {
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
      .then((response) => {
        setUploaded(response.data.secure_url)
        setUpdateItemForm({ ...updateItemForm, imgUrl: response.data.secure_url })
      }
      )
      .catch((err) => {
        return console.log(err);
      });
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (isLoggedIn) {

      const newItemInfo = {
        itemId: selectedItem.itemID,
        itemName: updateItemForm.itemName,
        price: updateItemForm.price,
        imgUrl: updateItemForm.imgUrl
      }
      await updateItem(newItemInfo)
      openCloseUpdateItemModal()
      triggerRefresh()
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
              Image
              <input type='file' name='imgUrl' onChange={(e) => imageHandler(e)} />
              {updateItemForm.imgUrl !== '' ? (
                <button className='main-button' onClick={(e) => uploadImage(e)}>Upload</button>
              ) : (<div>please upload image</div>)}
            </div>
            <button className='main-button' type='submit'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}
