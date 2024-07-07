import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../../components/AccountNav";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

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

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3 pt-6">
      <AccountNav subpage={"profile"} />
      <div className="mt-5 flex flex-col gap-4 justify-center items-center  w-full">
        <p>
          Logged in as {user.name} ({user.email})
        </p>
        <button
          onClick={logout}
          className="primary max-w-72 rounded-full py-2 px-3"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
