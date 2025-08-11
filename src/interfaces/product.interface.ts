import {User} from "./user.interface";

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