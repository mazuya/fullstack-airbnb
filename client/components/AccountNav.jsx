import React from "react";
import { Link, useParams } from "react-router-dom";

const AccountNav = ({ subpage }) => {
  //console.log(`AccountNav - subpage: ${subpage}`);
  function linkClass(tab = null) {
    let classes = "py-2 px-4 ";
    if (tab === subpage) {
      classes += "bg-red-600 text-white  rounded-full";
    }
    return classes;
  }
  return (
    <nav className="flex gap-3 w-full justify-center mt-8 ">
      <Link className={linkClass("profile")} to={"/account"}>
        My profile
      </Link>
      <Link className={linkClass("bookings")} to={"/account/bookings"}>
        My bookings
      </Link>
      <Link className={linkClass("places")} to={"/account/places"}>
        My accomodation
      </Link>
    </nav>
  );
};

export default AccountNav;
