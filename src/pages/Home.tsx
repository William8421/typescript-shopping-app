import {ShoppingItem} from "../components/ShoppingItem"
import ShoppingItems from "../data/items.json"

export default function Home() {
  return (
    <>
    <div className="itemContainer">
      {ShoppingItems.map(item => (
        <div className="item" key={item.id}><ShoppingItem {...item}/></div>

      ))}
    </div>
    </>
  )
}
