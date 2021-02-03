import React, { useEffect, useMemo, useState} from 'react';
import logo from './logo.svg';
import './../App.css';
import { FormContext } from './FormContext';
import TaskList from './TaskList';

const Form_copy: React.FC = () => {

  const [form, setForm]: any = useState([]);
  const providerForm = useMemo(() => ({ form, setForm }), [form, setForm]);


  useEffect(()=> {
    const formData: any = [];
    const fetchData: VoidFunction = async () => {
        try{
            const response = await fetch('api/users');
            const users = await response.json();
            formData['users'] = users.users;
        } catch (e) {
            console.log(e);
        }
        try{
            const response = await fetch('api/todos');
            const todos = await response.json();
            formData['todos'] = todos.todos;
        } catch (e) {
            console.log(e);
        }
        setForm(formData);
    }
    fetchData();
}, [])

// useEffect(()=> {
//     refreshView(form)
// }, [providerForm])

  return (
    <div className="form">
        <FormContext.Provider value={providerForm}>
            <TaskList />
        </FormContext.Provider>
    </div>
  );
}

export default Form_copy;
