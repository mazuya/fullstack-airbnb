import React from "react";
import AccountNav from "../../components/AccountNav";

const BookingPage = () => {
  return (
    <div className="w-full justify-center items-center flex flex-col gap-3 pt-6">
      <AccountNav subpage={"bookings"} />
      BookingPage
    </div>
  );
};

export default BookingPage;
