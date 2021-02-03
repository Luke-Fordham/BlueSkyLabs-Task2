import { useScrollTrigger } from '@material-ui/core';
import React, { useEffect } from 'react';
import './../App.css';
import {useSharedForm} from './Form';

declare module 'react' {
  interface HTMLProps<T> {
     value?:string;
 }

}

const Filter: React.FC = () => {
  const now = new Date();

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
}, []);


const filterUsers = (key: any) => {
  const result = form.users.find((obj: any) => obj.id == key);
  const formData: any = [];
  formData['users'] = [result];
  formData['todos'] = form.todos;
  add(formData)
}


  useEffect(() => {
      console.log(form);
      console.log('changed')
  }, [form])

return (
    
  <div className="TaskList">
      <button value="Reilly" onClick={ () => {filterUsers(1)}}>
            only return user 1
      </button>
      <pre>{form}</pre>
  </div>
);
}

export default Filter;
