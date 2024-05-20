
import React,{useState} from 'react'
import './CreateBlog.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast  from 'react-hot-toast';
const CreateBlog = () => {
  const [input,setInput]=useState({
    title:'',
    description:'',
    image:''

  });
  const navigate=useNavigate();

  const userId=localStorage.getItem('userId')
  //form
  const handleSubmit=async(e)=>{
     e.preventDefault();
     try {
      const {data}=await axios.post('https://blog-backend-red-two.vercel.app/api/v1/blog/create-blog',{
        title:input.title,
        description:input.description,
        image:input.image,
        user:userId
      } ,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      });

      if(data?.success){
         toast.success("Blog created");
         
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
    <center><h1>Create Your Own blog</h1></center>
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
 
  <center><button type="submit" className="btn btn-success">Submit</button></center>
</form>
    </div>

    </>
  )
}

export default CreateBlog
