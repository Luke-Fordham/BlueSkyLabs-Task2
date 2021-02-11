import React, { useState } from 'react';
import './../App.css';
import {useSharedForm} from './Form';
import {useSharedModal} from './Filter';
import { Card } from '@material-ui/core';


  const Modal: React.FC = () => {

    const { formModel, add }: any = useSharedForm();
    const { modalState, changeModal }: any = useSharedModal();
    
    return (
        <div className='modal-container'>
            <div onClick={(e: any) => { changeModal({'status': false, 'todo': ''})}} className="edit-modal">
            </div>
            <Card className="edit-card">{modalState.todo.name}</Card>
        </div>
    );
  };

  export default Modal