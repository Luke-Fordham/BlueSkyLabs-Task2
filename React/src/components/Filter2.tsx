import React, { useEffect, useState } from 'react';
import './../App.css';
import {useSharedForm, useSharedFormEls} from './Form';
import Select from 'react-select';
import { Checkbox, TextField } from '@material-ui/core';

declare module 'react' {
  interface HTMLProps<T> {
     value?:string;
 }

}

// Filter component
const Filter: React.FC = () => {

  // filter checkbox state
  const [check, setCheck]: any = useState(false); 

  // use-between functions destructuring
  const { formModel, add }: any = useSharedForm();
  const { formView, setView }: any = useSharedForm();
  const { formEls, addEls }: any = useSharedFormEls();
  
  // Create task html elements from todo list as (data)
  function createEls(data: any, identifier: any) {
    const todoEls: any = [];
    const checkbox: any = [];
    // create html element for each todo if the item isn't undefined
    data.forEach((item: any) => {
      function handleChange(event: any) {
        const newView: any = [];
        newView['todos'] = formView.todos;
        newView['users'] = formView.users;
        const todo = newView.todos.find((obj: any) => obj.id == item.id);
        todo.isComplete = event.target.checked;
        console.log('event target is', event.target.checked) 
        setView(newView);
      }
      if (item !== undefined) {
        const id = item.id;
        const status = formView.todos.find((obj: any) => obj.id === id);
        //console.log(status.isComplete)
        todoEls.push(
          <div key={item.id} className={`${identifier}-${item.id}`}>
          <h4>{item.name}</h4>
          <p>{findUser(item.user)}</p>
          <Checkbox
              checked={status.isComplete}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
        )
      }
  })
    return todoEls;
  }

  const [filter, setFilter] : any = useState([]);

// filter the tasks and reset the view state -- key: keyword (searchbar) / user Id (dropdown filter) -- input: defines type of search
const filterTodos = (key: any, input: any) => {
  let filterArray: any = [];
  // declare result variable
  let result: any = '';
  const formData: any = [];
  // if the input is id (user dropdown)
  if (input === 'id'){
    let todos = formModel.todos;
    filterArray = filter;
    filterArray['id'] = key;
    setFilter(filterArray)
    if (filter.check !== (undefined || null)) {
      console.log('check exists')
      todos = formModel.todos.filter((obj: any) => obj.isComplete === filter.check);
    }
    console.log('filter is', filter)
    // set result to todos that either match the key user id OR the array of user ids includes the todo.user id
    result = todos.filter((obj: any) => obj.user == key || key.includes(obj.user));
    // set the users in formdata to include only the user selected in the user dropdown
    formData['users'] = formModel.users.filter((obj: any) => obj.id == key || key.includes(obj.id));
  } 
  // if the input is a keyword (searchbar)
  if (input ==='keyword') {
    // filterArray = filter;
    // filterArray['keyword'] = key;
    let todos = formModel.todos;
    // setFilter(filterArray)

    if (filter.id && filter.check) {
      todos = formModel.todos.filter((obj: any) => obj.isComplete == filter.check && ( obj.user == filter.id || filter.id.includes(obj.user)));
    } else 
    if (filter.id) {
      todos = formModel.todos.filter((obj: any) => obj.user == filter.id || filter.id.includes(obj.user));
    } else
    if (filter.check) {
      todos = formModel.todos.filter((obj: any) => obj.isComplete == filter.check);
    }
    
    // set result to all the todos (already filtered by user dropdown) that include the search keyword/letters
    result = todos.filter((obj: any) => obj.name.toLowerCase().includes(key));
    // if the view already has users
    if (formView.users) {
      // set the users in the formdata to the users in the view state
      formData['users'] = formView.users;
    } 
    // else set the users in the formData to all the users in the model state
    else {
      formData['users'] = formModel.users;
    }
  } 
  if (input === 'check') {
    filterArray = filter;
    filterArray['check'] = key;
    let todos = formModel.todos;
    setFilter(filterArray)
    if (filter.id) {
      todos = formModel.todos.filter((obj: any) => obj.user == filter.id || filter.id.includes(obj.user));
    }
    console.log("key is", key)
    result = todos.filter((obj: any) => obj.isComplete == key);

    if (formView.users) {
      // set the users in the formdata to the users in the view state
      formData['users'] = formView.users;
    } 
    // else set the users in the formData to all the users in the model state
    else {
      formData['users'] = formModel.users;
    }
  }
  // set the todos in the formData to the filtered todos 
  formData['todos'] = result;
  // console.log('result is', result);

  // set the view state to the formData array
  setView(formData)
  console.log('formData is', formData)
}


// get the name of a user by user id
const findUser = (key: any) => {
  const result = formModel.users.find((obj: any) => obj.id == key);
  // return a string of the user's first and last name
  return result.firstName + ' ' + result.lastName;
}

// runs when the component mounts
  useEffect(()=> {
    const formData: any = [];
    // fetchData function
    const fetchData: VoidFunction = async () => {
      // get all the users from the server
        try{
            const response = await fetch('api/users');
            const users = await response.json();
            // set users i the formData array to the returned users
            formData['users'] = users.users;
        } 
        // catch errors
        catch (e) {
            console.log(e);
        }
        // get all the todos from the server
        try{
            const response = await fetch('api/todos');
            const todos = await response.json();
            // set the todos in the formData array to the returned todos
            formData['todos'] = todos.todos;
        } 
        // catch errors
        catch (e) {
            console.log(e);
        }
        // set the model state to the formData (returned from the fetch requests)
        add(formData);
    }
    // run the fetchdata function
    fetchData();
}, []);

// run when the view state changes
  useEffect(() => {
    // log the view state
      console.log('view is', formView);
      // log that the state has changed
      console.log('changed')
      // if there are todos in the view state
      if (formView.todos) {
        const updateEls: any = [];
        // set todoEls to html elements returned from createEls() function
        const todoEls = createEls(formView.todos, 'todo');
        // set todos in updateEls array to the created todo elements
        updateEls['todos'] = todoEls;
        // if there are users in the formEls state 
        if (formEls.users) {
          // set the users in the updateEls array to the users in the formEls state
          updateEls['users'] = formEls.users;
        }
        // set the formEls state to the updateEls array
        addEls(updateEls);
      }
  }, [formView])


  // run when the model state changes
  useEffect(() => {
    // set the view state to the model state
    setView(formModel);
    // if the model state contains users
    if (formModel.users) {
      const userDropdown: any = [];
      // push an 'all users' option to the user dropdown array
      userDropdown.push({"value": getIds('all'), "label": "All Users"})
      // for each user in the model state
      formModel.users.forEach((user: any) => {
        // push an option for the user to the user dropdown array
        userDropdown.push(
          {"value": user.id, "label": user.firstName}
        )
      })
      const updateEls: any = [];
      // set the users in the updateEls array to the userDropdown array
      updateEls['users'] = userDropdown;
      // if there are todos in the formEls state
      if (formEls.todos) {
        // set the todos in the updateEls array to the todos in the formEls state
        updateEls['todos'] = formEls.todos;
      }
      // set the formEls to the updateEls array
      addEls(updateEls);
    }
  }, [formModel])


  // run when the formEls state changes
  useEffect(() => {
    // console log the formEls state
    console.log('formEls:', formEls);
  }, [formEls])


  // get user ids -- type: get the users in the model or the view state
  function getIds(type: any){
    const ids: any = []; 
    let form: any = '';
    // if the type is all
    if (type === "all"){
      // set the form variable to the users in the model state
      form = formModel.users
    } 
    // otherwise if the type is view
    else if (type ==="view"){
      // set the form variable to te users in the view state
      form = formView.users
    }
    // for each user in the form variable
    form.forEach((user: any) => 
    // push the user id to the ids array
    ids.push(user.id))
    // return the ids array
    return ids;
  }


  // handles the search
  function handleSearch(value: any) {
    // run the filterTodos function with the searchbar input value and the 'keyword' filter type
    filterTodos(value, 'keyword')
  }


return (
  <div className="taskList">
      <TextField className="searchbar" label="Search Tasks" onKeyUp={(e: any) => {handleSearch(e.target.value)}} />
      {formEls.users ? <Select className="user-dropdown" placeholder="User" 
      options={formEls.users} onChange={(e: any) => {filterTodos(e.value, 'id')}} /> : null}
      <div className="check-wrapper">
        <p>Completed:</p>
      <Checkbox
        checked={check}
        onChange={(e: any) => {setCheck((initialValue: any) => !initialValue); filterTodos(e.target.checked, 'check')}}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      </div>
  </div>
);
}

export default Filter;