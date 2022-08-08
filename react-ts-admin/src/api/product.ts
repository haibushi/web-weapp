import axios from "../lib/axios";
import type { AxiosPromise } from "axios";
import React from "react";
import { Service } from "./type";

interface AddProduct {
  product_name: string;
  product_price: string;
  category_id: number;
  product_url:string;
  is_top: number;
  is_tuijian: number;
  sort: number;
}

export function addProduct(data: AddProduct): AxiosPromise<Service<string>> {
  // post
  return axios({
    method: "post",
    url: "/Product/add",
    data,
  });
}

export function listProduct(data: any = {}): AxiosPromise<Service<AddProduct[]>> {
  // get
  return axios({
    method: "get",
    url: "/Product/index",
    params: data,
  });
}

export function deleteProduct(data: { id: number }): AxiosPromise<Service<any>> {
  // get
  return axios({
    method: "get",
    url: "/Product/del",
    params: data,
  });
}

export function find(data: { id: number }): AxiosPromise<Service<any>> {
  return axios({
    method: "get",
    url: "/Product/find",
    params: data,
  });
}

export function update(
  id: number,
  data: AddProduct
): AxiosPromise<Service<any>> {
  // post
  return axios({
    method: "post",
    url: "/Product/update/?id=" + id,
    data,
  });
}
