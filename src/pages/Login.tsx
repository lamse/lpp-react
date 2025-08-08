import React from 'react';

const Login = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="/login" method="post" className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 justify-between">Email address</label>
            </div>
            <div className="mt-2">
              <input id="email" type="email" name="email"
                     required autoComplete="email"
                     className="block w-full rounded-md px-3 py-1.5 border border-gray-300"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
            </div>
            <div className="mt-2">
              <input id="password" type="password" name="password"
                     required autoComplete="current-password"
                     className="block w-full rounded-md bg-white px-3 py-1.5 border border-gray-300"/>
            </div>
          </div>

          <div>
            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white"
                    type="submit">
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <a href="/join"
             className="font-semibold text-indigo-600 hover:text-indigo-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
