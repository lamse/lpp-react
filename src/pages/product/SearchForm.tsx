import React from 'react';
import {ProductSearchForm} from "../../interfaces/product.interface";
import * as yup from "yup";
import {Field, Form, Formik} from "formik";
import Search from '@mui/icons-material/Search';

interface SearchFormProps {
  handleSearch: (values: ProductSearchForm) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({handleSearch}) => {

  const initialValues: ProductSearchForm = {
    page: 0,
    minPrice: '',
    maxPrice: '',
    query: '',
  };

  const validationSchema = yup.object({
    minPrice: yup.string().matches(/^[0-9]+$/, "Must be only digits"),
    maxPrice: yup.string().matches(/^[0-9]+$/, "Must be only digits"),
    query: yup.string(),
  });

  const handleSubmit = (values: ProductSearchForm) => {
    handleSearch(values);
  }
  return (
    <div className="mt-4 mx-2">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({errors}) => (
          <Form className="mb-8">
            <div className="p-4 text-gray-600 dark:text-gray-300 outline-none focus:outline-none">
              <div className="relative flex items-center w-full lg:w-1/2 mx-auto">
                <label
                  className="w-36 bg-white h-10 flex pl-4 pr-1 rounded-l-full text-sm focus:outline-none outline-none border-2 border-r-0 border-gray-500">
                  <Field type="number" id="minPrice" name="minPrice" placeholder="Min Price"
                         className="w-full outline-none"/>
                </label>
                <span className="border-t-2 border-b-2 h-10 border-gray-500">_</span>
                <label
                  className="w-36 bg-white h-10 flex px-1 text-sm focus:outline-none outline-none border-2 border-l-0  border-gray-500">
                  <Field type="number" id="maxPrice" name="maxPrice" placeholder="Max Price"
                         className="w-full outline-none"/>
                </label>
                <label
                  className="w-full bg-white h-10 flex px-5 rounded-r-full text-sm focus:outline-none border-2 border-l-0 border-gray-500">
                  <Field
                    type="search"
                    name="query"
                    placeholder="Search"
                    className={`w-full outline-none mr-3 ${errors.query ? 'bg-red-100' : ''}`}
                    title={errors.query ?? ''}
                    autoFocus/>
                </label>
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-2">
                  <Search/>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;