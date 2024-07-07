import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa";

const ViewPlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return <div>Loading...</div>; // Add a loading state or message
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0  min-h-screen h-screen w-full">
        <div className="bg-black bg-opacity-40 p-20 pt-5 flex flex-col gap-3">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="hover:bg-slate-300 duration-200 mt-20 bg-white items-center drop-shadow-md p-3 rounded-lg w-44 flex gap-3"
          >
            <div className="text-xl">
              <IoClose />
            </div>
            <h1 className="font-semibold">Close photos</h1>
          </button>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div key={index} className="z-10">
                <img
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                  className="w-full h-auto"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center pt-8 ">
      <div className="w-[95%] items-center flex flex-col gap-3">
        <section className="w-full text-start">
          <h2 className="font-bold text-3xl">{place?.title}</h2>
          <p className="mt-3 flex items-center gap-3">
            <LuMapPin />
            {place.address}
          </p>
        </section>
        <section className="grid gap-2 grid-cols-[2fr_1fr] w-full">
          <div className="w-full h-[35rem] relative">
            {place.photos?.[0] && (
              <img
                src={"http://localhost:4000/uploads/" + place.photos[0]}
                className="w-full h-full overflow-hidden object-cover rounded-xl"
              />
            )}
          </div>
          <div className="grid gap-2 font-semibold relative">
            <button
              onClick={() => setShowAllPhotos(true)}
              className="flex gap-3 items-center bg-white p-2 text-xs rounded-md absolute right-5 bottom-5 z-10 hover:bg-slate-300 duration-200"
            >
              <p className="text-xl">
                <MdOutlinePhotoSizeSelectActual />
              </p>
              Show all photo{" "}
            </button>
            <div className="w-full h-full relative">
              {place.photos?.[1] ? (
                <div className="w-full h-full relative">
                  <img
                    src={"http://localhost:4000/uploads/" + place.photos[1]}
                    className="w-full h-full overflow-hidden object-cover rounded-xl"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}
            </div>

            <div className="w-full h-full relative">
              {place.photos?.[2] ? (
                <div className="w-full h-full relative">
                  <img
                    src={"http://localhost:4000/uploads/" + place.photos[1]}
                    className="w-full h-full overflow-hidden object-cover rounded-xl"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 mt-6 h-[20rem]">
          <section className="w-full text-start flex flex-col gap-3 items-start">
            <h2 className="text-2xl font-bold">Description</h2>
            <p>{place.description}</p>
            <p className="mt-5">
              <span className="font-semibold">Check-in: </span>
              {place.checkIn}
            </p>
            <p>
              <span className="font-semibold">Check-out: </span>
              {place.checkOut}
            </p>
            <p>
              <span className="font-semibold">Max number of guests: </span>
              {place.maxGuests}
            </p>
          </section>
          <section className="bg-slate-100 drop-shadow-md rounded-2xl p-5 flex flex-col items-center">
            <h2 className="text-2xl">Price: ${place.price}/per night</h2>
            <form
              action=""
              className="w-full border-[1px] border-solid p-5 rounded-lg mt-5 border-slate-300"
            >
              <section className="grid grid-cols-2 ">
                <div className="flex flex-col gap-1 items-start border-r-[1px] border-solid border-slate-300">
                  <h2>Check-in:</h2>
                  <span className="flex gap-2 items-center">
                    <input type="text" />
                    <FaRegCalendar />
                  </span>
                </div>
                <div className="ml-3 flex flex-col gap-1 items-start">
                  <h2>Check-Out:</h2>
                  <span className="flex gap-2 items-center">
                    <input type="text" />
                    <FaRegCalendar />
                  </span>
                </div>
              </section>
              <section className="mt-3 flex flex-col items-start border-t-[1px] border-solid border-slate-300 pt-5">
                <h2>Number of guests:</h2>
                <input type="number" />
              </section>
            </form>
            <button className="w-full primary rounded-lg p-3 mt-2">Book</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ViewPlacePage;
