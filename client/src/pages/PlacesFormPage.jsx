import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from "react";
import Perks from "../../components/Perks";
import axios from "axios";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerk] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuestes] = useState(1);
  const [redirect, setRedirect] = useState("");

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/uploaded-by-link", {
      link: photoLink,
    });
    setAddedPhoto((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhoto(e) {
    const files = e.target.files;

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhoto((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  async function addNewPlace(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      photos: addedPhoto,
      photoLink,
      description,
      extraInfo,
      perks,
      checkIn,
      checkOut,
      maxGuests,
    };
    await axios.post("/places", placeData);
    setRedirect("/account/places");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <form
        onSubmit={addNewPlace}
        className="w-[35rem] flex flex-col gap-3 text-start"
      >
        <section className="flex flex-col gap-1">
          <label className="font-semibold">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="title"
          />
        </section>
        <section className="flex flex-col gap-1">
          <label className="font-semibold">Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="address"
          />
        </section>
        <section className="flex flex-col gap-1">
          <h2 className="font-semibold">Photo</h2>
          <div className="flex gap-2">
            <input
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
              type="text"
              placeholder="Add using a link ...jpg"
            />
            <button className="primary w-auto text-xs" onClick={addPhotoByLink}>
              Add photo
            </button>
          </div>
          <section className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
            {addedPhoto.length > 0 &&
              addedPhoto.map((link, index) => (
                <div key={index} className="h-40 flex">
                  <img
                    src={"http://localhost:4000/uploads/" + link}
                    className="w-full rounded-md object-cover"
                  />
                </div>
              ))}
            <label className="p-8 cursor-pointer w-auto rounded-lg bg-transparent border-solid border-slate-300 border-[1px] flex items-center justify-center">
              <input
                type="file"
                mulitiple="true"
                className="hidden"
                onChange={uploadPhoto}
              />
              <MdOutlineFileUpload />
              <p>Upload</p>
            </label>
          </section>
        </section>
        <section className="flex flex-col gap-1">
          <label className="font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            className="border-solid border-slate-300 border-[1px] rounded-md p-2"
          />
        </section>
        <Perks selected={perks} onChange={setPerk} />
        <section className="flex flex-col gap-1">
          <label className="font-semibold">Extra info</label>
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            placeholder="extra info"
            className="border-solid border-slate-300 border-[1px] rounded-md p-2"
          />
        </section>
        <h3 className="font-semibold">Check In&out times</h3>
        <section className="grid grid-cols-3 gap-1">
          <div>
            <h3>Check in time</h3>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="text"
              placeholder="14:00"
            />
          </div>
          <div>
            <h3>Check out time</h3>
            <input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              type="text"
              placeholder="14:00"
            />
          </div>
          <div>
            <h3>Max number of guests</h3>
            <input
              value={maxGuests}
              onChange={(e) => setMaxGuestes(e.target.value)}
              type="text"
              placeholder="14:00"
            />
          </div>
        </section>
        <button className="primary">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
