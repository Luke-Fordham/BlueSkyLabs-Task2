import React, {useContext, useEffect, useState} from 'react';
import logo from './logo.svg';
import './../App.css';
import { FormContext } from './FormContext';

const TaskList: React.FC = () => {
    const now = new Date();
    const {form, setForm}: any = useContext(FormContext);
    //const {form}: any = useContext(FormContext);
    const [view, refreshView] = useState({});


    useEffect(() => {
        console.log(form);
        console.log('changed')
    }, [setForm, form, view])

  return (
      
    <div className="TaskList">
                { form.users ? <pre>{JSON.stringify(form.users)}</pre> : null}
            { form.todos ? <pre>{JSON.stringify(form.todos)}</pre>: null }
        <button onClick={
            () => {
                let formData: any = form; 
                formData.test = {"time": now.getTime()}; 
                setForm(formData)
                refreshView({})}}>
                    click me
                </button>
                { form.test ? <pre>{JSON.stringify(form.test)}</pre>: null }
    </div>
  );
}

export default TaskList;
