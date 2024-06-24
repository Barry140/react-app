import Container from 'react-bootstrap/Container';
import './App.css';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';



const defaultFormData = {
  name: '',
  status: ''
};


function App() {
  const [peopleFormData, setPeopleFormData] = useState(defaultFormData)
  const [errors, setErrors] = useState({
    name: '',
    status: ''
  });
  const [editPeople, setEditPeople] = useState({
    index: null
  });

  const [searchTask, setSearchTask] = useState('')
  const handleOnSearchChange = (e) => {
      setSearchTask(e.target.value);
  }
  const handleSearch = () => {
    if(searchTask){
      setPeople(prevState => {
        return prevState.filter ((p) => {
          return p.name === searchTask;
        })
      })
    }
    else updateList();
  }

  const [people, setPeople] = useState([])

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
      } else {
        setPeople(prevState => [ ...prevState, {
          name:peopleFormData.name,
          status:peopleFormData.status
        } ] )
        postList();
      }
      console.log('testt');
      // Reset form values after adding new people
      setPeopleFormData(defaultFormData)
      setErrors({
        name: '',
        status: ''
      })
      setEditPeople({index: null});
      }
      updateList();
  }
  const handleEdit = async (id) => {
      await getItem(id) 
      setEditPeople(prevState => ({
        ...prevState,
        index: id
      }))
  }
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/list/${id}`)
    updateList();
  }
  
  //
  const [show, setShow] = useState(false);
  const handleCloseButton = () => {
    if(validateValues()){
      console.log(validateValues())
      return setShow(false)
    }
  };
  const handleClose = () => {
    setPeopleFormData(defaultFormData);
    setEditPeople({index: null});
    return setShow(false)
  };
  const handleShow = () => setShow(true);
  //

  const getItemStatus = (item) => {
    switch (item) {
      case 'ok': {
        return (
          <p className="text-uppercase">👍 {item}</p>
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
  const listitem = people.map((item, idx) => 
    <tr key={idx}>
    <td className='text-center'>{idx + 1}</td>
    <td className='text-center'>{item.name}</td>
    <td style={{ textAlign: 'center' }}>{getItemStatus(item.status)}</td>
    <td style={{ textAlign: 'center' }}><Button variant="outline-dark" type="button" onClick={() => {handleShow(); handleEdit(item.id)}}>✏</Button></td>
    <td style={{ textAlign: 'center' }}><Button variant="outline-dark" type="button" onClick={() => handleDelete(item.id)}>🗑</Button></td>
  </tr>)
  
  const updateList = async () => {
    await axios.get('http://localhost:3001/list')
    .then(response => {
      setPeople(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
  const getItem = async (id) => {
    await axios.get(`http://localhost:3001/list/${id}`)
    .then(response => {
      return setPeopleFormData(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
  const patchItem = async (idx) => {
    await axios
      .put(`http://localhost:3001/list/${idx}`, {
        name: peopleFormData.name,
        status: peopleFormData.status
      })
      .then(response => {
        console.log("Item da thay doi:", response?.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const postList = async () => {
      try {
        const response = await axios.post('http://localhost:3001/list', {
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
  //Sử dụng axios để fetch dữ liệu
  useEffect(() => {
    updateList()
  }, [])

  return (
    <>
    <Container>
    <div className="App">
      <header className="App-header">
        <h1>TODO list Demo App</h1>
        <p>Do it now</p>
      </header>


      <div>
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
                {listitem}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div> 

    </div>

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
            <Button variant="primary" type="submit" onClick={handleCloseButton}>{editPeople.index !== null ? ('SAVE') : 'ADD'} </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
    </>
  );
  
}

export default App;
