import axios from "axios";
import { base_url } from "../utils/constants.util";
import Storage from "../utils/storage.utils";

import { REFRESH_TOKEN_URL } from "../utils/urls.utils";
import { serviceLogger } from '../utils/functions.utils';
import { useSelector } from "react-redux";
const refresh_token = () => {
  return new Promise(async(resolve:(val:string)=>void, reject) => {
      const refresh_token = await Storage.getItem("r-token");
      if(refresh_token !== null){
          service().post(REFRESH_TOKEN_URL,{},{
              headers:{
                  refreshtoken : refresh_token
              }
          }).then((res:any) => {
              if(res.data?.status && res.data?.data?.status){
                  resolve(res.data?.data?.access_token)
              }else{
                  reject(res)
              }
          }).catch(err => {
              console.log(err);
              reject(err);
          })
      }else{
          reject(new Error("Refresh token not found"))
      }
  })
}

export const service = (url = base_url) => {
  let req_body = {}
  const instance = axios.create({
    baseURL: url,
  });
  //for request
  instance.interceptors.request.use(async (request) => {
    req_body = request
    console.log(`Calling request: ${request.baseURL}${request.url}`);
    const accessToken = await Storage.getItem('token');
    const refresh_token = await Storage.getItem("r-token");
    if (accessToken && refresh_token) {
      console.log("accessToken", accessToken);
      console.log("r-token", refresh_token);
      request.headers["Authorization"] = accessToken.toString();
    }
    return request;
  });
  // for response
  instance.interceptors.response.use(async (response) => {
    return response;
  },async function (error) {
    const originalRequest = error.config;
    try{
      if (error.response.status === 403 && !originalRequest._retry) {
        console.log("==========Intercept Response============")
        originalRequest._retry = true;
        const access_token:string = await refresh_token();
        await Storage.setKey("token", access_token)
        return instance(originalRequest);
      }
      serviceLogger({...error,request : req_body})
      return Promise.reject(error);
    }catch(err:any){
      console.log("Err in interceptor :",err );
      return Promise.reject(error);
    }
  });
  return instance;
};

export default service;
