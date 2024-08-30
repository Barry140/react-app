import React from 'react';
import { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';


const defaultFormData = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

const Register = () => {

    const [registerformData, setRegisterformData] = useState(defaultFormData);
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      });

    const handleOnChange = (e) => {
        console.log(e.target, 'hehe')
        const { name, value } = e.target;

        setRegisterformData(prevState => ({
        ...prevState,
        [name]: value
        }))
    }

    const validateValues = () => {        
      let formErrors = {};

        for (const [key, value] of Object.entries(registerformData)) {
          if (!value.length) {
            formErrors = {
              ...formErrors,
              [key]:  "Required",
            };
          }
        }

        console.log(formErrors, 'debug');

        setErrors(prevState => ({
          ...prevState,
          ...formErrors
        }));

        return Object.keys(formErrors).length === 0 && formErrors.constructor === Object;
      }

      const createUser = async () =>  {
        try{
             await axios.post('http://localhost:3001/users', {
                ...registerformData
              })
              .then(response => {
                alert(response.data.message)
              })
        }catch (error) {
            console.error('Error posting data:', error);
            // Handle error scenario
          }
      }

      const handleRegisterForm = async (e) => {
        e.preventDefault();
        console.log(validateValues(), 2323232);
        setLoading(true);
        if (validateValues()) {
          await createUser();
          setLoading(false);
          setRegisterformData(defaultFormData)
          setErrors({
            firstname: '',
            lastname: '',
            email: '',
            password: ''
          })
        }
    } 

    return <>
        <h1 className='text-center'>Registration</h1>
        <h5>Type your info below</h5>
            <Form onSubmit={handleRegisterForm}>
                <Row className="mt-4 mb-3">
                    <Col>
                        <FloatingLabel controlId="floatingInput" label="Firstname"  >
                            <Form.Control value={registerformData.firstname} onChange={handleOnChange} type="text" name="firstname" placeholder="Type your name here" />
                        </FloatingLabel>
                        {errors.firstname && <div style={{color: "red", textAlign: "left"}}><small>{errors.firstname}</small></div>}  
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingInput" label="Lastname"  >
                            <Form.Control value={registerformData.lastname} onChange={handleOnChange} type="text" name ="lastname" placeholder="Type your name here" />
                        </FloatingLabel>
                        {errors.lastname && <div style={{color: "red", textAlign: "left"}}><small>{errors.lastname}</small></div>}  
                    </Col>
                </Row>
                <FloatingLabel controlId="floatingInput" label="Email address"  className="mb-3">
                    <Form.Control value={registerformData.email} onChange={handleOnChange} type="email" name="email" placeholder="name@example.com" />
                </FloatingLabel>
                {errors.email && <div style={{color: "red", textAlign: "left"}}><small>{errors.email}</small></div>}  
                <FloatingLabel controlId="floatingPassword" label="Password"  className="mb-3">
                    <Form.Control value={registerformData.password} onChange={handleOnChange} type="password" name="password" placeholder="Password" />
                </FloatingLabel>
                {errors.password && <div style={{color: "red", textAlign: "left"}}><small>{errors.password}</small></div>}  

                <Button variant={loading ? "secondary" : "primary"}  type="submit" disabled={loading} >Submit</Button>
                {loading && <Spinner className='me-2 ms-2 align-middle ' animation="border" size='sm'/>}
            </Form> 
        </>
}

export default Register;