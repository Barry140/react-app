import React from 'react';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const defaultFormData = {
  email: '',
  password: ''
};

const Login = () => {
  const navigate = useNavigate();
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
      for (let key in loginformData) {
        if (!loginformData[key].length) {
            formErrors[key] = "Required"; 
        }
    }
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
            setTimeout(() => {
              navigate('/')
            }, 4000); 
          }else{
            toastLoginFalse();
          }
          
      }catch (error) {
          console.error('Error posting data:', error);
        }
    }
    const handleLoginForm = async (e) =>{
      e.preventDefault();
      if(validateValues()){
        await loginUser();
      }
    }

    return <>
              <Row>
                <Col></Col>
                <Col>
                  <h4 className='text-center fs-1'>Login </h4>
                  <Form className=' align-self-center' onSubmit={handleLoginForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label class="fw-bold">Email address</Form.Label>
                      <Form.Control onChange={handleOnChange} name='email' type="email" placeholder="Enter email" />
                      {errors.email && <div style={{color: "red", textAlign: "left"}}><small>{errors.email}</small></div>}  
                      <Form.Text className="text-muted">
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label class="fw-bold">Password</Form.Label>
                      <Form.Control onChange={handleOnChange} name='password' type="password" placeholder="Password" />
                      {errors.password && <div style={{color: "red", textAlign: "left"}}><small>{errors.password}</small></div>}  
                    </Form.Group>

                    <div className=''>
                      <Button variant="primary" type="submit" className='w-100'>
                        Submit
                      </Button>
                    </div>
                    
                  </Form>
                </Col>
                <Col></Col>
              </Row>
              
              <ToastContainer  />
    </>
}

export default Login;