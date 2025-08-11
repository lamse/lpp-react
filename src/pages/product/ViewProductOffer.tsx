import React from 'react';
import {ProductOffer} from "../../interfaces/product.interface";
import Chat from '@mui/icons-material/Chat';
import ThumbUp from '@mui/icons-material/ThumbUp';
import DoneAll from '@mui/icons-material/DoneAll';

interface ProductOfferProps {
  registrant?: boolean;
  productOffers: ProductOffer[];
}

const ViewProductOffer: React.FC<ProductOfferProps> = ({registrant, productOffers}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-left">offering lower prices</h3>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md mx-auto mt-2">
        {productOffers?.map((productOffer) => (
        <li key={productOffer.id}>
          <div className="px-2 py-2 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">\{productOffer.price}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                <a href={productOffer.url} target="_blank" rel="noreferrer">{productOffer.url}</a>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium flex">
                <div>Offerer:
                  <span className="text-gray-500">{productOffer.user.name}</span> |
                  <span className="text-gray-600 text-sm pl-1">{productOffer.createdAt.substring(0, 16)}</span>
                </div>
                <button className="openChat ml-2" data-id="${productOffer.id}" type="button">
                  <Chat/>
                </button>
              </div>
              {registrant && productOffer.choose !== 'Y' && (
                <button type="submit">
                  <ThumbUp className="text-blue-500 hover:text-blue-600"/>
                </button>
              )}

              {productOffer.choose === 'Y' &&
                <DoneAll className="text-green-600"/>
              }
            </div>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewProductOffer;
