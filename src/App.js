
import './App.css';
import { useState } from "react";


function App() {
  const [people, setPeople] = useState([
    {
      name:"john",
      age: 10,
      address:"TD"
    },
    {
      name:"johnson",
      age: 10,
      address:"TD"
    },
    {
      name:"The rock",
      age: 20,
      address:"TD"
    },
    {
      name:"Dwayne ",
      age: 10,
      address:"TD"
    }
  ]
)
  
  const handleItem = (e) => {
    e.preventDefault();
    // Get values of new people from form (name, age, address)
    const newName = e.target.name.value;
    const newAge = e.target.age.value;
    const newAddress = e.target.address.value;
    // Add new people to array of people
    setPeople(prevState => [ ...prevState, {name:newName,age:newAge,address:newAddress} ] )

    // Reset form values after adding new people
    e.target.reset();
  }

  const listitem = people.map((item, idx) => <tr key={idx}>
    <td>{item.name}</td>
    <td>{item.age}</td>
    <td>{item.address}</td>
  </tr>)
  


  return (
    <div className="App">
      <header className="App-header">
          <table>
      <tr>
        <th>Name</th>
        <th>Contact</th>
        <th>Country</th>
      </tr>
      {listitem}
    </table>

    <form onSubmit={handleItem}>
      <input type="text" name="name"/>
      <input type="number" name="age"/>
      <input type="text" name="address"/>
      <button type="submit">ADD PEOPLE</button>
    </form>

      </header>
    </div>
  );
}

export default App;
