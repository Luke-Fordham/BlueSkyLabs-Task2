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
    //todoEls["todos"] = [];
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



//   const filterUsers = (key: any) => {
//   const result = formModel.users.find((obj: any) => obj.id == key);
//   const formData: any = [];
//   formData['todos'] = formModel.todos;
//   formData['users'] = [result];
//   setView(formData)
// }

const filterTodos = (key: any) => {
  const result = formModel.todos.find((obj: any) => obj.user == key);
  const formData: any = [];
  formData['users'] = formModel.users;
  formData['todos'] = [result];
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
    // console.log(form);
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
          <option onChange={() => {alert('hi')}} key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</option>
        )
      })
      const updateEls: any = [];
      updateEls['users'] = userDropdown;
      if (formEls.todos) {
        updateEls['todos'] = formEls.todos;
      }
      // formEls.users = userDropdown;
      //console.log('this one:', formEls)
      addEls(updateEls);
      //console.log(formModel.users)
    }
  }, [formModel])

  useEffect(() => {
    console.log('formEls:', formEls);
  }, [formEls])

return (
    
  <div className="TaskList">
      {formEls.users ? 
      <select placeholder="select user" onChange={(e) => {filterTodos(e.target.value)}} name="users" id="select_users">
        <option value="" disabled selected>Select your option</option>
        {formEls.users}
      </select> : null}
  </div>
);
}

export default Filter;
