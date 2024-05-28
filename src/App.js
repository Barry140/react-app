import Container from 'react-bootstrap/Container';
import './App.css';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

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
  const handleItem = (e) => {
    e.preventDefault(); 
    // run when there are values in form
    if (validateValues()) {
      const { index } = editPeople
      if (index !== null) {
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

  }
  const handleEdit = (idx) => {

      const b = people[idx];
      console.log(b, "b");
      setPeopleFormData({...b});
      setEditPeople(prevState => ({
        ...prevState,
        index: idx
      }))
      
  }
  const handleDelete = (idx) => {
      setPeople(prevState => {
        return prevState.filter ((p,i) => {
          return i !== idx
        })
      })
    }

  
  const listitem = people.map((item, idx) => <tr key={idx}>

    <td style={{ textAlign: 'center' }}>{idx}</td>
    <td style={{ textAlign: 'center' }}>{item.name}</td>
    
    
    <td style={{ textAlign: 'center' }}>
      {item.status === 'ok' ? (
          <p className="text-uppercase">👍 {item.status}</p>
      ) : item.status === 'good' ? (
        <p className="text-capitalize">✌️ {item.status}</p>
      ) : (
          <p>🎱 {item.status}</p>
      )}
    </td>

    <td style={{ textAlign: 'center' }}><Button variant="outline-dark" type="button" onClick={() => handleEdit(idx)}>✏</Button></td>
    <td style={{ textAlign: 'center' }}><Button variant="outline-dark" type="button" onClick={() => handleDelete(idx)}>🗑</Button></td>

  </tr>)
  
  
  const [show, setShow] = useState(false);

  const handleCloseButton = () => {
    if(validateValues()){
      console.log(validateValues())
      return setShow(false)
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Container>

    <div className="App">

      <header className="App-header">
        <h1>TODO list Demo App</h1>
        <p>Do it now</p>

        <div style={{ textAlign: 'right' }}>
          <Button  variant="outline-info" onClick={handleShow}>
           {editPeople.index !== null ? 'Click here to Edit selected task ' : 'ADD TASK'}
          </Button>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add task info</Modal.Title>
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
              {/* <Button variant="outline-info" type="submit">{editPeople.index !== null ? 'EDIT' : 'ADD'} TASK</Button> */}
            </div>
        </Modal.Body>

        <Modal.Footer>          
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type="submit" onClick={handleCloseButton}>{editPeople.index !== null ? ('EDIT') : 'ADD'} </Button>
        </Modal.Footer>

        </Form>

      </Modal>  

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

      </header>

    </div>

    </Container>
    </>
  );
  
}

export default App;
