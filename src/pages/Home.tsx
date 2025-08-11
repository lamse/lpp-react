import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import {ApiResponse} from "../interfaces/api-response.interface";
import {Product} from "../interfaces/product.interface";

interface ProductResponse {
  products: Product[];
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ApiResponse<ProductResponse>>(`${process.env.REACT_APP_API_URL}/product`);
        setProducts(response.data.data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">Please find the lowest price!</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

          {products.map((product) => (
            <a key={product.id} href={`/product/${product.id}`} className="group">
              <div>
                {product.productImages.length === 0 ? (
                  <img src={`${process.env.REACT_APP_URL}/images/no-image.png`} alt="Not Available"
                       className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
                ) : (
                  <img src={`${process.env.REACT_APP_URL}/uploads/images/${product.productImages[0].storeName}`} alt={product.name}
                       className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
                )}
              </div>
              <h3 className="mt-4 text-lg text-gray-700">{product.name}</h3>
              <p className="mt-1 text-md font-medium text-gray-900">{product.price}</p>
            </a>
          ))}

        </div>
        <div id="page"></div>
      </div>
    </div>
  )
};

export default Home;
