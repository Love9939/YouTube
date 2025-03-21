import React, { useState } from "react";
import { Menu, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch()
  const handleToggleButton = () => {
    dispatch(toggleMenu())

  }

  return (
    <header className="flex items-center justify-between px-4 py-2 shadow-xs">
      <div className="flex items-center">
        <button className="mr-4">
          <Menu size={24} 
          onClick={handleToggleButton} 
          className="cursor-pointer" />
        </button>
        <div className="flex items-center">
        <svg
            className="w-8 h-8 text-red-600 mr-1 cursor-pointer"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
          <div className="font-bold text-lg cursor-pointer">YouTube</div>
        </div>
      </div>

      <div className="flex items-center flex-grow mx-8 max-w-2xl">
        <div className="relative flex items-center w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-4 rounded-l-full border border-zinc-700 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="py-2.5 px-4 rounded-r-full border border-l-0 border-zinc-700">
            <Search size={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <button className="ml-2">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden">
            <span className="text-white font-medium">J</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
