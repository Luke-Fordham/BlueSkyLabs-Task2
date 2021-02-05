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
  const { formEls, addEls }: any = useSharedFormEls();

  function createEls(data: any, identifier: any) {
    const todoEls: any = [];
    data.forEach((item: any) => {
      if (item !== undefined) {
        todoEls.push(
          <div key={item.id} className={`${identifier}-${item.id}`}>
          <h4>{item.name}</h4>
          <p>{findUser(item.user)}</p>
        </div>
        )
      }
  })
    return todoEls;
  }

const filterTodos = (key: any) => {
  const result = formModel.todos.filter((obj: any) => obj.user == key || key.includes(obj.user));
  const formData: any = [];
  formData['users'] = formModel.users;
  formData['todos'] = result;
  setView(formData)
}

const findUser = (key: any) => {
  const result = formModel.users.find((obj: any) => obj.id == key);
  return result.firstName + ' ' + result.lastName;
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
}, []);


  useEffect(() => {
      console.log(formModel);
      console.log('changed')
      if (formView.todos) {
        const updateEls: any = [];
        const todoEls = createEls(formView.todos, 'todo');
        updateEls['todos'] = todoEls;
        if (formEls.users) {
          updateEls['users'] = formEls.users;
        }
        addEls(updateEls);
      }
  }, [formView])

  useEffect(() => {
    setView(formModel);
    if (formModel.users) {
      const userDropdown: any = [];
      formModel.users.forEach((user: any) => {
        userDropdown.push(
          <option  
          key={user.id} value={user.id}>
            {user.firstName + ' ' + user.lastName}
            </option>
        )
      })
      const updateEls: any = [];
      updateEls['users'] = userDropdown;
      if (formEls.todos) {
        updateEls['todos'] = formEls.todos;
      }
      addEls(updateEls);
    }
  }, [formModel])

  useEffect(() => {
    console.log('formEls:', formEls);
  }, [formEls])

  function getIds(){
    const ids: any = []; 
    formModel.users.forEach((user: any) => 
    ids.push(user.id))
    return ids;
  }


return (
    
  <div className="TaskList">
      {formEls.users ? 
      <select onChange={(e) => {filterTodos(e.target.value)}} name="users" id="select_users">
        <option value="" disabled selected hidden>User</option>
        <option value={getIds()} >All users</option>
        {formEls.users}
      </select> : null}
  </div>
);
}

export default Filter;
