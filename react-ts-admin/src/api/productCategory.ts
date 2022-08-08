import axios from "../lib/axios";
import type { AxiosPromise } from "axios";
import type { Service } from "./type";

interface AddDataType {
  name: string;
  sort: number;
}

export interface listType {
  id: number;
  name: string;
  sort: number;
  create_at: number;
  create_time: string;
}

export function add(data: AddDataType): AxiosPromise<Service<string>> {
  return axios({
    method: "post",
    url: "/productcategory/add",
    data,
  });
}

export function list(data: any = {}): AxiosPromise<Service<listType[]>> {
  return axios({
    method: "get",
    url: "/productcategory/index",
    params: data,
  });
}

export function del(data: { id: number }): AxiosPromise<Service<any>> {
  return axios({
    method: "get",
    url: "/productcategory/del",
    params: data,
  });
}

export function find(data: { id: number }): AxiosPromise<Service<any>> {
  return axios({
    method: "get",
    url: "/productcategory/find",
    params: data,
  });
}

export function update(
  id: number,
  data: AddDataType
): AxiosPromise<Service<any>> {
  return axios({
    method: "post",
    url: "/productcategory/update/?id=" + id,
    data,
  });
}

export function deleteAll(data: { ids: string }): AxiosPromise<Service<any>> {
  return axios({
    method: "post",
    url: "/productcategory/deleteAll",
    params: data,
  });
}
