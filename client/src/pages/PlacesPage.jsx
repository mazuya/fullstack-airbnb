import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import PlacesFormPage from "./PlacesFormPage";
import { useEffect } from "react";
import axios from "axios";
import AccountNav from "../../components/AccountNav";
import { GoPencil } from "react-icons/go";

const PlacesPage = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3 pt-6">
      <AccountNav subpage={"places"} />
      {action !== "new" && (
        <div className="mt-5">
          <Link
            to={"/account/places/new"}
            className="bg-red-600 max-w-72 rounded-full text-white py-2 px-3"
          >
            + Add new places
          </Link>
        </div>
      )}
      <div className="w-[1000px] bg-red-400">
        {action === "new" && <PlacesFormPage />}
      </div>

      <div className="w-[80%] md:w-[70%]">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="w-full mt-2 bg-slate-100 rounded-2xl flex gap-5 p-3 hover:bg-slate-200 duration-200 relative"
            >
              <div className="absolute top-5 right-5 bg-slate-200 rounded-lg p-2 text-xl">
                <GoPencil />
              </div>
              <div className="w-72 h-56 rounded-lg relative">
                {place.photos.length > 0 && (
                  <img
                    className="w-full h-full overflow-hidden rounded-lg object-cover"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <section className="max-w-[29rem] flex flex-col gap-2 text-start mt-5 ">
                <h2 className="font-bold text-xl">{place.title}</h2>
                <p className="text-[0.9rem]">{place.description}</p>
              </section>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
