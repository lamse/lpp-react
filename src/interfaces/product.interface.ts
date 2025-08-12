import {User} from "./user.interface";
import {EnumYN} from "../types/common";

export interface ProductForm {
  name: string;
  modelNo: string;
  url: string;
  price: number;
  description: string;
  imageFiles: File[];
}

export interface Product {
  id: number;
  user: User;
  name: string;
  modelNo: string;
  url: string;
  price: number;
  description: string;
  productImages: ProductImage[];
  productOfferCount?: number;
  registrant?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: number;
  productId: number;
  storeName: string;
  uploadName: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationResponse<T> {
  items: T[];
  first: boolean;
  number: number;
  size: number;
  totalPages: number;
  last: boolean;
  totalElements: number;
}

export interface ProductDetailResponse {
  product: Product;
  productOffers: ProductOffer[];
}

export interface ProductOffer {
  id: number;
  user: User;
  productId: number;
  productOfferChats: ProductOfferChat[];
  url: string;
  price: number;
  choose: EnumYN;
  createdAt: string;
  updatedAt: string;
}

export interface ProductOfferChat {
  id: number;
  user: User;
  productOfferId: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}