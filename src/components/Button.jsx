import React from "react";

const Button = ({ name }) => {
  return (
    <div>
      <button 
      className="px-5 py-2 m-2 rounded-xl bg-gray-600 text-white cursor-pointer hover:bg-gray-500">
        {name}
      </button>
    </div>
  );
};

export default Button;
