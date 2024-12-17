import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });
export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });
export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",
    data,
  });
export const apiResetPassword = (data) =>
  axios({
    url: "/user/resetpassword",
    method: "put",
    data,
  });
export const apiGetCurrent = (data) =>
  axios({
    url: "/user/current",
    method: "get",
    data,
  });
export const apiGetUsers = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });
export const apiUpdateUser = (data, uid) =>
  axios({
    url: "/user/" + uid,
    method: "put",
    data,
  });
export const apiDeleteUser = (uid) =>
  axios({
    url: "/user/" + uid,
    method: "delete",
  });

export const apiUpdateCurrent = (data) =>
  axios({
    url: "/user/current",
    method: "put",
    data,
  });
export const apiUpdateCart = (data) =>
  axios({
    url: "/user/cart",
    method: "put",
    data,
  });
export const apiUpdateWishlist = (pid) =>
  axios({
    url: `/user/wishlist/` + pid,
    method: "put",
  });
export const apiRemoveCart = (pid, color) =>
  axios({
    url: `/user/remove-cart/${pid}/${color}`,
    method: "delete",
  });
export const apiGetOrders = (params) =>
  axios({
    url: "/order/admin",
    method: "get",
    params,
  });
export const apiGetUserOrders = (params) =>
  axios({
    url: "/order/",
    method: "get",
    params,
  });
