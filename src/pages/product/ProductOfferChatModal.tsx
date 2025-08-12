import React, { useState } from 'react';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import {ProductOfferChat} from "../../interfaces/product.interface";
import useAuthStore from "../../store/auth";
import axios from "../../api/axios";
import Alert from '@mui/material/Alert';
import {ApiResponse} from "../../interfaces/api-response.interface";

interface ProductOfferChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerId: number;
  chats: ProductOfferChat[];
  onCommentSubmitted: () => void;
}

const ProductOfferChatModal: React.FC<ProductOfferChatModalProps> = ({ isOpen, onClose, offerId, chats, onCommentSubmitted }) => {
  const { loggedInUserId } = useAuthStore();
  const [comment, setComment] = useState('');

  const [commentErrorMessage, setCommentErrorMessage] = React.useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setCommentErrorMessage('Comment cannot be empty');
      setTimeout(() => {
        setCommentErrorMessage('');
      }, 3000);
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/product/offer/chat/${offerId}`, {comment});
      setComment('');
      setCommentErrorMessage('');
      onCommentSubmitted();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiResponse = error.response.data as ApiResponse<null>;
        if (apiResponse && apiResponse.errors) {
          setCommentErrorMessage(apiResponse.errors['global']);
          setTimeout(() => {
            setCommentErrorMessage('');
          }, 3000);
        }
      } else {
        setCommentErrorMessage('An unexpected error occurred. Please try again later.');
        setTimeout(() => {
          setCommentErrorMessage('');
        }, 3000);
      }
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-11/12 sm:w-1/2 max-w-7xl p-6">
          <div className="flex justify-end mb-4">
            <button onClick={onClose} className="text-gray-700 hover:text-red-500">
              <Close/>
            </button>
          </div>
          <div id="chatList" className="bg-white rounded-lg border p-2 my-4 mx-6">
            <h3 className="font-bold text-center">Discussion</h3>
            <div className="flex flex-col">
              {chats.map((chat) => (
                <div key={chat.id} className="border rounded-md p-3 ml-3 my-3">
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3">
                      <h3 className="font-bold">
                        {chat.user.name}
                      </h3>
                      <div className="text-gray-500 text-sm">
                        {chat.createdAt.substring(0, 16)}
                      </div>
                    </div>

                    {loggedInUserId === chat.user.id && (
                      <button className="text-gray-500 hover:text-red-500">
                        <Delete/>
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2 text-left">
                    {chat.comment}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full pl-3 my-2">
              <label>
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  name="comment" placeholder='Type Your Comment' required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </label>
            </div>

            <div className="w-full flex justify-between px-3 h-12">
              {commentErrorMessage !== '' ?
                <Alert severity="error">{commentErrorMessage}</Alert>
                : <div/>
              }
              <button onClick={handleSubmit} className="px-2.5 py-1.5 h-10 rounded-md text-white text-sm bg-indigo-500">Post Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOfferChatModal;