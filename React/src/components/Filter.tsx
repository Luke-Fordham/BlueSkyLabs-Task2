import React, { useEffect } from 'react';
import './../App.css';
import {useSharedForm, useSharedFormEls} from './Form';

declare module 'react' {
  interface HTMLProps<T> {
     value?:string;
 }

}

const Filter: React.FC = () => {

  const { formModel, add }: any = useSharedForm();
  const { formView, setView }: any = useSharedForm();
  const { addEls }: any = useSharedFormEls();

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

  const filterUsers = (key: any) => {
  const result = formModel.users.find((obj: any) => obj.id == key);
  const formData: any = [];
  formData['todos'] = formModel.todos;
  formData['users'] = [result];
  setView(formData)
}

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


  useEffect(() => {
      console.log(formModel);
      console.log('changed')
      if (formView.users) {
        addEls(createEls(formView.users, 'user'));
      }
  }, [formView])

  useEffect(() => {
    setView(formModel);
  }, [formModel])

return (
    
  <div className="TaskList">
      <button onClick={ () => {filterUsers(1)}}>
            only return user 1
      </button>
      <button onClick={ () => {filterUsers(2)}}>
            only return user 2
      </button>
      <button onClick={ () => {filterUsers(3)}}>
            only return user 3
      </button>
      <button onClick={ () => {filterUsers(4)}}>
            only return user 4
      </button>
  </div>
);
}

export default Filter;
