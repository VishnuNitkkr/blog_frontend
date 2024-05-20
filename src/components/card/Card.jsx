import React from 'react'

import './Card.css'

import moment  from 'moment'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
const Card = ({id,isUser,title,description,image,user,time}) => {
  const navigate=useNavigate();
  const handleUpdate=()=>{
    navigate(`/update-blog/${id}`)
  }

  const handleDelete=async()=>{
     try {
       const {data}= await axios.delete(`https://blog-backend-red-two.vercel.app/api/v1/blog/delete-blog/${id}`,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
       if(data?.success){
        toast.success("blog deleted");
        navigate('/user-blog')
       }
     } catch (error) {
      console.log(error)
     }
  }
  
  return (
    <>
     <div className='cards'>
     
     <div className="card mt-3 " style={{width: '18rem'}}>
     <div className="user">
     <p className='username'>{user}</p>
      <p>{moment(time).format("Do MM YYYY")}</p>
     </div>
     <hr />
   
  <img src={image} className="card-img-top" alt="Blog Image" />
  <div className="card-body">
    <h5 className="card-title"><span className='text'>Tilte</span>:{title} </h5>
    <p className="card-text"><span className='text'>Description</span>:{description} </p>
    
  </div>
  {isUser&&(<div>
  <hr />
  <div className=" btns">
    
    <button className='btn btn-primary' onClick={handleUpdate} >Update</button>
    <button className='btn btn-danger' onClick={handleDelete} >Delete</button>
  </div>
  </div>)}
</div>


     </div>

    </>
  )
}

export default Card
