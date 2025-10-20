import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  // const user = useUser();
  return (
    <div className="flex flex-row justify-between  border-2  px-8 py-8 ">
      <h1 className="text-3xl font-bold">DocuMind</h1>
      <div className="text-4xl">
        {" "}
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
