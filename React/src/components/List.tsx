import React, { useEffect, useState, useCallback} from 'react';
import './../App.css';
import { useBetween } from 'use-between';
import TaskList from './TaskList';

const useForm = () => {
    const [form, setForm]: any = useState([]);
    const add = (value: any) => {setForm(value);} 
    return ({form, add});
}


  export const useSharedForm = () => useBetween(useForm);

  const Form: React.FC = () => {
    const { form, add }: any = useSharedForm();

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
            add(formData);
        }
        fetchData();
        // console.log(form);
    }, [])
    
    return (
        <div>
        { form.users ? <pre>{JSON.stringify(form.users)}</pre> : null}
        { form.todos ? <pre>{JSON.stringify(form.todos)}</pre>: null }
        { form.name ? <pre>{JSON.stringify(form.name)}</pre>: null }
        <pre>{form}</pre>
        </div>
    );
  };


  const List = () => (
    <>
    <Form />
    <TaskList />
    </>
  );

  export default List;