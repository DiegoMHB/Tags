import { useState } from "react";
import { categories } from "../data/listUtilities";

type SearchBarProps = {
    setSelectedCategory: (cat:string)=>void
}


export default function SearchBar({ setSelectedCategory }:SearchBarProps) {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setCategory(e.target.value);
    setSelectedCategory(e.target.value); 
  };

  return (
    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-1000 bg-white p-2 rounded-full shadow-md h-[35px]">
      <select
        value={category}
        onChange={handleCategoryChange}
        className=""
      >
        <option value="" key={0}>All Categories</option>
        {categories.map(category => category.value).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
