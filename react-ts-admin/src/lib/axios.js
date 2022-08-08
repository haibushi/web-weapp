import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3001/api",
});

//添加一个请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//添加一个响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
