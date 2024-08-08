"use client"

import CategorySelctor from "@/components/categorySelector";
import NavBar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import Image from "next/image";
import { useState } from "react";

const categories = ["Category A", "Category B"]

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow max-w-6xl mx-auto p-4">
        <SearchBar />
        <CategorySelctor categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        {/* {Grid} */}
      </main>
      {/* {Cart Button} */}
    </div>
  )
}
