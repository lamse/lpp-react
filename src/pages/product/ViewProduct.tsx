import React, {useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { ApiResponse } from '../../interfaces/api-response.interface';
import {Product, ProductDetailResponse, ProductOffer} from '../../interfaces/product.interface';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ViewProductOffer from "./ViewProductOffer";
import ViewProductOfferForm from "./ViewProductOfferForm";

const ViewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [productOffers, setProductOffers] = useState<ProductOffer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get<ApiResponse<ProductDetailResponse>>(`${process.env.REACT_APP_API_URL}/product/${id}`);
      setProduct(response.data.data.product);
      setProductOffers(response.data.data.productOffers);
    } catch (err) {
      console.error('Failed to fetch product:', err);
      setError('Failed to load product details. Please try again later.');
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);


  const mainImage = useRef<HTMLImageElement>(null);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading product details...</div>;
  }


  const changeMainImage = (event: React.MouseEvent<HTMLElement>) => {
    if (mainImage?.current) {
      mainImage.current.src = event.currentTarget.getAttribute('src') ?? `${process.env.REACT_APP_URL}/images/no-image.png`;
    }
  };

  const hasImage = product.productImages && product.productImages.length > 0;

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                ref={mainImage}
                src={hasImage ? `${process.env.REACT_APP_URL}/uploads/images/${product.productImages[0].storeName}` : `${process.env.REACT_APP_URL}/images/no-image.png`}
                alt={hasImage ? product.name : 'Not Available'}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.productImages && product.productImages.length > 0 && product.productImages.map((productImage) => (
                <img
                  key={productImage.id}
                  src={`${process.env.REACT_APP_URL}/uploads/images/${productImage.storeName}`}
                  alt={productImage.uploadName}
                  className="w-20 h-20 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onMouseOver={(e) => changeMainImage(e)}
                />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <div className="flex items-center">
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <a href={product.url} className="text-3xl ml-1 flex items-center" rel="noopener noreferrer"
                 target="_blank">
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
              <ViewProductOffer productOffers={productOffers} registrant={product.registrant}/>
              <ViewProductOfferForm productId={product.id} onOfferSubmitted={fetchProduct}/>
            </div>
        </div>
      </div>
    </div>
  );
};

      export default ViewProduct;
