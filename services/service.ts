import { api } from "services/api";

class ListServices {
  [x: string]: any;
  getListServiceTrending = () => {
    return api.get("/service/list-trending");
  };

  getListServiceAll = (params: any) => {
    return api.get(`/service/category/${params?.categoryId}`, params);
    // return api.get("/service/all-service", params);
  };

  getListServiceFavourite = (params: any) => {
    return api.get("/user-favourite/my-favourite", params);
  };

  addToFavourite = (params: any) => {
    return api.post("/user-favourite/add-favourite", params);
  };

  removeFavourite = (id: any) => {
    return api.delete(`/user-favourite/remove/${id}`, {});
  };

  addToCart = (params: any) => {
    return api.post("/cart/create", params);
  };

  getAllCart = (params: any) => {
    return api.get("/cart/all", params);
  };

  removeCart = (id: any) => {
    return api.delete(`/cart/remove/${id}`, {});
  };

  updateInfoCart = (params: any, id: any) => {
    return api.put(`/cart/update/${id}`, params);
  };

  createOrder = (params: any) => {
    return api.post(`/order-history/add-history`, params);
  };

  getOrderHistory = (params: any) => {
    return api.get(`/order-history/list-all`, params);
  };

  getAllNoti = (params: any) => {
    return api.get("/noti/all-noti", params);
  };

  login = (params: any) => {
    return api.post(`/auth/login`, params);
  };

  register = (params: any) => {
    return api.post(`/auth/register`, params);
  };

  loginGoogle = (params: any) => {
    return api.post(`/auth/google/login`, params);
  };

  getInfoUser = () => {
    return api.get(`/user/info`);
  };

  postPayment = (params: any) => {
    return api.post("/payment/create-pay-ment", params);
  };

  getInforAffiliate = () => {
    return api.get(`/affiliate/statictis`);
  };

  getWithdrawn = (params: any) => {
    return api.get(`/withdrawn/list-my-withdrawns`, params);
  };
  
  getListTransaction = (params: any) => {
    return api.get("/payment/list-my-transactions", params);
  };

  uploadAvatar = (params: any) => {
    return api.post("/avatar", params);
  };

  updateUserInfo = (params: any) => {
    return api.put("/user/update-info", params);
  };

  getCategoriesService = () => {
    return api.get("/category/all" );
  };

  createOrderWithdraw = (params:any) => {
    return api.post("/withdrawn/create-withdrawn" ,params);
  };
}

const listServices = new ListServices();

export default listServices;
