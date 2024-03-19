import Create from "../app/_components/create_product";
import React from "react";

const Navbar = () => {
  return (
    <nav className="container py-2">
      <div className="flex sm:justify-between justify-center items-center sm:flex-nowrap flex-wrap gap-1">
        <p className=" text-center font-bold sm:text-2xl text-[16px] ">
          Next.js 14 Server Actions MongoDB - CRUD
        </p>
        <Create />
      </div>
    </nav>
  );
};

export default Navbar;
