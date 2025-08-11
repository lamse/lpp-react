import React from 'react';
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import withAuth from '../../components/withAuth';
import {ProductForm} from "../../interfaces/product.interface";

const AddProduct: React.FC = () => {
  const initialValues: ProductForm = {
    name: '',
    modelNo: '',
    url: '',
    price: 0,
    description: '',
    imageFiles: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter the product name.'),
    modelNo: Yup.string(),
    url: Yup.string().url('Invalid URL').required('Please enter the URL.'),
    price: Yup.number().required('Please enter the price.'),
    description: Yup.string(),
    imageFiles: Yup.array().min(1, 'At least one image is required'),
  });

  const handleSubmit = async (values: ProductForm, { setSubmitting }: FormikHelpers<ProductForm>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('modelNo', values.modelNo);
    formData.append('url', values.url);
    formData.append('price', values.price.toString());
    formData.append('description', values.description);
    values.imageFiles.forEach((file) => {
      formData.append('imageFiles', file);
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/product/add`, formData);
      alert('Product added successfully!');
    } catch (error) {
      console.error('There was an error!', error);
      alert('An unexpected error occurred!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center p-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Please find the lowest price!</h2>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-1">
              <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 text-left">Name</label>
                <div className="mt-2">
                  <Field id="name" type="text" name="name" required
                         className="block w-full rounded-md px-3 py-1.5 border border-gray-300"/>
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1 text-left" />
                </div>
              </div>

              <div>
                <label htmlFor="modelNo" className="block text-sm/6 font-medium text-gray-900 text-left">Model No.</label>
                <div className="mt-2">
                  <Field id="modelNo" type="text" name="modelNo"
                         required autoComplete="modelNo"
                         className="block w-full rounded-md px-3 py-1.5 border border-gray-300"/>
                  <ErrorMessage name="modelNo" component="div" className="text-red-500 text-xs mt-1 text-left" />
                </div>
              </div>

              <div>
                <label htmlFor="url" className="block text-sm/6 font-medium text-gray-900 text-left">URL</label>
                <div className="mt-2">
                  <Field id="url" type="url" name="url"
                         required autoComplete="url"
                         className="block w-full rounded-md px-3 py-1.5 border border-gray-300"/>
                  <ErrorMessage name="url" component="div" className="text-red-500 text-xs mt-1 text-left" />
                </div>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900 text-left">Price</label>
                <div className="mt-2">
                  <Field id="price" type="number" name="price"
                         required autoComplete="price"
                         className="block w-full rounded-md px-3 py-1.5 border border-gray-300"/>
                  <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1 text-left" />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900 text-left">Description</label>
                <div className="mt-2">
                  <Field as="textarea" id="description" name="description"
                         required autoComplete="description"
                         className="block w-full rounded-md px-3 py-1.5 border border-gray-300 h-28"/>
                  <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1 text-left" />
                </div>
              </div>

              <div>
                <label htmlFor="imageFiles" className="block text-sm/6 font-medium text-gray-900 text-left">Image</label>
                <div className="mt-2">
                  <input id="imageFiles" multiple type="file" name="imageFiles" required
                         onChange={(event) => {
                           if (event.currentTarget.files) {
                             setFieldValue("imageFiles", Array.from(event.currentTarget.files));
                           }
                         }}/>
                  <ErrorMessage name="imageFiles" component="div" className="text-red-500 text-xs mt-1 text-left" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <a className="border border-gray-300 rounded-md w-full px-3 py-1 text-center" href="/">Cancel</a>
                <button type="submit" disabled={isSubmitting} className="w-full text-center rounded-md bg-indigo-600 px-3 py-1.5 text-white">Add
                  Product
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};


export default withAuth(AddProduct);
