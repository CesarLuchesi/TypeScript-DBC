import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import List from './components/List';
import { PeopleDTO } from './models/PeopleDTO';




function App() {
  
  const [people, setPeople] = useState<PeopleDTO ['people']>(
    [{
      name: 'Gabriel',
      age: 22,
    }]);


  return (
    <div className="App">
      <h1>Melhor Turma</h1>
      <List people={people}/>
    </div>
  );
}

export default App;
