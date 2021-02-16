import React, { useState } from 'react';
import './../App.css';
import {useSharedModal} from './Filter';
import { Button } from '@material-ui/core';

  const AddTask: React.FC = () => {

    const { modalState, changeModal }: any = useSharedModal();
    
    return (
        <Button className='add-task-button' onClick={(e: any) => { changeModal({'status': true, 'todo': '', 'addTask': true})}}>
            Add Task
        </Button>
    );
  };

  export default AddTask