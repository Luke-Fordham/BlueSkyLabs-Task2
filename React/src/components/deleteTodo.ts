
    const deleteTodo = async (todo: any) => {
        try{
            const settings = {
            method: "DELETE",
            body: JSON.stringify(todo),
            params: {"id": todo.id}
            };

            const response = await fetch(`api/todo/${todo.id}/delete`, settings);
            const status = await response.json();
            console.log('status of delete request:', status)
            const success: any = {"status": true};
            return success;
        } 
        // catch errors
        catch (e) {
            console.log(e);
            return false;
        }
    }

    export {deleteTodo}