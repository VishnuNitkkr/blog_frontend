import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Header from './components/header/Header';
import {Routes,Route} from'react-router-dom'
import Blog from './pages/blogs/Blog';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import UserBlogs from './pages/userBlogs/UserBlogs';
import CreateBlog from './pages/createBlog/CreateBlog';
import UpdateBlog from './pages/blogUpdate/UpdateBlog';

import { Toaster } from 'react-hot-toast';

function App() {
 

  return (
    <>
      <Header />
      <Toaster/>
    <Routes>
      <Route path="/" element={<Blog/>} />
      <Route path="/user-blog" element={<UserBlogs/>} />
      <Route path="/create-blog" element={<CreateBlog/>} />
      <Route path="/update-blog/:id" element={<
        UpdateBlog
      />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    
    
      
    </>
  )
}

export default App
