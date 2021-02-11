import React, { useCallback, useState } from 'react';
import './../App.css';
import {useSharedForm} from './Form';
import {useSharedModal} from './Filter';
import { Button, Card, TextField } from '@material-ui/core';
import {updateTodo} from './updateTodo'

  const Modal: React.FC = () => {

    const { formModel, add }: any = useSharedForm();
    const { modalState, changeModal }: any = useSharedModal();

    const [input, setInput]: any = useState('');


    async function handleSave() {
        let newModel: any = [];
        newModel['users'] = formModel.users;
        newModel['todos'] = formModel.todos;
        let todo = newModel.todos.find((obj: any) => obj.id === modalState.todo.id);
        todo.name = input;
        const test = await updateTodo(todo);
        if (test.status) {
            // set todo to object returned from put request
            todo = test.newTodo;
            // update model
;            add(newModel)
        } else {
            changeModal({'status': true, 'message': 'ERROR: could not update project'})
        }
    }
    
    return (
        <div className='modal-container'>
            <div onClick={(e: any) => { changeModal({'status': false, 'todo': ''})}} className="edit-modal">
            </div>
            <Card className="edit-card">
                <div className="edit-input-wrapper">
                {modalState.message ? <h4>{modalState.message}</h4> : <div>
                <p>Enter new project name</p>
                <TextField className="edit-input" onKeyUp={(e: any) => {setInput(e.target.value)}} placeholder={modalState.todo.name}></TextField>
                <div className="edit-btn-wrapper">
                    <Button onClick={() => {handleSave(); changeModal({'status': false, 'todo': ''})}}>Save</Button><Button onClick={(e: any) => { changeModal({'status': false, 'todo': ''})}}>Cancel</Button>
                </div>
                </div>  }
                </div>
            </Card>
        </div>
    );
  };

  export default Modal