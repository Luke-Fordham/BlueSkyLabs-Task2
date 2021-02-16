import React, { useEffect, useState } from 'react';
import './../App.css';
import { useBetween } from 'use-between';
import {useSharedForm} from './Form';
import Modal from './Modal';
import Select from 'react-select';
import { Checkbox, ListItem, TextField, Card} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { updateTodo } from './updateTodo';


// declare moduel types
declare module 'react' {
  interface HTMLProps<T> {
     value?:string;
 }
}

// shared modal state function
const useModal = () => {
  const [modalState, setModal] : any = useState({"todo": '', "status": false});
  const changeModal = (value: any) => {setModal(value);} 
  return ({modalState, changeModal});
}
export const useSharedModal = () => useBetween(useModal);

// FILTER COMPONENT ---------------------------------------------------------------------------------------
const Filter: React.FC = () => {

  // filter checkbox state
  const [check, setCheck]: any = useState(false);

  // use-between functions destructuring
  const { formModel, add }: any = useSharedForm();
  const { formView, setView }: any = useSharedForm();
  const { formEls, addEls }: any = useSharedForm();
  const {modalState, changeModal}: any = useSharedModal()
  
  // Create task html elements from todo list as (data)
  function createEls(data: any, identifier: any) {
    const todoEls: any = [];
    // create html element for each todo if the item isn't undefined
    data.forEach((item: any) => {
      const newModel: any = [];
      newModel['todos'] = formModel.todos;
      newModel['users'] = formModel.users;
      // handle change function 
      async function handleChange(event: any) {
        // find todo object in view state
        let todo = newModel.todos.find((obj: any) => obj.id === item.id);
        // set isComplete to status of checkbox
        todo.isComplete = event.target.checked;
        // run PUT request with the todo object and return true if successful
        add(newModel);
        const test = await updateTodo(item);
        // if PUT request successful, update the view
        if (test.status) {
          // set todo to object returned from put request
          todo = test.newTodo;
          // update view
          add(newModel);
      }
      }
      // opens edit modal 
      function openEdit() {
        changeModal({"status": true, "todo": item})
      }
      // if the todo isn't undefined
      if (item !== undefined) {
        const id = item.id;
        // set isComplete status to 
        const status = formView.todos.find((obj: any) => obj.id === id).isComplete;
        //console.log(status.isComplete)
        // push todo html element to todoEls array
        todoEls.push(
          <ListItem key={item.id} className={`${identifier}-${item.id}`}>
            <Card>
          <div className="todo-title-wrapper"><h3>{item.name}</h3><EditIcon className='edit-icon' onClick={openEdit}></EditIcon></div>
          <p className='user-name'>{findUser(item.user)}</p>
              <div className="check-wrapper">
                <p>Completed:</p>
                <Checkbox
                  checked={status}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </div>
            </Card>
        </ListItem>
        )
      }
  })
  // return the array of todo html elements
    return todoEls;
  }

  // initialise filter state
  const [filter, setFilter] : any = useState([]);

// FILTER TODOS FUNCTION ------------------------------------------------------------------------------------------------------------------------------------
// filter the tasks and reset the view state -- key: keyword (searchbar) / user Id (dropdown filter) -- input: defines type of search
const filterTodos = (key: any, input: any) => {
  let filterArray: any = [];
  let result: any = '';
  const formData: any = [];
  // if the input is id (user dropdown)
  if (input === 'id'){
    let todos = formModel.todos;
    filterArray = filter;
    filterArray['id'] = key;
    // set state of filter to include id param
    setFilter(filterArray)
    // if the filter has a check param
    if (filter.check === true) {
      // set todos to only the todos that are checked
      todos = formModel.todos.filter((obj: any) => obj.isComplete === filter.check);
    }
    //console.log('filter is', filter)
    // set result to todos that either match the key user id OR the array of user ids includes the todo.user id
    result = todos.filter((obj: any) => obj.user === key || key.includes(obj.user));
    // set the users in formdata to include only the user selected in the user dropdown
    formData['users'] = formModel.users.filter((obj: any) => obj.id === key || key.includes(obj.id));
  } 
  // if the input is a keyword (searchbar)
  if (input ==='keyword') {
    // set todos to the todos in the model
    let todos = formModel.todos;
    // if there is an id filter and a check filter 
    if (filter.id && filter.check) {
      // set todos to todos where the 'isComplete' value and the 'user' value are equal to the filter params
      todos = formModel.todos.filter((obj: any) => obj.isComplete === filter.check && ( obj.user === filter.id || filter.id.includes(obj.user)));
    } else 
    // else if the filter has an id param
    if (filter.id) {
      // find todos that match the id filter param
      todos = formModel.todos.filter((obj: any) => obj.user === filter.id || filter.id.includes(obj.user));
    } else
    // else if there is a check param
    if (filter.check) {
      // set todos to the todos that match the check filter param
      todos = formModel.todos.filter((obj: any) => obj.isComplete === filter.check);
    }
    
    // set result to all the todos (already filtered by user dropdown/checkbox) that include the search keyword/letters
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
  // if the input type is 'check'
  if (input === 'check') {
    filterArray = filter;
    filterArray['check'] = key;
    // set todos to todos in model state
    let todos = formModel.todos;
    // set the filter state to the filterArray
    setFilter(filterArray)
    // if the filter has an id param
    if (filter.id) {
      // find todos that match the id filter param
      todos = formModel.todos.filter((obj: any) => obj.user === filter.id || filter.id.includes(obj.user));
    }
    //console.log("key is", key)
    // if the check is 'true'
    if (key === true){
      // set result to the todos that are completed
      result = todos.filter((obj: any) => obj.isComplete === key);
    } else {
      // else set the todos to all todos
      result = todos;
    }


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
  const result = formModel.users.find((obj: any) => obj.id === key);
  // return a string of the user's first and last name
  return result.firstName + ' ' + result.lastName;
}

    // fetchData function
    const fetchData: VoidFunction = async () => {
      const formData: any = [];
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
        // setView(formData);
    }

// runs when the component mounts
  useEffect(()=> {
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
    if (filter.id) {
      filterTodos(filter.id, 'id')
    } else if (filter.check){
      filterTodos(filter.check, 'check')
    }
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
      { modalState.status === true ? <Modal /> : null}
      <TextField className="searchbar" label="Search Tasks" onKeyUp={(e: any) => {handleSearch(e.target.value.toLowerCase())}} />
      {formEls.users ? <Select className="user-dropdown" placeholder="User" 
      options={formEls.users} onChange={(e: any) => {filterTodos(e.value, 'id')}} /> : null}
      <div className="check-wrapper">
        <p>Only show completed:</p>
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