import {useState, useEffect} from "react";
import type {Task, FilterStatus} from "../types/task.types"
import AddTask from "../components/AddTask/AddTask.tsx";
import TaskList from "../components/TaskList/TaskList.tsx";
import TaskFilter from "../components/TaskFilter/TaskFilter.tsx";
import { Container, Typography } from '@mui/material';
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { useTheme } from "../context/useTheme.ts";
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {fetchTodos, deleteTodos, addTodo, putTodo} from "../store/todosSlice";
import type {RootState, AppDispatch} from "../store/store";


const TodosPage = () => {

    const [task, setTask] = useLocalStorage<Task[]>('tasks', [])
    const [filter, setFilter] = useState<FilterStatus>('ALL');

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const {
        theme,
        toggleTheme,
    } = useTheme();

    const muiTheme = createTheme({ palette: { mode: theme as 'light' | 'dark' } });


    const { todos, loading, error } = useSelector((state: RootState) => state.todos)
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {

        dispatch(fetchTodos({ page, limit }))

    }, [dispatch, page, limit])

    const toggleTask = (id: number) => {
        setTask(prev => prev.map((task) => (
            task.id === id ? { ...task, isDone: !task.isDone } : task
        )))
    }

    const filteredTasks = todos.filter((task) => {
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
                <AddTask onAdd={(title) => dispatch(addTodo(title))} />

                <Box display="flex" justifyContent="center" gap={5} mb={5}>
                    <Button onClick={() => setPage(page - 1)} variant="contained"
                            color="primary"
                            size="large"
                            disabled={page === 1}
                    >Предыдущая</Button>
                    <Button onClick={() => setPage(page + 1)} variant="contained"
                            color="primary"
                            size="large">Следующая</Button>
                </Box>
                <Box display='flex' justifyContent='center' gap={5}>
                    <Button onClick={() => { setLimit(5); setPage(1) } }
                            variant="contained"
                            color="primary"
                            size="large"
                    >5 Задач на странице</Button>
                    <Button onClick={() => { setLimit(10); setPage(1) } }
                            variant="contained"
                            color="primary"
                            size="large"
                    >10 Задач на странице</Button>
                    <Button onClick={() => { setLimit(20); setPage(1) } }
                            variant="contained"
                            color="primary"
                            size="large"
                    >20 Задач на странице</Button>
                </Box>
                {loading && <p style={{ textAlign: 'center' }}>Загрузка...</p>}
                {error && <p style={{ textAlign: 'center' }}>Ошибка: {error}</p>}
                <TaskList tasks={filteredTasks} onDelete={(id) => dispatch(deleteTodos(id))} onToggle={toggleTask} onEdit={(id, title) => dispatch(putTodo({id, title}))}/>
                <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
            </Container>
        </MuiThemeProvider>
    )
}

export default TodosPage;
