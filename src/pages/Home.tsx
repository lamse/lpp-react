import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import {ApiResponse} from "../interfaces/api-response.interface";
import {PaginationResponse, Product, ProductSearchForm} from "../interfaces/product.interface";
import Pagination from '../components/Pagination';
import {Link} from "react-router-dom";
import SearchForm from "./product/SearchForm"; // Import the Pagination component

const Home: React.FC = () => {
  const [productResponse, setProductResponse] = useState<PaginationResponse<Product> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProductSearchForm>({
    page: 0,
    minPrice: '',
    maxPrice: '',
    query: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ApiResponse<PaginationResponse<Product>>>(
          `${process.env.REACT_APP_API_URL}/product?page=${form.page}&minPrice=${form.minPrice}&maxPrice=${form.maxPrice}&query=${form.query}`);
        setProductResponse(response.data.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, [form]);

  const handlePageChange = (page: number) => {
    setForm({...form, page});
  };

  const handleSearch = (searchForm: ProductSearchForm) => {
    setForm(searchForm);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5 text-left">Please find the lowest price!</h2>
        <SearchForm handleSearch={handleSearch}/>
        {error && <p className="error-message">{error}</p>}
        {!productResponse && !error ? (
          <p>Loading products...</p>
        ) : productResponse?.totalElements === 0 ? (
          <p>No products found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {productResponse?.items?.map((product) => (
                <div key={product.id} className="relative">
                  { product.productOfferCount !== undefined && product.productOfferCount > 0 && (
                    <span className="absolute top-6 right-2 bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {product.productOfferCount} offers
                  </span>
                  )}
                <Link to={`/lpp-react/product/${product.id}`} className="group">

                  <div>
                    {product.productImages.length === 0 ? (
                      <img src={`${process.env.REACT_APP_URL}/images/no-image.png`} alt="Not Available"
                           className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
                    ) : (
                      <img src={`${process.env.REACT_APP_URL}/uploads/images/${product.productImages[0].storeName}`} alt={product.name}
                           className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg text-gray-700 text-left">{product.name}</h3>
                  <p className="mt-1 text-md font-medium text-gray-900 text-left">\{product.price.toLocaleString()}</p>

                </Link>
                </div>
              ))}
            </div>
            <div id="pagination" className="mt-10">
              {productResponse && productResponse.totalPages > 1 && (
                <Pagination
                  pagination={productResponse}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
};

export default Home;
