import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
  data,
  choice,
  sellDate,
  amount,
  decrement,
  increment,
  handleModal,
  removeFromCart,
  productRestore,
}) => {
  const options = {
    cart: (
      <React.Fragment>
        <div className="row m-0">
          <div className="col-sm-12 col-md-6 p-0">
            <div className="p-1 text-center">Količina:</div>
          </div>
          <div className="col-sm-12 col-md-6 p-0">
            <div className="mx-auto width-fit-content">
              <button
                className="d-inline left-increment "
                onClick={() => decrement(data.product.id)}>
                <i className="arrow left h-10 "></i>
              </button>
              <div className="d-inline middle-increment">{data.amount}</div>
              <button
                className="d-inline right-increment"
                onClick={() => increment(data.product.id)}>
                <i className="arrow right h-10 "></i>
              </button>
            </div>
          </div>
        </div>
        <div className="row w-100 mx-auto">
          <button
            className="bg-danger white w-100 p-2 m-2 text-center text-white rounded border-0"
            onClick={() => removeFromCart(data.product.id)}>
            Ukloni iz korpe
          </button>
        </div>
      </React.Fragment>
    ),
    history: (
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Količina: {amount}</li>
        <li className="list-group-item">
          Datum prodaje: <br />
          {sellDate && sellDate.replaceAll("T", " ").replaceAll("-", "/")}
        </li>
      </ul>
    ),
    delivery: (
      <React.Fragment>
        <div className="row m-0">
          <div className="col-sm-12 col-md-6 p-0">
            <div className="p-1 text-center">Količina:</div>
          </div>
          <div className="col-sm-12 col-md-6 p-0">
            <div className="mx-auto width-fit-content p-1">
              <div className="d-inline">{data.amount}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ),
    admin: (
      <React.Fragment>
        <div className="row m-0">
          {!data.product.deleted && (
            <React.Fragment>
              <div className="col-sm-12 col-md-6 p-1">
                <Link
                  className="text-white"
                  to={"/azuriraj/" + data.product.id}>
                  <div className="p-2 bg-darkgray rounded text-center text-white">
                    Ažuriraj
                  </div>
                </Link>
              </div>
              <div className="col-sm-12 col-md-6 p-1">
                <button
                  onClick={() => handleModal(data.product.id)}
                  className="p-2 w-100 border-0 bg-danger rounded text-center text-white">
                  Obriši
                </button>
              </div>
            </React.Fragment>
          )}
          {/* Vracanje Proizvoda */}
          {/* (
              <button
                onClick={() => productRestore(data.product.id)}
                className="p-2 w-100 border-0 bg-info rounded text-center text-white">
                Vrati
              </button>
            ) */}

          <div className="col-sm-12 col-md-12 p-1">
            <Link className="text-white" to={"/analytics/" + data.product.id}>
              <div className="p-2 bg-success rounded text-center text-white">
                Pregled Analitike
              </div>
            </Link>
          </div>
        </div>
      </React.Fragment>
    ),
  };

  return (
    <div className="col-sm-12 col-md-4 col-lg-3 p-1">
      <div className="card h-100">
        <Link to={"/product/" + data.product.id}>
          <img
            src={"data:image/png;base64," + data.images[0]}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body p-1">
            <h6 className="card-title text-black">{data.product.name}</h6>
          </div>
        </Link>
        <ul className="list-group list-group-flush mt-auto">
          <li className="list-group-item px-2 pt-1 pb-1">
            Marka: {data.product.brand}
          </li>
          {data.product.discount !== "0" ? (
            <React.Fragment>
              {" "}
              <li className="list-group-item px-2 pt-1 pb-1">
                Popust: {data.product.discount}%
              </li>
              <li className="list-group-item px-2 pt-1 pb-1">
                Cena: <strike>{data.product.price}</strike>{" "}
                {data.product.price -
                  Math.floor(
                    data.product.price * (data.product.discount / 100)
                  )}{" "}
                RSD
              </li>
            </React.Fragment>
          ) : (
            <li className="list-group-item px-2 pt-1 pb-1">
              Cena: {data.product.price} RSD
            </li>
          )}
        </ul>
        {options[choice]}
      </div>
    </div>
  );
};

export default ProductCard;
