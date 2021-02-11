import React, { useState } from 'react';
import './../App.css';
import { useBetween } from 'use-between';
import Filter from './Filter';
import { List } from '@material-ui/core';

const useForm = () => {
    const [formModel, setForm]: any = useState([]);
    const [formView, setFormView]: any = useState([]);
    const [formEls, setFormEls]: any = useState([]);
    const add = (value: any) => {setForm(value);} 
    const addEls = (value: any) => {setFormEls(value);} 
    const setView = (value: any) => {setFormView(value);} 
    return ({formModel, add, formEls, addEls, formView, setView});
}


  export const useSharedForm = () => useBetween(useForm);
  
  const TaskList: React.FC = () => {

    const { formEls }: any = useSharedForm();
    
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
    </>
  );

  export default Form;