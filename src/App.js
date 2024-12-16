import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Register from './pages/Register';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const navigate = useNavigate();

  const handleLogin= () =>  {
    navigate("/login");
  }
  const handleRegister= () =>  {
    navigate("/register");
  }

  const [loading, setLoading] = useState(true);

  return (
    <Container>
      <div className="App">
        <header >
        <Row>
          <Col><Link to={'/'} style={{ textDecoration: 'none' , color: 'black'} }><h1>TODO list Demo App</h1></Link></Col>
          <Col className='d-flex justify-content-end'>
            <Button type="button" variant="outline-primary" className='me-2'  onClick={handleLogin}>
                Login
            </Button>
            <Button type="button" variant="outline-primary"  onClick={handleRegister}>
                Register
            </Button>
          </Col>
        </Row>
          <p>Do it now</p>
        </header>

          <Routes>
            <Route exact path='/' element={<Home parentLoading={loading} t="Tuan"/>} />
            <Route exact path="/login" element={<Login />} />  
            <Route exact path="/register" element={<Register />} />  
          </Routes>
      </div>
    </Container>

  );
  
}

export default App;
