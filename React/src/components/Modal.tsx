import React, { useState } from 'react';
import './../App.css';
import {useSharedForm} from './Form';
import {useSharedModal} from './Filter';
import Select from 'react-select';
import { Button, Card, TextField } from '@material-ui/core';
import {updateTodo} from './updateTodo'
import {createTodo} from './createTodo'

  const Modal: React.FC = () => {

    const { formModel, add }: any = useSharedForm();
    const { formEls }: any = useSharedForm();
    const { modalState, changeModal }: any = useSharedModal();

    const [input, setInput]: any = useState('');
    const [user, setUser]: any = useState('');
    const [checkbox]: any = useState(false);


    async function handleSave() {
        let newModel: any = [];
        newModel['users'] = formModel.users;
        newModel['todos'] = formModel.todos;
        let todo = newModel.todos.find((obj: any) => obj.id === modalState.todo.id);
        const initialName = todo.name;
        todo.name = input;
        const test = await updateTodo(todo);
        if (test.status) {
            // set todo to object returned from put request
            todo = test.newTodo;
            // update model
            add(newModel)
        } else {
            todo.name = initialName;
            changeModal({'status': true, 'message': 'ERROR: could not update project'})
        }
    }

    async function handleAdd() {
        let newTodo: any = {};
        newTodo['isComplete'] = checkbox;
        newTodo['name'] = input;
        // const todoIndex = (formModel.todos.length + 1)
        // newTodo['id'] = todoIndex;
        const newId = formModel.todos.reduce(function(prev: any, current: any) {
            if (+current.id > +prev.id) {
                return current;
            } else {
                return prev;
            }
        });
        newTodo['id'] = parseInt(newId.id) + 1;
        console.log('id is ', newId)
        newTodo['user'] = user;
        const test = await createTodo(newTodo);
        if (test.status) {
            let newModel: any = [];
            newModel['users'] = formModel.users;
            newModel['todos'] = formModel.todos;
            // set todo to object returned from put request
            const todo = test.newTodo.todo;
            newModel.todos.push(todo)
            // update model
;            add(newModel)
        } else {
            changeModal({'status': true, 'message': 'ERROR: could not add task'})
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
                    { modalState.addTask ? 
                    <div>
                        <Select className="user-dropdown-add" placeholder="User" options={formEls.users.filter((obj: any) => obj.label !== "All Users")} onChange={(e: any) => {setUser(e.value)}} />
                        <Button onClick={() => {handleAdd(); changeModal({'status': false, 'todo': ''})}}>Add</Button>
                        <Button onClick={(e: any) => { changeModal({'status': false, 'todo': ''})}}>Cancel</Button>
                    </div>  :      
                    <div>
                        <Button onClick={() => {handleSave(); changeModal({'status': false, 'todo': ''})}}>Save</Button>
                        <Button onClick={(e: any) => { changeModal({'status': false, 'todo': ''})}}>Cancel</Button>
                    </div> }
                </div>
                </div>  }
                </div>
            </Card>
        </div>
    );
  };

  export default Modal