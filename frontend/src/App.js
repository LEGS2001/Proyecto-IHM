import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Base from "./pages/Base";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Profile from "./pages/Profile"
import WebcamComponent from "./Components/WebcamComponent";

import './css/App.css';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
          <Base />
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/webcam' element={<WebcamComponent />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
