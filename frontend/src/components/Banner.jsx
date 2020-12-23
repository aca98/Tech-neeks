import React from "react";

const Banner = ({ banner }) => {
  return (
    <div className="container-fluid bg-bannercolor">
      <img
        src={"/api/tach_neeks_banner_2.png"}
        className="d-block p-1 mx-auto w-15"
        alt="Tech Neeks Banner"
      />
    </div>
  );
};

export default Banner;
