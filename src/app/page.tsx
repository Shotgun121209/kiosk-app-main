"use client"

import CategorySelctor from "@/components/categorySelector";
import ItemCard from "@/components/ItemCards";
import ItemPopup from "@/components/ItemPopup";
import NavBar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import { items } from "@/db/samples";
import { Item } from "@/db/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "./lib/cartContext";
import { count } from "console";

const categories = ["Category A", "Category B"]

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [displayedItems, setDisplayedItems] = useState<Item[]>(items)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { addToCart, clearCart } = useCart()

  const filterItems = items.filter((item) => {
    const matchCategory = selectedCategory == "All" || item.category == selectedCategory;
    
    const matchTitle = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchDescription = item.description.toLowerCase().includes(searchQuery.toLowerCase())

    return (matchCategory && matchTitle) || (matchCategory && matchDescription);
    
  })

  useEffect(() => {
    setDisplayedItems(filterItems);
  }, [selectedCategory, searchQuery])

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow max-w-6xl mx-auto p-4">
        <SearchBar onSearch={setSearchQuery}/>
        <CategorySelctor categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        {/* {Grid} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-32">
          {displayedItems.map((item, i) => (
            <ItemCard key={i} item={item} onAddToCart = {() => setSelectedItem (item)}/>
          ))}
        </div>
      </main>
      {/* {Pop-up Model Card} */}
      {selectedItem && <ItemPopup item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={(items: Item, count: number) => addToCart(items, count)}/>}
      {/* {Cart Button} */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <button className="w-full bg-blue-600 text-white rounded py-2">Go To Cart</button>
        <button className="w-full bg-red-600 text-white rounded py-2 mt-2" onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  )
}
