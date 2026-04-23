import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { Task } from '../types/task.types'
import axios from 'axios'

interface TodoState {
    todos: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async ({ page, limit }) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
    return res.data
})

export const deleteTodos = createAsyncThunk('todos/deleteTodos', async (id: number) => {
    const res = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    return id
})

export const addTodo = createAsyncThunk('todos/addTodo', async (title: string) => {
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos/', { title })
    return res.data
})

export const putTodo = createAsyncThunk('todos/putTodo', async ({ id, title }: { id: number, title: string }) => {
    const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {title})
    return { id, title }
})

const todosSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false
                state.todos = action.payload
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Ошибка'
            })
            .addCase(deleteTodos.fulfilled, (state, action) => {
                state.loading = false
                state.todos = state.todos.filter((task) => task.id !== action.payload)
            })
            .addCase(deleteTodos.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Ошибка'
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.loading = false
                state.todos.push(action.payload)
            })
            .addCase(putTodo.fulfilled, (state, action) => {
                state.loading = false
                state.todos = state.todos.map((task) => (
                    task.id === action.payload.id ? { ...task, title: action.payload.title } : task
                ))
            })
    }
})


export default todosSlice.reducer

