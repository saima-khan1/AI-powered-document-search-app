import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";

import { FaRegFileAlt } from "react-icons/fa";
const Navbar: React.FC = () => {
  // const user = useUser();
  return (
    <div className="backdrop-blur-md bg-white/60 border-b border-gray-300 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <FaRegFileAlt className="text-3xl text-purple-500" />
        <h2 className="text-3xl font-semibold tracking-wide">DocuMind</h2>
      </div>

      <div className="scale-125">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
