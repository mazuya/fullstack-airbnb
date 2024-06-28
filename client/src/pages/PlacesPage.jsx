import React from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";

const PlacesPage = () => {
  const { action } = useParams();
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
              <input type="text" placeholder="title" />
            </section>
            <section className="flex flex-col gap-1">
              <label className="font-semibold">Address</label>
              <input type="text" placeholder="address" />
            </section>
            <section className="flex flex-col gap-1">
              <h2 className="font-semibold">Photo</h2>
              <div className="flex gap-2">
                <input type="text" placeholder="Add using a link ...jpg" />
                <button className="primary w-auto text-xs">Add photo</button>
              </div>
              <section className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                <button className="p-8 w-auto rounded-lg bg-transparent border-solid border-slate-300 border-[1px] flex items-center justify-center">
                  <MdOutlineFileUpload />
                </button>
              </section>
            </section>
            <section className="flex flex-col gap-1">
              <label className="font-semibold">Description</label>
              <textarea
                placeholder="description"
                className="border-solid border-slate-300 border-[1px] rounded-md p-2"
              />
            </section>
            <section className="flex flex-col gap-1">
              <label className="font-semibold">Perks</label>
              <p>select all the perks bla bla</p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                <label className="flex gap-2">
                  <input type="checkbox" />
                  <span>Wifi</span>
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" />
                  <span>TV</span>
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" />
                  <span>Pets</span>
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" />
                  <span>Free park</span>
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" />
                  <span>Kiwi</span>
                </label>
              </div>
            </section>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
