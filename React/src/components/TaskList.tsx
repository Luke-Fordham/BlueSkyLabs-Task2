import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './../App.css';

const TaskList: React.FC = () => {
    const now = new Date();

    const [form, setForm]: any = useState([]);


    useEffect(() => {
        console.log(form);
        console.log('changed')
    }, [form, setForm])

  return (
      
    <div className="TaskList">

        <button onClick={
            () => {
                let formData: any = form; 
                formData.test = {"time": now.getTime()}; 
                setForm(formData)
                // refreshView({})
                }}>
                    click me
                </button>

    </div>
  );
}

export default TaskList;
