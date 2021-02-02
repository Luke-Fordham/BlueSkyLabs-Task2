import React, {useEffect, useMemo, useState} from 'react';
import logo from './logo.svg';
import './../App.css';
import { FormContext } from './FormContext';

const Form: React.FC = () => {

  const [form, setForm]: any = useState([]) 
  const providerForm: any = useMemo(() => ({ form, setForm }), [form, setForm]);


  useEffect(()=> {
    const formData: any = [];
    const fetchData = async () => {
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

useEffect(()=> {

    console.log(form)
}, [form])

  return (
    <div className="form">
        <FormContext.Provider value={providerForm}>
    {/* <pre>{form.children}</pre> */}
                    {/* <Filter />
        <TaskList />
        <AddTask /> */}
        </FormContext.Provider>
    </div>
  );
}

export default Form;
