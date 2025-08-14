import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AddProduct from './pages/product/AddProduct';
import Home from './pages/Home';
import Gnb from "./pages/Gnb";
import ViewProduct from './pages/product/ViewProduct';
import JoinForm from "./pages/user/JoinForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Gnb/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/lpp-react" />} />
        <Route path="/lpp-react" element={<Home />} />
        <Route path="/lpp-react/login" element={<Login />} />
        <Route path="/lpp-react/join" element={<JoinForm/>} />
        <Route path="/lpp-react/product/add" element={<AddProduct />} />
        <Route path="/lpp-react/product/:id" element={<ViewProduct />} />
      </Routes>
    </div>
  );
}

export default App;
