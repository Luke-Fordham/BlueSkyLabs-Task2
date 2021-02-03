import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import List from './components/List';

const App: React.FC = () => {
  return (
    <div className="App">        
        <List />
    </div>
  );
}

export default App;
