import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './../../components/card/Card.jsx';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  // Get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get('https://blog-backend-red-two.vercel.app/api/v1/blog/all-blog', {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className='blogCard'>
      {blogs && blogs.length > 0 ? (
        blogs.map(blog => (
          blog && blog.user ? (
            <Card
              id={blog._id}
              isUser={localStorage.getItem('userId') === blog.user._id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              user={blog.user.username}
              time={blog.createdAt}
            />
          ) : Unable to fetch
        ))
      ) : (
        <h1>No blogs present till now!</h1>
      )}
    </div>
  );
};

export default Blog;
