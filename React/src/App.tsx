import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';

const App: React.FC = () => {
  // fetch('api/users')
  // .then(response => response.json())
  // .then(data => console.log(data));

  // fetch('api/todos')
  // .then(response => response.json())
  // .then(data => console.log(data)); 


  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
