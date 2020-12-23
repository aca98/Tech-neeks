import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./components/Homepage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faStar,
  faStarHalf,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import ProductSearch from "./components/ProductSearch";
import Login from "./components/Login";
import Register from "./components/Register";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import ProductView from "./components/ProductView";
import UserProfile from "./components/UserProfile";
import UpdateProfile from "./components/UpdateProfile";
import UserPurchaseHistory from "./components/UserPurchaseHistory";
import ProtectedRoute from "./components/ProtectedRoute";
import DeliveryData from "./components/DeliveryData";
import AdminNavBar from "./components/admin/AdminNavBar";
import AdminSideBar from "./components/admin/AdminSideBar";
import AdminProductSearch from "./components/admin/AdminProductSearch";
import AdminProductUpdate from "./components/admin/AdminProductUpdate";
import AdminProductView from "./components/admin/AdminProductView.jsx";
import AdminUserSearch from "./components/admin/AdminUserSearch";
import AdminUserProfile from "./components/admin/AdminUserProfile";
import AdminRegister from "./components/admin/AdminRegister";
import ProductAnalytics from "./components/admin/ProductAnalytics";
import GeneralAnalytics from "./components/admin/GeneralAnalytics";
import { getProducts, searchProducts } from "./services/httpService";
import Footer from "./components/Footer";
library.add(fab, faCheckSquare, faCoffee, faStar, faStarHalf, faEdit);

const App = () => {
  const [admin, isAdmin] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((value) => {
      let products = [...value];
      setProducts(products);
    });
  }, [setProducts]);

  const CallSearch = async (query) => {
    let product = query ? await searchProducts(query) : await getProducts();
    setProducts(product);
  };

  const search = (query) => {
    CallSearch(query);
  };

  const setAdmin = (admin) => {
    isAdmin(admin);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      {admin.authority === 2 ? (
        <React.Fragment>
          <Switch>
            <Route
              component={(e) => (
                <AdminNavBar {...e} admin={admin} setAdmin={setAdmin} />
              )}
            />
          </Switch>
          <AdminSideBar>
            <Switch>
              <Route path="/addProduct" exact component={AddProduct} />
              <Route
                path="/products"
                exact
                component={() => (
                  <AdminProductSearch
                    products={products}
                    setProducts={setProducts}
                    search={search}
                  />
                )}
              />
              <Route
                path="/azuriraj/:id"
                exact
                component={AdminProductUpdate}
              />
              <Route path="/product/:id" exact component={AdminProductView} />
              <Route path="/users" exact component={AdminUserSearch} />
              <Route path="/user/:email" exact component={AdminUserProfile} />
              <Route path="/analytics" exact component={GeneralAnalytics} />
              <Route path="/analytics/:id" exact component={ProductAnalytics} />
              <Route path="/adminregister" exact component={AdminRegister} />
            </Switch>
          </AdminSideBar>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Switch>
            <Route
              component={(e) => (
                <NavBar
                  {...e}
                  admin={admin}
                  setAdmin={setAdmin}
                  setProducts={setProducts}
                  search={search}
                />
              )}
            />
          </Switch>
          <Switch>
            <ProtectedRoute
              path="/userhistory"
              exact
              component={UserPurchaseHistory}
            />
            <ProtectedRoute
              path="/updateProfile"
              exact
              component={UpdateProfile}
            />
            <ProtectedRoute path="/users" exact component={UserProfile} />
            <Route path="/add" exact component={AddProduct} />
            <Route path="/delivery" exact component={DeliveryData} />
            <Route path="/aboutus" exact component={AboutUs} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/cart" exact component={Cart} />
            <Route
              path="/login"
              exact
              component={(e) => (
                <Login {...e} setProducts={setProducts} setAdmin={setAdmin} />
              )}
            />
            <Route path="/register" exact component={Register} />
            <Route path="/product/:id" exact component={ProductView} />
            <Route path="/" exact component={Homepage} />
            <Route path="/api/index.html" exact component={Homepage} />

            <Route
              path="/filter"
              exact
              component={() => <ProductSearch products={products} />}
            />
            <Redirect exact to="/not-found" />
          </Switch>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default App;
