import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";


function App() {
  return (
      <Router>
        <div>
          <Header />
          <Routes>
            {/*<Route path="/" element={<Home />} />*/}
            {/*<Route path="/login" element={<Login />} />*/}
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
