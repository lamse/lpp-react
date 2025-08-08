import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <div className='w-full py-3 border-b'>
          <div className='flex justify-between px-20 items-center font-semibold'>
            <div>
              <h1 className="text-2xl">LPP</h1>
            </div>
            <div className='flex xl:gap-10 md:gap-8  gap-2'>
              <a href="/">Home</a>
              {/*<a href="/product/add">Add Product</a>*/}
              {/*<form action="/logout" method="post">*/}
              {/*  <button className="font-bold" type="submit">*/}
              {/*    Logout*/}
              {/*  </button>*/}
              {/*</form>*/}
              <a href="/login">Login</a>
            </div>
            <div>
              <button id="openTechStack" className='py-2 px-6 bg-black text-white rounded-3xl font-semibold'>Tech
                Stack
              </button>
            </div>
          </div>
        </div>
        <div id="techStackModal" className="fixed z-10 inset-0 overflow-y-auto mt-4 hidden">
          <div className="flex items-center justify-end mr-52">
            <div className="bg-white w-1/2 p-6 rounded shadow-md border">
              <div className="flex justify-end mb-4">
                <button id="closeTechStack" className="text-gray-700 hover:text-red-500">
                  <span className="material-icons">close</span>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java"
                       className="w-12 h-12 mb-2"/>
                  <span className="text-gray-300">Java</span>
                </div>
                <div
                  className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring"
                       className="w-12 h-12 mb-2"/>
                  <span className="text-gray-300">Spring Data JPA</span>
                </div>
                <div
                  className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/thymeleaf/thymeleaf-original.svg"
                       alt="Thymeleaf" className="w-12 h-12 mb-2"/>
                  <span className="text-gray-300">Thymeleaf</span>
                </div>
                <div
                  className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg"
                       alt="MariaDB" className="w-12 h-12 mb-2"/>
                  <span className="text-gray-300">MariaDB</span>
                </div>
                <div
                  className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                       alt="TailwindCSS" className="w-12 h-12 mb-2"/>
                  <span className="text-gray-300">TailwindCSS</span>
                </div>
                <div
                  className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git"
                       className="w-12 h-12 mb-2"/>
                  <span className="text-gray-300">Git</span>
                </div>
                <div
                  className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" alt="jQuery"
                       className="w-12 h-12 mb-2"/>
                  <span className="text-gray-300">jQuery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">Please find the lowest price!</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

            <a href="/product/58" className="group">
              <div >

                <img src="http://localhost:8080/uploads/images/2025_08_06_701c41bc-20c1-4262-a3ab-c44d8a7fbd5c.jpg" alt="Product Image"
                     className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
              </div>
              <h3 className="mt-4 text-lg text-gray-700">Eve Wade</h3>
              <p className="mt-1 text-md font-medium text-gray-900">\840</p>
            </a><a href="/product/57" className="group">
            <div >

              <img src="http://localhost:8080/uploads/images/2025_08_06_8fb395b9-cd54-46f8-b3ba-b0bd5bbbb53a.jpg" alt="Product Image"
                   className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
            </div>
            <h3 className="mt-4 text-lg text-gray-700">Wayne Ewing</h3>
            <p className="mt-1 text-md font-medium text-gray-900">\27</p>
          </a><a href="/product/56" className="group">
            <div >

              <img src="http://localhost:8080/uploads/images/2025_08_05_3616b03d-b7cb-4f43-9292-7d9e00b4682e.jpg" alt="Product Image"
                   className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
            </div>
            <h3 className="mt-4 text-lg text-gray-700">Carol Moses</h3>
            <p className="mt-1 text-md font-medium text-gray-900">\148</p>
          </a><a href="/product/53" className="group">
            <div>

              <img src="http://localhost:8080/uploads/images/2025_08_05_8e8ef644-043b-4b78-b44f-7b53ddb56dc2.jpg" alt="Product Image"
                   className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
            </div>
            <h3 className="mt-4 text-lg text-gray-700">Sigourney Hancock</h3>
            <p className="mt-1 text-md font-medium text-gray-900">\262</p>
          </a><a href="/product/52" className="group">
            <div >

              <img src="http://localhost:8080/uploads/images/2025_08_05_525f6a9cf078471592344010581bd40c.jpg" alt="Product Image"
                   className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
            </div>
            <h3 className="mt-4 text-lg text-gray-700">Lani Fry</h3>
            <p className="mt-1 text-md font-medium text-gray-900">\866</p>
          </a><a href="/product/51" className="group">
            <div >

              <img src="http://localhost:8080/uploads/images/2025_08_05_c54db3ce-3b92-4dc4-9e5d-0566399ce263.jpg" alt="Product Image"
                   className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
            </div>
            <h3 className="mt-4 text-lg text-gray-700">Shay Conrad</h3>
            <p className="mt-1 text-md font-medium text-gray-900">\399</p>
          </a><a href="/product/50" className="group">
            <div >

              <img src="http://localhost:8080/uploads/images/2025_08_05_13ddad3f-6b8c-499a-bf89-a82aff27c2e9.jpg" alt="Product Image"
                   className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
            </div>
            <h3 className="mt-4 text-lg text-gray-700">Diana Glover</h3>
            <p className="mt-1 text-md font-medium text-gray-900">\8</p>
          </a><a href="/product/49" className="group">
            <div >

              <img src="http://localhost:8080/uploads/images/2025_08_05_03cfb96f-8267-4f0e-8449-138900d4dc9c.jpg" alt="Product Image"
                   className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"/>
            </div>
            <h3 className="mt-4 text-lg text-gray-700">Catherine Henry</h3>
            <p className="mt-1 text-md font-medium text-gray-900">\224</p>
          </a>
          </div>
          <nav aria-label="Pagination" className="flex justify-center mt-4 border-t pt-3">
            <ul className="pagination flex gap-2">
              <li className="rounded-md p-1 px-2 bg-gray-200">
                <a>↤</a>

              </li>
              <li className="rounded-md p-1 px-2 bg-gray-200">

                <a>↢</a>
              </li>

              <li className="rounded-md p-1 px-2 bg-gray-200">
                <a>1</a>

              </li>

              <li className="rounded-md p-1 px-2 bg-blue-200">

                <a href="/?page=1&amp;size=8">2</a>
              </li>

              <li className="rounded-md p-1 px-2 bg-blue-200">

                <a href="/?page=2&amp;size=8">3</a>
              </li>

              <li className="rounded-md p-1 px-2 bg-blue-200">

                <a href="/?page=3&amp;size=8">4</a>
              </li>

              <li className="rounded-md p-1 px-2 bg-blue-200">

                <a href="/?page=4&amp;size=8">5</a>
              </li>

              <li className="rounded-md p-1 px-2 bg-blue-200">
                <a href="/?page=4&amp;size=8">↣</a>

              </li>
              <li className="rounded-md p-1 px-2 bg-blue-200">

                <a href="/?page=4&amp;size=8">↦</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

    </div>
  );
}

export default App;
