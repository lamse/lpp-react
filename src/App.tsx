import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AddProduct from './pages/product/AddProduct';
import Home from './pages/Home';
import Gnb from "./pages/Gnb";

function App() {
  return (
    <div className="App">
      <Gnb/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/add" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
