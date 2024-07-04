import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import PlacesFormPage from "./PlacesFormPage";
import { useEffect } from "react";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  });

  return (
    <div className="w-full items-center flex flex-col gap-3 pt-6">
      {action !== "new" && (
        <div>
          <Link
            to={"/account/places/new"}
            className="bg-red-600 max-w-72 rounded-full text-white py-2 px-3"
          >
            + Add new places
          </Link>
        </div>
      )}
      {action === "new" && <PlacesFormPage />}
      <div className="w-[80%] md:w-[70%]">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="w-full mt-2 bg-slate-100 rounded-2xl flex gap-5 p-3 border-solid border-[1px] border-slate-500"
            >
              <div className="w-32 h-32 bg-gray-400">
                {place.photos.length > 0 && (
                  <img src={place.photos[0]} alt="" />
                )}
              </div>
              <section className="flex flex-col gap-2 text-start">
                <h2 className="font-bold text-xl">{place.title}</h2>
                <p>{place.description}</p>
              </section>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
