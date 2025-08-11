import React from 'react';
import {FormikHelpers, Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import axios from '../../api/axios';
import { ApiResponse } from '../../interfaces/api-response.interface';
import {ProductOffer} from "../../interfaces/product.interface";

interface ProductOfferForm {
  price: number;
  url: string;
}

interface ViewProductOfferFormProps {
  productId: number;
  onOfferSubmitted: () => Promise<void>;
}


const ViewProductOfferForm: React.FC<ViewProductOfferFormProps> = ({ productId, onOfferSubmitted }) => {

  const initialValues: ProductOfferForm = {
    price: 0,
    url: '',
  };

  const validationSchema = yup.object({
    price: yup
      .number()
      .required('Offer price is required')
      .integer('Offer price must be an integer'),
    url: yup.string().url().required('Offer URL is required'),
  });

  const handleSubmit = async (values: ProductOfferForm, { setSubmitting, setErrors, resetForm }: FormikHelpers<ProductOfferForm>) => {
    try {
      const response = await axios.post<ApiResponse<ProductOffer>>(`${process.env.REACT_APP_API_URL}/product/${productId}/offer`, values);
      const apiResponse: ApiResponse<ProductOffer> = response.data;
      resetForm();
      console.log(apiResponse);
      await onOfferSubmitted();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiResponse = error.response.data as ApiResponse<null>;
        if (apiResponse && apiResponse.errors) {
          setErrors(apiResponse.errors);
        }
      } else {
        console.error('There was an error!', error);
        alert('An unexpected error occurred!');
      }
    } finally {
      setSubmitting(false);
    }

  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-left">New offer at a lower price</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
          {(errors as { global?: string }).global && (
            <div className="text-red-500 text-xs mt-1">{(errors as { global?: string }).global}</div>
          )}

        <div className="mb-4">
          <label htmlFor="url" className="block text-gray-700 text-sm font-bold mb-2 text-left">
            URL
          </label>
          <Field
            id="url"
            name="url"
            type="url"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ErrorMessage name="url" component="div" className="text-red-500 text-xs mt-1" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2 text-left">
            Price
          </label>
          <Field
            id="price"
            name="price"
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1" />
        </div>

        <button
          type="submit" disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Offer
        </button>
      </Form>
        )}
      </Formik>
    </div>
  );
};

export default ViewProductOfferForm;