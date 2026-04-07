import {useState} from "react";
import type {Task, FilterStatus} from "./types/task.types.ts"
import AddTask from "./components/AddTask/AddTask.tsx";
import TaskList from "./components/TaskList/TaskList.tsx";
import TaskFilter from "./components/TaskFilter/TaskFilter.tsx";
import { Container, Typography } from '@mui/material';
import { useLocalStorage } from "./hooks/useLocalStorage.ts";
import { useTheme } from "./context/useTheme.ts";
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline, Button } from "@mui/material";




const App = () => {

    const [task, setTask] = useLocalStorage<Task[]>('tasks', [])
    const [filter, setFilter] = useState<FilterStatus>('ALL');

    const {
        theme,
        toggleTheme,
    } = useTheme();

    const muiTheme = createTheme({ palette: { mode: theme as 'light' | 'dark' } });

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
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline/>
            <Container maxWidth="sm">
                <Typography variant="h3" align="center" gutterBottom>
                    Todo App
                </Typography>
                <Button onClick={() => toggleTheme()}>Сменить тему</Button>
                <span>Текущая тема: {theme.toUpperCase()}</span>
                <AddTask onAdd={addTask} />
                <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} onEdit={editTask}/>
                <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
            </Container>
        </MuiThemeProvider>
    )
}

export default App
