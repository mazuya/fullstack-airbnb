import React from "react";
import { useParams } from "react-router-dom";

const HotelPage = () => {
  const { id } = useParams();
  console.log({ id });
  return <div>HotelPage</div>;
};

export default HotelPage;
