import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
  };


  return (
    <form
      onSubmit={handleSearch}
      className="  bg-[#e0f5e9] flex items-center p-2   w-full "
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 bg-white rounded-full p-3 ml-2 outline-none"
      />
      <button className="mx-2 bg-white rounded-full p-3 text-black">
        send
      </button>
    </form>
  );
}
