import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import HeroImage from "./components/Home/HeroImage";
import ArticleList from "./components/Article/ArticleList";
import ArticleView from "./components/Article/ArticleView";


function App() {
  return (
      <Router>
        <div>
          <Header />


          <Routes>
              <Route path="/" element={
                  <>
                      <HeroImage />
                      <ArticleList />
                  </>
              } />
            {/*<Route path="/" element={<Home />} />*/}
              <Route path="/user/:authorId/article/:articleId" element={<ArticleView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
