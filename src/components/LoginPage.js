import React, { useContext, useEffect, useRef, useState } from "react";

import { Link} from "react-router-dom";
import axios from "axios";
import CartItem from '../components/CartItem'


import '../../src/styles.css'
import {LoginContext} from "../context/LoginContext";
import { CartContext } from "../context/CartContext";





const LoginPage = () => {

  
  // React States
  const {cart} = useContext(CartContext)

  const {login, setLogin, currentUser, setCurrentUser,forceRender} = useContext(LoginContext)
  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [renderCount, setRenderCount] = useState(['empty'])
  let cartFetchData = []

  let cartFetchJSON = {
    "username":currentUser.username,
  }
  // 'http://localhost:8000/cart'
  useEffect(()=>{
    axios.post('https://check-versel-85ez8xbdo-pengefour1.vercel.app/cart',cartFetchJSON).then((data)=>{
      
      cartFetchData=data.data.cart;
      console.log(cartFetchData);
      setRenderCount(cartFetchData);
    });
  },[forceRender])
  
 
  


  const handleSubmit = async (event) => {
 
    event.preventDefault();
    

    var username = document.getElementById('username').value;
    
    var password = document.getElementById('password').value;
   
    const sendThisJSON = {
      "username":username,
      "password":password
    }
    console.log(sendThisJSON)
    var waitForData=false;
    
    // "http://localhost:8000/signin"

    let newData = await axios.post('https://check-versel-85ez8xbdo-pengefour1.vercel.app/signin',sendThisJSON)
    .then((data)=>{
      waitForData=data.data;
      if(waitForData.result==="verified"){
        console.log("authenticated?",waitForData.result);
        setLogin(true);
        setSignIn(false);
        setCurrentUser(waitForData.info);
        console.log("the current user is :",waitForData.info.username);
        

      }else{
        // setLogin(false);
        // setSignIn(false);
      }
      
   
    
    });



    if(newData){
      console.log('newdata is true')
      // setIsSubmitted(true);
      

    }
    
  }

  const handleRegister = async (event) => {
 
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('name').value;
    var number = document.getElementById('number').value;
    var address = document.getElementById('address').value;
    
    // "http://localhost:8000/signup"

    let newData = await axios.post('https://check-versel-85ez8xbdo-pengefour1.vercel.app/signup',
    {
      username:username,
      password:password,
      name:name,
      number:number,
      address:address
    }
    ).then(()=>{
      console.log('registered');
      setLogin(false);
      setSignUp(false);
      setSignIn(true);
    })

    if(newData){
      
      console.log(newData);
      
      

    }
    
  }

  

  // JSX code for login form
  const renderForm = (
    <div className="form flex flex-col">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="input-container">
          <label>Username </label>
          <input type="text" id="username" name="uname" required />
          
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" id="password" name="pass" required />
       
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        
      </form>
      <button className="cursor-pointer flex justify-center" onClick={()=>
        {setSignUp(true);
        setSignIn(false)}
        }
        >
          register new user
      </button>
    </div>
  );

  const renderSignUpForm = (
    

    <div className="form">
      <form onSubmit={handleRegister}>
      <h1>Register</h1>
        <div className="input-container">
          <label>Username </label>
          <input type="text" id="username" name="uname" required />
          
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" id="password" name="pass" required />
        </div>
        <div className="input-container">
          <label>Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="input-container">
          <label>Phone number</label>
          <input type="number" id="number" name="number" required />
        </div>
        <div className="input-container">
          <label>Address</label>
          <input type="text" id="address" name="address" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        <h4 className="flex justify-center cursor-pointer"  onClick={()=>{
          
          setSignIn(true);
          setSignUp(false);
        }
        }>sign in for existing user</h4>
      </form>
    </div>
  );

  return (
    <div className="app">
      
      <div className="login-form ">
        <>
        
        
        {login ? 
        <>
        <div className="flex flex-col w-[1000px] h-[500px] relative items-center">
          <h1 className="text-black text-center" >Welcome {currentUser.name}</h1>
          <Link to={'/'}>
            <button className='text-white bg-black content-center m-2'>
              Navigate to Homepage
            </button>
            { login ? 
      <div className="space-y-5">
        {console.log("rendercount",renderCount)}
          {
          renderCount?.map((item)=>{
            
            return(<div  className="border-solid border-2 border-black rounded-md h-[70px] w-[900px] flex text-black items-center justify-between">
              <h1 className="w-[500px] h-[20px] text-center">{item}</h1>
              
              <button className="m-5">cancel order</button>
              </div>)
          })}
          
        </div>
: ''}
        
          </Link>
          
          
          <div className="w-[1000px]">
            <button className='text-white bg-black content-center m-2 absolute bottom-5 right-5'
            onClick={()=>{
              setLogin(false);
              setSignIn(true);
              console.log("before logout",currentUser);
              setCurrentUser({});
              console.log("after logout:",currentUser);
              
              
              }}>
              Logout
            </button>
            

          </div>
       
  
          

        </div>
        
        </>
          
          : <div>
            {signIn && renderForm}
            {signUp && renderSignUpForm}

          </div>
          }
        
        
        
        </>
      </div>
      {/* <h1 className="text-black">
      {currentUser.cart.map((item)=>{
        return (
          <div className="flex ">
            <h1>{item}</h1>
            <h1>&nbsp; arriving in 3 days</h1>
          </div>
          
        )
      })}</h1> */}
      
    </div>
  );
}

export default LoginPage;