
    const createTodo = async (todo: any) => {
        try{
            const settings = {
            method: "POST",
            body: JSON.stringify(todo),
            };

            const response = await fetch('api/todo/create', settings);
            const newTodo = await response.json();
            console.log('new todo is:', newTodo)
            const success: any = {"status": true, "newTodo": newTodo};
            return success;
        } 
        // catch errors
        catch (e) {
            console.log(e);
            return false;
        }
    }

    export {createTodo}