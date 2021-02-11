import React, { useState } from 'react';
import './../App.css';
import {useSharedForm} from './Form';
import {useSharedModal} from './Filter';
import { Button, Card, TextField } from '@material-ui/core';


  const Modal: React.FC = () => {

    const { formModel, add }: any = useSharedForm();
    const { modalState, changeModal }: any = useSharedModal();

    const [input, setInput]: any = useState('');

    function handleSave() {
        let newModel: any = [];
        newModel['users'] = formModel.users;
        newModel['todos'] = formModel.todos;
        let todo = newModel.todos.find((obj: any) => obj.id === modalState.todo.id);
        todo.name = input;
        add(newModel)
        changeModal({'status': false, 'todo': ''})
    }
    
    return (
        <div className='modal-container'>
            <div onClick={(e: any) => { changeModal({'status': false, 'todo': ''})}} className="edit-modal">
            </div>
            <Card className="edit-card">
                <div className="edit-input-wrapper">
                <p>Enter new project name</p>
                <TextField onKeyUp={(e: any) => {setInput(e.target.value)}} placeholder={modalState.todo.name}></TextField>
                <div className="edit-btn-wrapper">
                    <Button onClick={handleSave}>Save</Button><Button onClick={(e: any) => { changeModal({'status': false, 'todo': ''})}}>Cancel</Button>
                </div>
                </div>
            </Card>
        </div>
    );
  };

  export default Modal