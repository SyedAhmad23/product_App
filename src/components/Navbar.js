import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Product App</h1>
        <ul className="flex space-x-4">
          <li>
            <h2 className="hover:underline">Login</h2>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
