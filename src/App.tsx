import {useEffect, useState} from "react";
import type {Task, FilterStatus} from "./types/task.types.ts"
import AddTask from "./components/AddTask/AddTask.tsx";
import TaskList from "./components/TaskList/TaskList.tsx";
import TaskFilter from "./components/TaskFilter/TaskFilter.tsx";
import { Container, Typography } from '@mui/material';


const App = () => {

    const [task, setTask] = useState<Task[]>(() => {
        const savedData = localStorage.getItem('tasks')
        return savedData ? (JSON.parse(savedData) as Task[]) :  []
    });
    const [filter, setFilter] = useState<FilterStatus>('ALL');



    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(task));
    }, [task])

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
            <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
            <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
        </Container>
    )
}

export default App
