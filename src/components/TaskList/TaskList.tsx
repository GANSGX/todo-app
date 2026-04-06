import type{ Task } from "../../types/task.types.ts"
import TaskCard from "../TaskCard/TaskCard.tsx"
import { List, Paper } from '@mui/material';

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}

const TaskList = (props: TaskListProps) => {


    return (
        <List>
            {props.tasks.map((task) => (
                <Paper key={task.id} elevation={2} sx={{ mb: 2 }}>
                    <TaskCard task={task} key={task.id} onDelete={props.onDelete} onToggle={props.onToggle} />
                </Paper>
            ))}
        </List>

    )
}

export default TaskList;