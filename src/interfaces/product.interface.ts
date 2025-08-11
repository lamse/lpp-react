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
}

export interface ProductImage {
  id: number;
  productId: number;
  storeName: string;
  uploadName: string;
  createdAt: Date;
  updatedAt: Date;
}