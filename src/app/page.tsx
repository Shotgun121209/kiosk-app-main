"use client"

import CategorySelctor from "@/components/categorySelector";
import ItemCard from "@/components/ItemCards";
import ItemPopup from "@/components/ItemPopup";
import NavBar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import { items } from "@/db/samples";
import { Item } from "@/db/types";
import Image from "next/image";
import { useState } from "react";

const categories = ["Category A", "Category B"]

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [displayedItems, setDisplayedItems] = useState<Item[]>(items)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow max-w-6xl mx-auto p-4">
        <SearchBar />
        <CategorySelctor categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        {/* {Grid} */}
        <div className="gird grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedItems.map((item, i) => (
            <ItemCard key={i} item={item} onAddToCart = {() => setSelectedItem (item)}/>
          ))}
        </div>
      </main>
      {/* {Pop-up Model Card} */}
      {selectedItem && <ItemPopup item={selectedItem} onClose={() => setSelectedItem(null)} />}
      {/* {Cart Button} */}
    </div>
  )
}
