import React from "react";

const Perks = ({ selected, onChange }) => {
  function handleCbClick(e) {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }
  return (
    <section className="flex flex-col gap-1">
      <label className="font-semibold">Perks</label>
      <p>select all the perks bla bla</p>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        <label className="flex gap-2">
          <input name="wifi" onChange={handleCbClick} type="checkbox" />
          <span>Wifi</span>
        </label>
        <label className="flex gap-2">
          <input name="tv" onChange={handleCbClick} type="checkbox" />
          <span>TV</span>
        </label>
        <label className="flex gap-2">
          <input name="pets" onChange={handleCbClick} type="checkbox" />
          <span>Pets</span>
        </label>
        <label className="flex gap-2">
          <input name="free-park" onChange={handleCbClick} type="checkbox" />
          <span>Free park</span>
        </label>
        <label className="flex gap-2">
          <input name="kiwi" onChange={handleCbClick} type="checkbox" />
          <span>Kiwi</span>
        </label>
      </div>
    </section>
  );
};

export default Perks;
