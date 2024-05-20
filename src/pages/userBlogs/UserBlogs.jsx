
import React from 'react'
import { useState ,useEffect} from "react"
import axios from 'axios';
import Card from './../../components/card/Card.jsx';
import './UserBlog.css'

const UserBlogs = () => {
  const [blogs,setBlogs]=useState([]);

  //get user blogs
  const getuserBlogs=async()=>{
    try {
      const id=localStorage.getItem('userId')
      const {data}=await axios.get(`https://blog-backend-red-two.vercel.app/api/v1/blog/user-blog/${id}`,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      });

      if(data?.success){
        setBlogs(data?.userBlog.blogs)
        
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getuserBlogs();
    
  },[])
   
  return (
    <div className='blogCard'>
      {blogs&& blogs.length>0?(blogs.map(blog=>(
      <Card
        id ={blog._id}
        isUser={true}
        title={blog.title}
        description={blog.description}
        image={blog.image}
        user={blog.user.username}
        time={blog.createdAt}
      />
    ))):(<h1>You have not created blogs yet</h1>) }
    </div>
  )
}

export default UserBlogs
