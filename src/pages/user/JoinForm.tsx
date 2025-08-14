import React from 'react';
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import axios from "../../api/axios";
import {ApiResponse} from "../../interfaces/api-response.interface";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../store/auth";
import {User} from "../../interfaces/user.interface";
import {toast} from "react-toastify";

interface JoinRequest {
  email: string;
  name: string;
  password: string;
}

const JoinForm: React.FC = () => {

  const initialValues: JoinRequest = {
    email: '',
    name: '',
    password: '',
  };

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
    name: yup.string().required('Name is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });


  const { login } = useAuthStore();
  const navigate = useNavigate();
  const handleSubmit = async (values: JoinRequest, { setSubmitting, setErrors, resetForm }: FormikHelpers<JoinRequest>) => {
    await toast.promise(
      axios.post<ApiResponse<User>>(`${process.env.REACT_APP_API_URL}/join`, values),
      {
        pending: 'Processing membership registration...',
        success: {
          render({data}){
            const apiResponse: ApiResponse<User> = data.data;
            resetForm();
            login(apiResponse.data.id);
            navigate('/lpp-react');
            return 'Your membership registration has been completed.';
          }
        },
        error: {
          render({data}){
            let errorMessage = 'An error occurred while registering.';
            if (axios.isAxiosError(data) && data.response) {
              const apiResponse = data.response.data as ApiResponse<null>;
              if (apiResponse && apiResponse.errors) {
                errorMessage = (apiResponse.errors as { global?: string }).global ?? errorMessage;
                setErrors(apiResponse.errors);
              }
            } else {
              console.error('There was an error!', data);
            }
            return errorMessage;
          }
        }
      }
    ).finally(() => setSubmitting(false));
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