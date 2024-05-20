import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams ,useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
const UpdateBlog = () => {
  const [blog,setBlog]=useState({});
  const id=useParams().id;
  const navigate=useNavigate();
  const [input,setInput]=useState({});

  // get blog
  const getBlogdetails=async()=>{
    try {
      const {data}=await axios.get(`https://blog-backend-red-two.vercel.app/api/v1/blog/get-blog/${id}`)

      if(data?.success){
        setBlog(data?.blog)
        setInput({
          title:data.blog.title,
          description:data.blog.description,
          image:data.blog.image
        })
      }


    } catch (error) {
      console.log(error)
    }
  } 

  useEffect(()=>{
    getBlogdetails();
  },[id])

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
     const {data}=await axios.put(`https://blog-backend-red-two.vercel.app/api/v1/blog/update-blog/${id}`,{
       title:input.title,
       description:input.description,
       image:input.image,
       user:id
     });

     if(data?.success){
        toast.success("Blog updated");
        navigate('/user-blog')
     }
    } catch (error) {
     console.log(error)
    }
 }

 //onchange
 const handleOnchange=(e)=>{
    setInput(prevState=>({
     ...prevState,
     [e.target.name]:e.target.value,
    }));
 };


  return (
    <>
     <div className="cbContainer">
    <center><h1>Update Your blog</h1></center>
    <hr />
    <form onSubmit={handleSubmit} >
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title:</label>
    <input type="text" className="form-control" 
    id='exampleInputEmail1' name='title' value={input.title} onChange={handleOnchange} required />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputDescription1" className="form-label">Description:</label>
    <input type="text" className="form-control" 
    id='exampleInputDescription1' name='description' value={input.description} onChange={handleOnchange} required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputImage1" className="form-label">Image URL:</label>
    <input type="text" className="form-control" 
    id='exampleInputImage1' name='image' value={input.image} onChange={handleOnchange} required />
  </div>
 
  <center><button type="submit" className="btn btn-warning">Update</button></center>
</form>
    </div>
      
    </>
  )
}

export default UpdateBlog
