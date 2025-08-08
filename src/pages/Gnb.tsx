import React from 'react';
import {Link} from "react-router-dom";
import TechStackModal from "./TechStackModal";

const Gnb = () => {
  return (
    <nav>
      <div className='w-full py-3 border-b'>
        <div className='flex justify-between px-20 items-center font-semibold'>
          <div>
            <h1 className="text-2xl">LPP</h1>
          </div>
          <div className='flex xl:gap-10 md:gap-8  gap-2'>
            <Link to="/">Home</Link>
            <Link to="/product/add">Add Product</Link>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <button id="openTechStack" className='py-2 px-6 bg-black text-white rounded-3xl font-semibold'>Tech
              Stack
            </button>
          </div>
        </div>
      </div>
      <TechStackModal/>
    </nav>
  );
};

export default Gnb;
