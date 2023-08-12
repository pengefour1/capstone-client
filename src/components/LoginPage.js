import React, { useContext, useState } from "react";

import { Link} from "react-router-dom";
import axios from "axios";
import CartItem from '../components/CartItem'


import '../../src/styles.css'
import {LoginContext} from "../context/LoginContext";
import { CartContext } from "../context/CartContext";

const LoginPage = () => {
  // React States
  const {cart} = useContext(CartContext)
  const {login, setLogin} = useContext(LoginContext)
  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false)
 
  
 

  

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
    
    
    let newData = await axios.post("http://localhost:8000/signin",sendThisJSON)
    .then((data)=>{
      waitForData=data.data;
      if(waitForData){
        console.log("authenticated?",waitForData);
        setLogin(true);
        setSignIn(false);

      }else{
        setLogin(false);
        setSignIn(false);
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
    
    
    let newData = await axios.post("http://localhost:8000/signup",
    {
      username:username,
      password:password,
      name:name,
      number:number,
      address:address
    }
    ).then(()=>{
      console.log('registered');
      setLogin(true);
      setSignUp(false);
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
        <div className="flex flex-col">
          <h1 className="text-black text-center">Welcome Prince</h1>
          <Link to={'/'}>
          <button className='text-white bg-black content-center m-2'>
            Navigate to Homepage
          </button>
          
          </Link>
       
  
          <button className='text-white bg-black content-center m-2'
          onClick={()=>{
            setLogin(false);
            setSignIn(true);
            }}>
            Logout
          </button>

        </div>
        
        </>
          
          : <div>
            {signIn && renderForm}
            {signUp && renderSignUpForm}

          </div>
          }
        
        
        
        </>
      </div>
      <h1 className="text-black">{cart.map((item)=>{
        return (
          <div className="flex ">
            <h1>{item.attributes.title}</h1>
            <h1>&nbsp; arriving in 3 days</h1>
          </div>
          
        )
      })}</h1>
    </div>
  );
}

export default LoginPage;