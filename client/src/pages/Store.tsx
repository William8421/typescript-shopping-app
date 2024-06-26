import { ShoppingItem } from "../components/ShoppingItem";
import { useEffect } from "react";
import { ItemsDataProps } from "../types/userTypes";
import { useUser } from "../context/userContext";
import loading from "../imgs/blue_spinner.gif";

export default function Store() {
  const { allData, fetchData } = useUser();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {allData.length > 0 ? (
        <div className="store">
          {allData?.map((item: ItemsDataProps) => (
            <div className="item" key={item.itemId}>
              <ShoppingItem {...item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="loading-container">
          <img src={loading} alt="loading" />
        </div>
      )}
    </>
  );
}
