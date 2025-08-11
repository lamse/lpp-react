import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { Product } from '../../interfaces/product.interface';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ViewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ApiResponse<Product>>(`${process.env.REACT_APP_API_URL}/product/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product details. Please try again later.');
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8">
              {product.productImages && product.productImages.length > 0 ? (
                <img
                  src={`${process.env.REACT_APP_URL}/uploads/images/${product.productImages[0].storeName}`}
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_URL}/images/no-image.png`}
                  alt="Not Available"
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              )}
            </div>

            <div className="w-full md:w-1/2 px-4">
              <div className="flex items-center">
                <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                <a href={product.url} className="text-3xl ml-1 flex items-center" rel="noopener noreferrer" target="_blank">
                  <OpenInNewIcon/>
                </a>
              </div>
              <p className="text-left">Model No: <span className="text-gray-600">{product.modelNo}</span></p>
              <p className="text-left">Registrant: <span className="text-gray-600">{product.user.name}</span></p>
              <p className="mb-4 text-left">Registration date: <span className="text-gray-600 text-sm">{product.createdAt}</span>
              </p>
              <div className="mb-4 text-left">
                <span className="text-2xl font-bold mr-2">\{product.price}</span>
              </div>

              <p className="text-gray-700 mb-6 text-left">{product.description}</p>

            </div>
        </div>
      </div>
    </div>
  );
};

      export default ViewProduct;
