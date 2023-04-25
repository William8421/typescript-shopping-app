import {ShoppingItem} from "../components/ShoppingItem"
import { useShoppingCart } from "../context/shoppingCartContext"
import { useEffect } from "react"
import { ItemsDataProps } from "../types/types"

export default function Store() {
  const {allData, fetchData} = useShoppingCart()

  useEffect(() => {
    fetchData()
  }, [])
  
  
  
  return (
    <>
    <div className="itemContainer">
      {allData?.map((item: ItemsDataProps) => (
        <div className="item" key={item.itemId}><ShoppingItem {...item}/></div>

      ))}
    </div>
    </>
  )
}
