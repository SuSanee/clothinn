import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState"; 
//please get this json from our github repo
import items from "../../mockData/items.json";  
import ItemList from "../itemList/ItemList";

function HomePage() {
  const { selectedCategory } = useContext(GlobalContext);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <section>
      <ItemList items={filteredItems} />
    </section>
  );
}

export default HomePage;
