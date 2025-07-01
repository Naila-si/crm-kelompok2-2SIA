import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const UserLayout = ({ children }) => {
  return (
    <div className="font-sans text-gray-800 bg-[#fff8f0]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;
