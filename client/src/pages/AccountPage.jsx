import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  //console.log(subpage);

  function linkClass(tab = null) {
    let classes = "py-2 px-4 ";
    if (tab === subpage) {
      classes += "bg-red-600 text-white  rounded-full";
    }
    return classes;
  }

  return (
    <div>
      <nav className="flex gap-3 w-full justify-center mt-8 border-solid border-b-[1px] pb-6 border-slate-600">
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
      {subpage === "profile" && (
        <div className="mt-5 flex flex-col gap-4 justify-center items-center  w-full">
          <p>
            Logged in as {user.name} ({user.email})
          </p>
          <button onClick={logout} className="primary max-w-72 rounded-full">
            Log out
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div className="w-full flex flex-col gap-5">
          <PlacesPage />
          Heheeee
        </div>
      )}
    </div>
  );
};

export default AccountPage;
