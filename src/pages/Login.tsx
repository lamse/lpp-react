import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';
import useAuthStore from '../store/auth';
import {LoginForm, User} from "../interfaces/user.interface";
import {ApiResponse} from "../interfaces/api-response.interface";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/lpp-react');
    }
  }, [isLoggedIn, navigate]);

  const initialValues: LoginForm = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Please enter your email address.'),
    password: Yup.string().required('Please enter your password.'),
  });

  const handleSubmit = async (values: LoginForm, { setSubmitting, setErrors }: FormikHelpers<LoginForm>) => {
    try {
      const response = await axios.post<ApiResponse<User>>(`${process.env.REACT_APP_API_URL}/login`, values);
      const apiResponse: ApiResponse<User> = response.data;
      console.log(apiResponse);
      login(apiResponse.data.id);
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
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
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
                <div className="flex items-center justify-between">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 justify-between">Email address</label>
                </div>
                <div className="mt-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full rounded-md px-3 py-1.5 border border-gray-300"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                </div>
                <div className="mt-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 border border-gray-300"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              <div>
                <button type="submit" disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white disabled:bg-indigo-400">
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <a href="/join" className="font-semibold text-indigo-600 hover:text-indigo-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;