import React, { useState } from 'react';
import './../App.css';
import { useBetween } from 'use-between';
import Filter from './Filter';

const useForm = () => {
    const [form, setForm]: any = useState([]);
    const add = (value: any) => {setForm(value);} 
    return ({form, add});
}


  export const useSharedForm = () => useBetween(useForm);

  const List: React.FC = () => {
    const { form }: any = useSharedForm();

    
    return (
        <div>
        { form.users ? <pre>{JSON.stringify(form.users)}</pre> : null}
        { form.todos ? <pre>{JSON.stringify(form.todos)}</pre>: null }
        { form.name ? <pre>{JSON.stringify(form.name)}</pre>: null }
        <pre>{form}</pre>
        </div>
    );
  };


  const Form = () => (
    <>
    <List />
    <Filter />
    </>
  );

  export default Form;