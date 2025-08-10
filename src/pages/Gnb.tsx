import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import TechStackModal from "./TechStackModal";
import useAuthStore from "../store/auth";
import axios from "axios";

const Gnb = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`);
      logout();
      navigate('/lpp-react');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav>
      <div className='w-full py-3 border-b'>
        <div className='flex justify-between px-20 items-center font-semibold'>
          <div>
            <h1 className="text-2xl">LPP</h1>
          </div>
          <div className='flex xl:gap-10 md:gap-8  gap-2'>
            <Link to="/lpp-react/">Home</Link>
            {isLoggedIn ? (
              <>
                <Link to="/lpp-react/product/add">Add Product</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/lpp-react/login">Login</Link>
            )}
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
