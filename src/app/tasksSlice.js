import { createSlice } from '@reduxjs/toolkit'

// { todo: "Ali Task", key: 1, state: "view" }, { todo: "Abdullah Task", key: 2, state: "view" }, { todo: "Nouman Task", key: 3, state: "view" }
const initialState = {
    tasks: [],
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            //console.log(action.payload)
            action.payload.todo && state.tasks.push(action.payload)
        },
        deleteTask: (state, action) => {
            //console.log(action.payload);
            const removeIndex = state.tasks.map(item => item.key).indexOf(action.payload.key);

            ~removeIndex && state.tasks.splice(removeIndex, 1);
            //state.value += action.payload
        },
        editTask: (state, action) => {
            //console.log("editTask", action.payload);
            var removeIndex = state.tasks.map(item => item.key).indexOf(action.payload.key);
            state.tasks[removeIndex]["todo"] = action.payload.todo;
            state.tasks[removeIndex]["state"] = "view";
        },
        updateTaskStatus: (state, action) => {
            //console.log(action.payload);
            const updateIndex = state.tasks.map(item => item.key).indexOf(action.payload.key);
            state.tasks[updateIndex]["state"] = action.payload.state || "edit"
        }
    },
})

export const { addTask, deleteTask, updateTaskStatus, editTask} = tasksSlice.actions

export default tasksSlice.reducer