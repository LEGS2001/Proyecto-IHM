import React, { useState, useMemo } from "react";
import './css/App.css';
import Base from "./pages/Base";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { UserContext } from "./utils/UserContext";
import Index from "./pages/Index";

function App() {

  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <BrowserRouter>
          <Base />
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>





    </div>
  );
}

export default App;
