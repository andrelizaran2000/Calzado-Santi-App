// Modules
import { axiosInstance } from '../utils/axios';

export type GetShopsApiData = { 
  API_SHOP:number,
  LATITUDE:number, 
  LONGITUDE:string, 
  TITLE:string, 
  URL:string 
}[];

export type GetShoesByCategoryApiData = {
  ID_SHOE:number;
  COLORS:string;
  BRAND:string;
  PRICE:number;
  PIECES:number;
  CATEGORY:number;
  IMAGE:string;
}[];

export type ShoeData = {
  ID_SHOE:number;
  COLORS:string;
  BRAND:string;
  PRICE:number;
  PIECES:number;
  CATEGORY:number;
  IMAGE:string;
}

export type ShoppinCartItem = {
  ID_SHOPPING_CART: number;
  ID_USER: number;
  ID_PRODUCT: number;
  PIECES: number;
}

export function getShopsApi () {
  return axiosInstance.request<GetShopsApiData>({ method:'GET', url:'/shops' });
}

export function getShoesByCategoryApi (category:number) {
  return axiosInstance.request<GetShoesByCategoryApiData>({ method:'GET', url:`/shoes/${category}` });
}

export function getShoeByIdApi (idProduct:number) {
  return axiosInstance.request<GetShoesByCategoryApiData>({ method:'GET', url:`/shoe/${idProduct}` });
}

export function getAllShoesApi () {
  return axiosInstance.request<GetShoesByCategoryApiData>({ method:'GET', url:`/shoes` });
}

export function loginApi (email:string, password:string) {
  return axiosInstance.post<string>('/user', { email, password });
}

export function saveInShoppingCartApi (token:string, idProduct:number, pieces:number ) {
  return axiosInstance.post(`/shopping-cart/${idProduct}/${pieces}`, { idProduct, pieces }, { headers:{ token }});
}

export function getUserShoppingCartApi (token:string,) {
  return axiosInstance.get<ShoppinCartItem[]>(`/shopping-cart/`, { headers:{ token }});
}

export function removeItemFromShoppingCartApi (idItem:number) {
  return axiosInstance.get(`/shopping-cart/${idItem}`);
}