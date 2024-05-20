import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { authActions } from '../../redux/store/store.jsx'
import './Header.css'

import toast from 'react-hot-toast';


const Header = () => {
 const dispatch=useDispatch();
 const navigate=useNavigate();
 // global state
 let isLogin=useSelector(state=>state.isLogin)
 
 const handleOnLogout=()=>{
  try {
    dispatch(authActions.logout())
    navigate('/login');
    toast.success("Log-Out successfully")
  } catch (error) {
    console.log(error)
  }
 }
 
  return (
    <>
     <div className="header sticky-top">
     <nav className="navbar navbar-expand-lg  container primary ">
  <div className="container">
    <a className="navbar-brand" href="#"><img src="../../images/logo.svg" alt="logo image" /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {isLogin&&<>
      <ul className=" navbar-nav ms-auto mb-2 mb-lg-0 ">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={"/"}  >All Blogs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/user-blog"}>My Blogs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/create-blog"}>Create Blog</Link>
        </li>
       
      </ul>
    </>}

      <ul className=" navbar-nav ms-auto mb-2 mb-lg-0 ">
        
        {!isLogin&&<>
          <li className="nav-item">
          <Link className="nav-link" to={"/register"}>Register</Link>
        </li>
          <li className="nav-item">
          <Link className="nav-link" to={"/login"}>Login</Link>
        </li>
        </>}
        
        {isLogin&&<>
          
          <li className="nav-item">
          <a className="nav-link" style={{cursor:'pointer'}}  onClick={handleOnLogout}>Log-Out</a>
        </li>
        </>}
        
       
      </ul>
      
    </div>
  </div>
</nav>
     </div>

      
    </>
  )
}

export default Header
