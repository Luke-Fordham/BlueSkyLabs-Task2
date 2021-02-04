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
    const userEls: any = [];
    const todoEls: any = [];
    userEls["users"] = [];
    todoEls["todos"] = [];
    data.forEach((item: any) => {
      if (identifier == 'user') {
        userEls.users.push(
          <div key={item.id} className={`${identifier}-${item.id}`}>
          <h4>{item.firstName}</h4>
        </div>
        )
      } if (identifier == 'todo') {
        todoEls.todos.push(
          <div key={item.id} className={`${identifier}-${item.id}`}>
          <h4>{item.name}</h4>
          <p>{findUser(item.user)}</p>
        </div>
        )
      }
})
      if (identifier == 'user'){return userEls} 
      else if (identifier == 'todo') {return todoEls}
  }

  const filterUsers = (key: any) => {
  const result = formModel.users.find((obj: any) => obj.id == key);
  const formData: any = [];
  formData['todos'] = formModel.todos;
  formData['users'] = [result];
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

// useEffect(() => {
//   console.log(formEls);
// }, [formEls])

  useEffect(() => {
      console.log(formModel);
      console.log('changed')
      const formObjs: any = [];
      if (formView.todos) {
        addEls(createEls(formView.todos, 'todo'));
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
