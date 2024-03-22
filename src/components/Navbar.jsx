"use client";
import Create from "./create_product";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="navbar bg-base-300">
      <div className="container">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">CRUD</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              {session?.user ? (
                <details className=" text-center">
                  <summary>
                    {session?.user.firstName} {session?.user.lastName}
                  </summary>

                  <ul className="p-2 bg-black/60 rounded-t-none  ">
                    <li>
                      {" "}
                      <Create />
                    </li>
                    <li>
                      <button
                        onClick={() => signOut()}
                        className="btn btn-error mt-2"
                      >
                        SignOut
                      </button>
                     
                    </li>
                  </ul>
                </details>
              ) : (
                <Link href={"/login"}></Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
