import React from 'react';
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import axios from "../../api/axios";
import {ApiResponse} from "../../interfaces/api-response.interface";
import {ProductOffer} from "../../interfaces/product.interface";

interface JoinForm {
  email: string;
  name: string;
  password: string;
}

const JoinForm: React.FC = () => {

  const initialValues: JoinForm = {
    email: '',
    name: '',
    password: '',
  };

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
    name: yup.string().required('Name is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values: JoinForm, { setSubmitting, setErrors, resetForm }: FormikHelpers<JoinForm>) => {
    console.log(values);
    try {
      const response = await axios.post<ApiResponse<ProductOffer>>(`${process.env.REACT_APP_API_URL}/join`, values);
      const apiResponse: ApiResponse<ProductOffer> = response.data;
      resetForm();
      console.log(apiResponse);
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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-6">
              {(errors as { global?: string }).global && (
                <div className="text-red-500 text-xs mt-1">{(errors as { global?: string }).global}</div>
              )}
              <div>
                <label htmlFor="email" className="block text-md font-medium text-gray-900 text-left">Email address</label>
                <div className="mt-2">
                  <Field id="email" type="email" name="email" required
                         className="block w-full rounded-md px-3 py-1.5 border border-gray-300"/>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
    
              <div>
                <label htmlFor="name" className="block text-md font-medium text-gray-900 text-left">Name</label>
                <div className="mt-2">
                  <Field id="name" type="text" name="name" required
                         className="block w-full rounded-md px-3 py-1.5 border border-gray-300"/>
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
    
              <div>
                <label htmlFor="password" className="block text-md text-left font-medium text-gray-900">Password</label>
                <div className="mt-2">
                  <Field id="password" type="password" name="password" required
                         className="block w-full rounded-md px-3 py-1.5 border border-gray-300"/>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
    
              <div className="flex items-center justify-between gap-2">
                <a className="border border-gray-300 rounded-md w-full px-3 py-1" href="/lpp-react/">Cancel</a>
                <button type="submit" disabled={isSubmitting}
                        className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white">Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default JoinForm;