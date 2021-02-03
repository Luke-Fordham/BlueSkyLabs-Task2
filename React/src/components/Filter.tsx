import { useScrollTrigger } from '@material-ui/core';
import React, { useEffect } from 'react';
import './../App.css';
import {useSharedForm, useSharedFormEls} from './Form';

declare module 'react' {
  interface HTMLProps<T> {
     value?:string;
 }

}

const Filter: React.FC = () => {
  const now = new Date();

  const { form, add }: any = useSharedForm();
  const { formEls, addEls }: any = useSharedFormEls();

  function createEls(data: any, identifier: any) {
    const userEls: any = [];
    userEls["users"] = [];
    data.forEach((item: any) => {
      userEls.users.push(
        <div key={item.id} className={`${identifier}-${item.id}`}>
        <h4>{item.firstName}</h4>
      </div>
      )})
      return userEls;
  }

  useEffect(()=> {
    const formData: any = [];
    const formObjects: any = [];
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
  formData['todos'] = form.todos;
  formData['users'] = [result];
  add(formData)
}


  useEffect(() => {
      console.log(form);
      console.log('changed')
      if (form.users) {
        addEls(createEls(form.users, 'user'));
      }
  }, [form])

return (
    
  <div className="TaskList">
      <button onClick={ () => {filterUsers(1)}}>
            only return user 1
      </button>
  </div>
);
}

export default Filter;
