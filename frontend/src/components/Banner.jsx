import React from "react";

const Banner = ({ banner }) => {
  return (
    <div className="container-fluid bg-bannercolor">
      <img
        src={"data:image/png;base64," + banner}
        className="d-block p-1 mx-auto w-15"
        alt="Tech Neeks Banner"
      />
    </div>
  );
};

export default Banner;
