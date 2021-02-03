import React, {useEffect} from 'react';
import logo from './logo.svg';
import './../App.css';
import {useSharedForm} from './List';

const TaskList: React.FC = () => {
  const now = new Date();

  const { form, add }: any = useSharedForm();

  const formData: any = [];

  formData['users'] = form.users;
  formData['todos'] = form.users;
  formData['name'] = {"something": now.getTime()};

  console.log('formdata is', formData);
  // const formData = form;
;

  useEffect(() => {
      console.log(form);
      console.log('changed')
  }, [form])

return (
    
  <div className="TaskList">
      <button onClick={ () => {
          add(formData);}}>
            click me
      </button>
  </div>
);
}

export default TaskList;
