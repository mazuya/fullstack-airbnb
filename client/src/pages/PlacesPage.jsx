import { Link, useParams } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from "react";
import Perks from "../../components/Perks";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
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
      {action === "new" && (
        <div>
          <form className="w-[35rem] flex flex-col gap-3 text-start">
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
                <button
                  className="primary w-auto text-xs"
                  onClick={addPhotoByLink}
                >
                  Add photo
                </button>
              </div>
              <section className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                {addedPhoto.length > 0 &&
                  addedPhoto.map((link, index) => (
                    <div key={index}>
                      <img
                        src={"http://localhost:4000/uploads/" + link}
                        className="w-full rounded-md"
                      />
                    </div>
                  ))}
                <button className="p-8 w-auto rounded-lg bg-transparent border-solid border-slate-300 border-[1px] flex items-center justify-center">
                  <MdOutlineFileUpload />
                </button>
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
            <Perks selected={perks} onChange={{ setPerk }} />
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
      )}
    </div>
  );
};

export default PlacesPage;
