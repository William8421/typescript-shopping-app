import {ShoppingItem} from "../components/ShoppingItem"
import { useShoppingCart } from "../context/shoppingCartContext"
import { useEffect } from "react"
import { ItemsDataProps } from "../types/userTypes"
import { useUser } from "../context/userContext"

export default function Store() {
  const {allData, fetchData} = useUser()

  useEffect(() => {
    fetchData()
  }, [])
  
  
  
  return (
    <>
    <div className="store">
      {allData?.map((item: ItemsDataProps) => (
        <div className="item" key={item.itemId}><ShoppingItem {...item}/></div>

      ))}
    </div>
    </>
  )
}
