import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { MdOutlineNoPhotography } from "react-icons/md";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([...response.data]);
    });
  }, []);
  return (
    <div className="w-full justify-center items-center flex flex-col gap-3 pt-6">
      <section className="w-full grid md:grid-cols-3 grid-cols-2 gap-5 ">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/place/" + place._id}
              className="  flex flex-col items-start p-3 gap-2 text-start bg-slate-100 rounded-2xl  hover:bg-slate-200 duration-200"
            >
              {place.photos?.[0] ? (
                <div className="h-72 relative rounded-2xl">
                  <img
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt=""
                    className="w-full h-full overflow-hidden object-cover rounded-xl"
                  />
                </div>
              ) : (
                <div className="w-full h-72 relative rounded-2xl bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl">
                    <MdOutlineNoPhotography />
                  </span>
                </div>
              )}
              <section className="flex flex-col px-4 py-5">
                <h2 className="font-bold text-xl ">{place.title}</h2>
                <p className="mt-3 text-slate-400 text-xs">{place.address}</p>
                <p>
                  <span className="font-semibold">${place.price}</span> per
                  nights
                </p>
              </section>
            </Link>
          ))}
      </section>
    </div>
  );
};

export default IndexPage;
