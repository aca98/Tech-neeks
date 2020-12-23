import React from "react";
import { Link } from "react-router-dom";

const AdminUserCard = ({ user, handleModal }) => {
  const authority = { 0: "Gost", 1: "Korisnik", 2: "Admin" };
  return (
    <div className="col-sm-12 col-md-4 col-lg-3 p-1">
      <div className="card h-100 p-1">
        <Link to={"/user/" + user.email}>
          <img
            src={"/api/userPicture.png"}
            className="d-block mx-auto w-25"
            alt="..."
          />

          <div className="card-body p-1">
            <h6 className="card-title text-black text-center">
              {user.ime + " " + user.prezime}
            </h6>
            <h6 className="card-title text-black text-center">{user.email}</h6>
          </div>
        </Link>
        <div className="row m-0 p-2 ">
          <h5>Autoritet: {authority[user.authority]}</h5>
        </div>
        <ul className="list-group list-group-flush mt-auto">
          <li className="list-group-item">
            Poslednja Aktivnost:{" "}
            {user.last_activity.replaceAll("-", "/").replaceAll("T", " ")}
          </li>
          <li className="list-group-item">
            Registrovan od:{" "}
            {user.datum_registracije.replaceAll("-", "/").replaceAll("T", " ")}
          </li>
        </ul>
        <div className="row m-0">
          <div
            className={`col-sm-12 col-md-${user.authority === 1 ? 6 : 12} p-1`}>
            <Link className="text-white" to={"/user/" + user.email}>
              <div className="p-2 bg-darkgray rounded text-center text-white">
                Pregled Profila
              </div>
            </Link>
          </div>
          {user.authority === 1 && (
            <div className="col-sm-12 col-md-6 p-1">
              <button
                onClick={() => handleModal(user.email)}
                className="p-2 w-100 border-0 bg-danger rounded text-center text-white">
                Obriši
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserCard;
