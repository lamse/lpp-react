import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import TechStackModal from "./TechStackModal";
import useAuthStore from "../store/auth";
import axios from "../api/axios";

const Gnb = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const [isTechStackModalOpen, setIsTechStackModalOpen] = useState(false);

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
          <div className="flex items-center rounded-full py-1 px-4 font-medium border bg-white border-gray-300">
            <span className="font-extrabold">LPP</span>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                 alt="React version" className="w-5 ml-2"/>
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
          <div className="flex gap-2">
            <a href={process.env.REACT_APP_URL} target="_blank" rel="noopener noreferrer">
              <div className="flex rounded-full py-2 px-4 font-medium border bg-white border-gray-300">
                <span className="font-extrabold">Spring</span>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring"
                     className="w-5 ml-3"/>
              </div>
            </a>
            <div>
              <button id="openTechStack"
                className='py-2 px-6 bg-black text-white rounded-3xl font-semibold cursor-pointer'
                onMouseOver={() => setIsTechStackModalOpen(true)}>Tech Stack</button>
            </div>

          </div>
        </div>
      </div>
      <TechStackModal
        isOpen={isTechStackModalOpen}
        onClose={() => setIsTechStackModalOpen(false)}
      />
    </nav>
  );
};

export default Gnb;
