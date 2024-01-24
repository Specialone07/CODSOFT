
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/header/navbar';
import './App.css';
import Home from './pages/Home';
import Footer from './component/footer/footer';
import Signup from './pages/signup';
import Login from './pages/login';
import Blogs from './pages/Blogs';
import AddBlog from './pages/AddBlog';
import UserBlogs from './pages/userBlog';
import { useSelector, useDispatch } from 'react-redux';
import BlogDetail from './pages/blogDetail';
import SingleBlog from './pages/SingleBlog';

import store, { authActions } from './store'; 

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="app">
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myblogs" element={<UserBlogs />} />
              <Route path="/myblogs/:id" element={<BlogDetail />} />
              <Route path="/blogs/:id" element={<SingleBlog />} />
            </>
          )}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
