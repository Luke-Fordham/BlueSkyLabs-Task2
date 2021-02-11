
    const updateTodo = async (todo: any) => {
        try{
            const settings = {
            method: "PUT",
            body: JSON.stringify(todo),
            params: {"id": todo.id}
            };

            const response = await fetch(`api/todo/${todo.id}/update`, settings);
            const status = await response.json();
            console.log('status of put request:', status)
            const success: any = {"status": true, "newTodo": status.newTodo};
            return success;
        } 
        // catch errors
        catch (e) {
            console.log(e);
            return false;
        }
    }

    export {updateTodo}