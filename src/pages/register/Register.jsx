import {React, useState } from 'react';

import './Register.css'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';

const Register = () => {
  const navigate=useNavigate();
  //state
  const [input,setInput]=useState({
    name:'',
    email:'',
    password:''
  })

  const handleOnChange=(e)=>{
    setInput((prevState)=>({
         ...prevState,
         [e.target.name]:e.target.value
         

    }))
  };
  //submit

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const {data}= await axios.post('https://blog-backend-red-two.vercel.app/api/v1/user/register',{username:input.name,email:input.email,password:input.password},{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(data?.success){
        
        navigate('/login');
        toast.success("user registered successfully")

      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="mb-3 mt-4">
        <center><h1>Registration Form</h1></center>
      </div>
      <div className="container mt-5 ">
      
     <form className='rjform' onSubmit={handleSubmit}  >
     
     <div className="mb-3">
     <label htmlFor="exampleInputName1" className="form-label">Name 
  </label>
  <input type="text" className="form-control" id="exampleInputName1" placeholder='Enter your name' name="name" value={input.name}
  onChange={handleOnChange} autoComplete='username' required/>
     </div>
  <div className="mb-3">
  
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your Email' name="email" value={input.email} onChange={handleOnChange} autoComplete='email' required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your password' name="password" value={input.password} onChange={handleOnChange} autoComplete='password' required/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <div className="mt-3">
    <Link to={"/login"}>Already have an account ? Please Login</Link>
  </div>
</form>

     </div>
    </>
  )
}

export default Register
