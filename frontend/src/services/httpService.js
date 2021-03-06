import axios from "axios";
import querystring from "querystring";

const baseURL = process.env.APP;

console.log("BAse url " + baseURL);
async function getBanner() {
  const banner = await axios.get("/api/banner");
  return banner.data;
}
async function getSmallBanner() {
  const banner = await axios.get("/api/small-banner");
  return banner.data;
}
async function getProducts() {
  const recievedData = await axios.get("/api/");
  return recievedData.data;
}
async function getAllProducts() {
  const recievedData = await axios.get("/api/all_products");
  return recievedData.data;
}

async function searchProducts(query) {
  const recievedData = await axios.get("/api/search?query=" + query);
  return recievedData.data;
}
async function adminSearchProducts(query) {
  const recievedData = await axios.get("/api/adminsearch?query=" + query);
  return recievedData.data;
}
async function getFilteredProducts(criteria) {
  if (criteria) {
    const recievedData = await axios.get("/api/");
    return recievedData.data;
  } else {
    const recievedData = await axios.post("/api/filter", {
      filter: criteria,
    });
    return recievedData;
  }
}
async function getListOfFilters() {
  const recievedData = await axios.get("/api/product_filters");
  return recievedData.data;
}
async function getDefaultFilters() {
  const recievedData = await axios.get("/api/defaultFilters");
  return recievedData.data;
}
async function getProduct(id) {
  const recievedData = await axios.get("/api/products?id=" + id);
  return recievedData.data;
}
async function restoreProduct(id) {
  const recievedData = await axios.get("/api/restore?id=" + id);
  return recievedData.data;
}
async function getUser(email) {
  const recievedData = await axios.get("/api/users?email=" + email);
  return recievedData.data;
}
async function searchUsers(query) {
  const recievedData = await axios.get("/api/searchusers?query=" + query);
  return recievedData.data;
}
async function getEveryUser(email) {
  const recievedData = await axios.get("/api/everyUser?email=" + email);
  return recievedData.data;
}
async function getAnalytics(year) {
  const recievedData = await axios.get("/api/analytics?year=" + year);
  return recievedData.data;
}
async function getProductAnalytics(year, productId) {
  const recievedData = await axios.get(
    "/api/product_analytics?year=" + year + "&productId=" + productId
  );
  return recievedData.data;
}
async function getMonthlyAnalytics(year, month) {
  const recievedData = await axios.get(
    "/api/monthly_analytics?year=" + year + "&month=" + month
  );
  return recievedData.data;
}
async function getProductMonthlyAnalytics(year, month, productId) {
  const recievedData = await axios.get(
    "/api/product_monthly_analytics?year=" +
      year +
      "&month=" +
      month +
      "&productId=" +
      productId
  );
  return recievedData.data;
}
async function changeUser(email) {
  const recievedData = await axios.get("/api/changeUser?email=" + email);
  return recievedData.data;
}
async function userChangePassword(email, password) {
  const recievedData = await axios.get(
    "/api/changepassword?email=" + email + "&password=" + password
  );
  return recievedData.data;
}
async function getUserHistory(email) {
  const recievedData = await axios.get("/api/userhistory?email=" + email);
  return recievedData.data;
}
async function logIn(email, password) {
  const recievedData = await axios.get(
    "/api/login?email=" + email + "&password=" + password
  );
  console.log("logIn data", recievedData.status);
  return recievedData;
}

async function verifyToken(token) {
  const recievedData = await axios.post(
    "/api/validate",
    querystring.stringify({
      token: token,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return recievedData.data;
}
async function purchaseCart(user, listOfProducts) {
  const recievedData = await axios.post(
    "/api/purchaseCart",
    {
      user: user,
      products: listOfProducts,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return recievedData.data;
}
async function updateProduct(product, images) {
  const recievedData = await await axios({
    method: "post",
    url: "/api/updateproduct",
    data: {
      product,
      images,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return recievedData.data;
}
async function addProduct(product, images) {
  const recievedData = await await axios({
    method: "post",
    url: "/api/add",
    data: {
      product,
      images,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return recievedData.data;
}

async function adminRegister(user) {
  const recievedData = await await axios({
    method: "post",
    url: "/api/adminregister",
    data: {
      ...user,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return recievedData.data;
}
async function userRegister(user) {
  const recievedData = await await axios({
    method: "post",
    url: "/api/register",
    data: {
      ...user,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return recievedData.data;
}
async function updateUser(user) {
  const recievedData = await await axios({
    method: "post",
    url: "/api/update_user",
    data: {
      ...user,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return recievedData.data;
}

async function deleteProduct(id) {
  const recievedData = await axios.get("/api/delete_product?id=" + id);
  return recievedData.data;
}
async function getUsers() {
  const recievedData = await axios.get("/api/allusers");
  return recievedData.data;
}
async function getPopularProducts() {
  const recievedData = await axios.get("/api/popular");
  return recievedData.data;
}
async function getDiscountProducts() {
  const recievedData = await axios.get("/api/discount_product");
  return recievedData.data;
}

async function getProductsCart(query) {
  let responseData = await axios.get("/api/list?query=" + query);
  // let products = {};
  // let keys = Object.keys(storage);
  // console.log(keys);
  // keys.forEach(async (element, index, array) => {
  //   products[element] = {
  //     ...(await axios.get(baseURL+"/api/products?id=" + element))
  //       .data,
  //     amount: storage[element],
  //   };
  // });
  // const recievedData = await axios.get(
  //   baseURL+"/api/products?id=" + id
  // );
  return responseData.data;
}

export {
  getBanner,
  getSmallBanner,
  getProducts,
  getFilteredProducts,
  getListOfFilters,
  getDefaultFilters,
  getProduct,
  getUser,
  userChangePassword,
  getUserHistory,
  logIn,
  verifyToken,
  purchaseCart,
  updateProduct,
  deleteProduct,
  getUsers,
  getEveryUser,
  changeUser,
  getAnalytics,
  getMonthlyAnalytics,
  getProductAnalytics,
  getProductMonthlyAnalytics,
  adminRegister,
  addProduct,
  searchProducts,
  searchUsers,
  getProductsCart,
  getPopularProducts,
  getDiscountProducts,
  userRegister,
  updateUser,
  getAllProducts,
  adminSearchProducts,
  restoreProduct,
};
