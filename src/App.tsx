import {useState} from "react";
import type {Task, FilterStatus} from "./types/task.types.ts"
import AddTask from "./components/AddTask/AddTask.tsx";
import TaskList from "./components/TaskList/TaskList.tsx";
import TaskFilter from "./components/TaskFilter/TaskFilter.tsx";
import { Container, Typography } from '@mui/material';
import { useLocalStorage } from "./hooks/useLocalStorage.ts";


const App = () => {

    const [task, setTask] = useLocalStorage<Task[]>('tasks', [])
    const [filter, setFilter] = useState<FilterStatus>('ALL');

    const addTask = (title: string) => {
        setTask(prev => [...prev, {
            id: Date.now(),
            title: title,
            isDone: false,
            createdAt: new Date(),
            priority: 'low',
        }])
    }

    const deleteTask = (id: number) => {
        setTask(prev => prev.filter(task => task.id !== id))
    }

    const toggleTask = (id: number) => {
        setTask(prev => prev.map((task) => (
            task.id === id ? { ...task, isDone: !task.isDone } : task
        )))
    }

    const editTask = (id: number, title: string) => {
        setTask(prev => prev.map((task) => (
            task.id === id ? { ...task, title: title } : task
        )))
    }

    const filteredTasks = task.filter((task) => {
        if (filter === 'ACTIVE') return !task.isDone
        if (filter === 'COMPLETED') return task.isDone
        return true
    })

    return (
        <Container maxWidth="sm">
            <Typography variant="h3" align="center" gutterBottom>
                Todo App
            </Typography>
            <AddTask onAdd={addTask} />
            <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} onEdit={editTask}/>
            <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
        </Container>
    )
}

export default App
