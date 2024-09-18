import React from 'react';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const defaultFormData = {
  email: '',
  password: ''
};

const Login = () => {
  const [loginformData, setLoginformData] = useState(defaultFormData);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
     
    const toastLoginSuccess = () => {
      toast.success("Login successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } 
    const toastLoginFalse = () => {
      toast.warn('Email or password is incorrect!, Please try again!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    const handleOnChange = (e) => {
      console.log(e.target, 'hehe')
      const { name, value } = e.target; 

      setLoginformData(prevState => ({
      ...prevState,
      [name]: value
      }))
    }
    const validateValues = () => {
      let formErrors = {};
      if (!loginformData.email.length) {
          formErrors.email = "Required";
        };
      if (!loginformData.password.length) {
          formErrors.password = "Required";
        };
      setErrors(prevState => ({ 
        ...prevState,
        ...formErrors
      }))

      console.log(formErrors);
      return Object.keys(formErrors).length === 0 && formErrors.constructor === Object;
    }
    const loginUser = async () =>  {
      try{
          const response = await axios.post('http://localhost:3001/login',{
            ...loginformData
          })
          if(response.data.message === "login success"){
            toastLoginSuccess();
          }else{
            toastLoginFalse();
          }
          
      }catch (error) {
          console.error('Error posting data:', error);
          // Handle error scenario
        }
    }
    const handleLoginForm = async (e) =>{
      e.preventDefault();
      if(validateValues()){
        await loginUser();
      }
    }

    return <>
        <h1 className='text-center'>Login </h1>
        <Form className=' align-self-center' onSubmit={handleLoginForm}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={handleOnChange} name='email' type="email" placeholder="Enter email" />
        {errors.email && <div style={{color: "red", textAlign: "left"}}><small>{errors.email}</small></div>}  
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handleOnChange} name='password' type="password" placeholder="Password" />
        {errors.password && <div style={{color: "red", textAlign: "left"}}><small>{errors.password}</small></div>}  
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <ToastContainer  />
    </>
}

export default Login;