import { useEffect, useState } from "react";
import lupa from "../../public/assets/images/lupa.svg";
import back from "../../public/assets/images/back.svg";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);
  const url = useLocation().pathname;

  useEffect(() => {
    return () => {
      setSearchIsOpen(false);
    };
  }, [url]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex  items-center gap-2  bg-[#c6eef7] mx-2 w-full 
          ${searchIsOpen ? "justify-end" : "flex-row-reverse"} `}
    >
      {searchIsOpen && (
        <div className="relative flex w-full">
          <img
            src={back}
            onClick={() => setSearchIsOpen(false)}
            className="w-[26px] h-[26px] absolute top-[4px] left-[5px]"
          ></img>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white rounded-full h-8 outline-none pl-8"
          />
        </div>
      )}
      <button
        className="flex justify-center items-center h-[32px] w-[32px] bg-white rounded-full text-black"
        onClick={() => setSearchIsOpen(true)}
      >
        <img src={lupa} className="w-[15px] h-[15px]" alt="Buscar" />
      </button>
    </form>
  );
}
