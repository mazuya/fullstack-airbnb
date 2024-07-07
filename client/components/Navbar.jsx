import React, { useContext } from "react";
import { SiAirbnb } from "react-icons/si";
import { IoSearch } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { UserContext } from "../src/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <div className="p-4 flex justify-between pb-6 border-b-2">
        {/* Logo */}
        <Link
          to={"/"}
          className="flex items-center justify-center gap-5 text-3xl font-bold text-red-600"
        >
          <SiAirbnb />
          <span className="text-bold">Airbnb</span>
        </Link>
        {/* search tab */}
        <section className=" bg-white drop-shadow-lg flex items-center  gap-3 text-base font-semibold p-2  rounded-full">
          <div className="border-r-2 border-solid border-gray-700 px-3">
            Anywhere
          </div>

          <div className="border-r-2 border-solid border-gray-700 px-3">
            Anywhere
          </div>
          <div className="">Add guest</div>
          <div className="p-3 rounded-full bg-red-600 text-white">
            <IoSearch />
          </div>
        </section>

        {/* Account */}
        <section className="bg-white drop-shadow-lg flex items-center  gap-3 text-2xl font-semibold py-2 px-4 border-solid border-[1px] border-slate-400 rounded-full">
          <div>
            <RxHamburgerMenu />
          </div>
          <Link
            to={user ? "/account" : "/login"}
            className="flex gap-3 items-center"
          >
            <BsPersonCircle />
            {!!user && <div className="text-base">{user.name}</div>}
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
