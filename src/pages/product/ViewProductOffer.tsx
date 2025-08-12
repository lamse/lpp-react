import React, {useEffect, useState} from 'react';
import {ProductOffer, ProductOfferChat} from "../../interfaces/product.interface";
import Chat from '@mui/icons-material/Chat';
import ThumbUp from '@mui/icons-material/ThumbUp';
import DoneAll from '@mui/icons-material/DoneAll';
import axios from "../../api/axios";
import ProductOfferChatModal from "./ProductOfferChatModal"; // Import the modal

interface ProductOfferProps {
  productId: number;
  registrant?: boolean;
  productOffers: ProductOffer[];
  onFetchProduct: () => Promise<void>;
}

const ViewProductOffer: React.FC<ProductOfferProps> = ({productId, registrant, productOffers, onFetchProduct}) => {

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<number>(0);
  const [chats, setChats] = useState<ProductOfferChat[]>([]);

  const handleChooseOffer = async (id: number) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/product/${productId}/offer/choose/${id}`);
      await onFetchProduct();
    } catch (error) {
      console.error('Error choosing offer:', error);
    }
  };

  const handleOpenChatModal = (offerId: number) => {
    const productOfferChats: ProductOfferChat[]  = productOffers.find(offer => offer.id === offerId)?.productOfferChats || [];
    setChats(productOfferChats);
    setSelectedOfferId(offerId);
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setChats([]);
    setIsChatModalOpen(false);
    setSelectedOfferId(0);
  };

  useEffect(() => {
    if (selectedOfferId > 0) {
      handleOpenChatModal(selectedOfferId);
    }
  }, [productOffers]);

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
                <button className="openChat ml-2" type="button" onClick={() => handleOpenChatModal(productOffer.id)}>
                  <Chat/>
                </button>
              </div>
              {registrant && productOffer.choose !== 'Y' && (
                <button type="button" onClick={() => handleChooseOffer(productOffer.id)}>
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
      <ProductOfferChatModal
        chats={chats}
        isOpen={isChatModalOpen}
        onClose={handleCloseChatModal}
        offerId={selectedOfferId}
        onCommentSubmitted={onFetchProduct}
      />
    </div>
  );
};

export default ViewProductOffer;
