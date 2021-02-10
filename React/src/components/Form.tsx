import React, { useState } from 'react';
import './../App.css';
import { useBetween } from 'use-between';
import Filter from './Filter2';
import { List, ListItem } from '@material-ui/core';

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
  export const useSharedFormEls = () => useBetween(useForm);

  const TaskList: React.FC = () => {
    //const { formModel }: any = useSharedForm();
    const { formEls }: any = useSharedFormEls();
    //const { formView }: any = useSharedFormEls();
    
    return (
        <div>
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