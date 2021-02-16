import React, { useState } from 'react';
import './../App.css';
import { useBetween } from 'use-between';
import Filter from './Filter';
import { List } from '@material-ui/core';
import AddTask from './AddTask';

export interface IUser{
  id: string
  firstName: string
  lastName: string
}

export interface ITodo {
  id: string
  user: string
  name: string
  isComplete: boolean
}

export interface IView {
  users: IUser[]
  todos: ITodo[] 
}


const useForm = () => {
    const [formModel, setForm] = useState<IView>({users:[], todos:[]});
    const [formView, setFormView] = useState<IView>({users:[], todos:[]});
    const [formEls, setFormEls] = useState<IView>({users:[], todos:[]});
    const add = (value: any) => {setForm(value);} 
    const addEls = (value: any) => {setFormEls(value);} 
    const setView = (value: any) => {setFormView(value);} 
    return ({formModel, add, formEls, addEls, formView, setView});
}


  export const useSharedForm = () => useBetween(useForm);
  
  const TaskList: React.FC = () => {

    const { formEls } = useSharedForm();
    
    return (
        <div className='tasks-container'>
          <List>
        { formEls.todos !== undefined ? formEls.todos : null}
        </List>
        </div>
    );
  };


  const Form = () => (
    <>
    <Filter />
    <TaskList />
    <AddTask />
    </>
  );

  export default Form;