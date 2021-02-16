
    const createTodo = async (todo: any) => {
        if (todo.user && todo.name && todo.id && todo.isComplete !== ( null || '') ){
            console.log('all fields valid')
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
        } else {
            console.log('missing field')
            return false;
        }
    }

    export {createTodo}