import axios from "../lib/axios";
import type { AxiosPromise } from "axios";

import { Service } from "./type";
export function Login(data: {
  username: string;
  password: string;
}): AxiosPromise<Service<any>> {
  // post
  // return axios({
  //     method:"post",
  //     url:"/login/index",
  //     data
  //    })
  //get
  return axios({
    method: "get",
    url: "/login/index",
    params: data,
  });
}
