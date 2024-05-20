
import {React, useState } from 'react';
import './Login.css'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { authActions } from './../../redux/store/store';
import toast from 'react-hot-toast';
const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  //state
  const [input,setInput]=useState({
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
      const {data}= await axios.post('https://blog-backend-red-two.vercel.app/api/v1/user/login',{email:input.email,password:input.password},{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      
      console.log(data)
      if(data?.success){
        localStorage.setItem('userId',data?.user._id);
        dispatch(authActions.login())
        navigate('/');
        toast.success("user login successfully")

      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <div className="mb-3 mt-4">
        <center><h1>Login Form</h1></center>
      </div>
      <div className="container mt-5 ">
     <form className='rjform' onSubmit={handleSubmit}  >
     
  <div className="mb-3">
  
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your Email' name="email" onChange={handleOnChange} autoComplete='email' />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your password' name="password" onChange={handleOnChange} autoComplete='password' />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <div className="mt-3">
    <Link to={"/register"}>Already registered ? Please Register!</Link>
  </div>
</form>

     </div>
    </>
  )
}

export default Login
