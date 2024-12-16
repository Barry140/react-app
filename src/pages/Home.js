import React from 'react';
import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationPopover from './DeleteConfirmation';

const defaultFormData = {
    name: '',
    status: ''
  };

const Home = ({ parentLoading, t } ) => {
  const [peopleFormData, setPeopleFormData] = useState(defaultFormData)
  const [loading, setLoading] = useState(false)
  const [people, setPeople] = useState([])
  const [searchTask, setSearchTask] = useState('')
  const [errors, setErrors] = useState({
    name: '',
    status: ''
  });
  const [editPeople, setEditPeople] = useState({
    index: null
  });
  useEffect(() => {
    updateList()
  }, []);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setPeopleFormData(defaultFormData);
    setEditPeople({index: null});
    setShow(false)
  };
  const handleOnSearchChange = (e) => {
      setSearchTask(e.target.value);
  }
  const handleSearch = () => {
    updateList(searchTask || ''); 
  }
  const handleOnChange = (e) => {
    console.log(e.target, 'hehe')
    const { name, value } = e.target;

    setPeopleFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const validateValues = () => {
    let formErrors = {};
    console.log(peopleFormData.name.length, 4444);
    if (!peopleFormData.name.length) {
      formErrors.name = "Required";
    };
    if (!peopleFormData.status.length) {
      formErrors.status = "Required";
    };
    setErrors(prevState => ({
      ...prevState,
      ...formErrors
    }))
    return Object.keys(formErrors).length === 0 && formErrors.constructor === Object;
  }
  const toastSuccess = (text) => {
    toast.success(text, {
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
  const handleItem = async (e) => {
    e.preventDefault(); 
    // run when there are values in form
    if (validateValues()) {
      const { index } = editPeople
      if (index !== null) {
          await patchItem(index);
          setPeople(prevState => {
          return prevState.map((p, idx) => {
            if (idx === index) {
              const a = {
                ...p,
                ...peopleFormData
              }
              console.log(p, peopleFormData, 'a la gi')
              return a;
            }
            return p;
          })
        } )
        let text = "Edited task"
        toastSuccess(text);
      } else {
        setPeople(prevState => [ ...prevState, {
          name:peopleFormData.name,
          status:peopleFormData.status
        } ] )
        await postList();
        let text = "Added Task!"
        toastSuccess(text);
      }
      console.log('testt');
      setPeopleFormData(defaultFormData)
      setErrors({
        name: '',
        status: ''
      })
      setEditPeople({index: null});
      setShow(false);
      updateList();
    }
  }
  const handleEdit = async (id) => {
      await getItem(id) 
      setEditPeople(prevState => ({
        ...prevState,
        index: id
      }))
  }
  const getItemStatus = (item) => {
    switch (item) {
      case 'ok': {
        return (
          <p className="text-uppercase">👍 {item}</p>
        ); 
      }
      case 'not ok': {
        return (
          <p className="text-uppercase">👎 {item}</p>
        ); 
      }
      case 'good': {
        return (
          <p className="text-uppercase">👍 {item}</p>
        ); 
      }
      default:
        return <p>🎱 {item}</p>;
      }
  } 
  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`https://nodeapi-dwff.onrender.com/list/${id}`)
    toast.success("Deleted!!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      })
    updateList();
  } 
  const handleCancel = () => {
    console.log('Action canceled');
  };
  const listitem = () => {
    if (loading) { 
      return <tr className='d-flex'>
      <Spinner className='me-2 ' animation="border" size='sm'/>Loading..
      </tr>;
    }
    if (!people.length) {
      return <div>No Data</div>
    }
    return  people.map((item, idx) => {
      return (
      <tr key={idx}>
      <td className='text-center'>{idx + 1}</td>
      <td className='text-center'>{item.name}</td>
      <td style={{ textAlign: 'center' }}>{getItemStatus(item.status)}</td>
      <td style={{ textAlign: 'center' }}><Button variant="outline-dark" type="button" onClick={() => {handleShow(); handleEdit(item.id)}}>✏</Button></td>
      <td style={{ textAlign: 'center' }}>
          <ConfirmationPopover 
            onConfirm={() => handleDelete(item.id)} 
            onCancel={ () => handleCancel }
          />
        </td>
    </tr>)})
  }
  const updateList = async (keyword) => {
    setLoading(true);
    try {
      let apiEndpoint = 'https://nodeapi-dwff.onrender.com/list';
      if (keyword) {
        apiEndpoint += `?keyword=${keyword}`
      }
      setLoading(true);
      const response = await axios.get(apiEndpoint);
      setLoading(false);
      console.log(response.data, "RESPONSE DATA")
      const { records, message } = response?.data;
      setPeople(records)
      console.log(message);
    } catch(err) {
      console.log(err)
    }
  }
  const getItem = async (id) => {
    await axios.get(`https://nodeapi-dwff.onrender.com/list/${id}`)
    .then(response => {
      return setPeopleFormData(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
  const patchItem = async (id) => {
    await axios.put(`https://nodeapi-dwff.onrender.com/list/${id}`, {
        name: peopleFormData.name,
        status: peopleFormData.status
    })
  }
  const postList = async () => {
      try {
        const response = await axios.post('https://nodeapi-dwff.onrender.com/list', {
          ...peopleFormData
        });
        console.log(response);
        console.log('Data posted successfully!');
        // Optionally handle response from server
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error posting data:', error);
        // Handle error scenario
      }
    } 

    return <div>
        <Row>
            <Col sm={4} className='d-flex '>
            <input placeholder='Task name to search..' type="search" name="name" value={searchTask} onChange={handleOnSearchChange}/>
            </Col>
            <Col sm={1} className='d-flex p-0'>
            <Button variant="outline-primary"  onClick={handleSearch}>SEARCH</Button>
            </Col>
            <Col sm={1} className='d-flex p-0'>
            <Button variant="secondary" size="sm" onClick={updateList}>Show all</Button>
            </Col>
            <Col  style={{textAlign: 'right'}}>
            <Button variant="outline-primary" onClick={handleShow}>ADD TASK</Button>
            </Col>
        </Row>

        <Row>
            <Col>
            <Table striped  hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Task Name</th>
                    <th>Task Status</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {listitem()}
                </tbody>
            </Table>
            </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editPeople.index !== null ? 'EDIT TASK INFO' : 'ADD TASK INFO'}</Modal.Title>
            </Modal.Header>
            
            <Form onSubmit={handleItem}>
                <Modal.Body>
                    {/* {JSON.stringify(errors)} */} 
                    <div style={{ width:'100%'}}>
                    <Form.Label >Task Name :</Form.Label>
                    <input type="text" name="name" value={peopleFormData.name} onChange={handleOnChange}/>
                    {errors.name && <div style={{color: "red", textAlign: "left"}}><small>{errors.name}</small></div>}
                    <br></br>
                    <Form.Label >Task status :</Form.Label>
                    <input type="text" name="status" value={peopleFormData.status} onChange={handleOnChange}/>
                    {errors.status && <div style={{color: "red", textAlign: "left"}}><small>{errors.status}</small></div>}
                    </div>
                </Modal.Body>
                <Modal.Footer>          
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" type="submit">{editPeople.index !== null ? ('SAVE') : 'ADD'} </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        <ToastContainer  />
    </div>
};

export default Home;