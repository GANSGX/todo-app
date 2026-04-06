import type { Task } from "../../types/task.types.ts"
import { ListItem, Checkbox, ListItemText, IconButton } from '@mui/material';

interface TaskPropsCard {
    task: Task;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}

const TaskCard = (props: TaskPropsCard) =>  {


    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" onClick={() => props.onDelete(props.task.id)}>
                    Удалить
                </IconButton>
            }
        >
            <Checkbox
                edge="start"
                checked={props.task.isDone}
                onChange={() => props.onToggle(props.task.id)}
            />
            <ListItemText
                primary={props.task.title}
                style={{
                    textDecoration: props.task.isDone ? 'line-through' : 'none',
                    opacity: props.task.isDone ? 0.5 : 1
                }}
            />
        </ListItem>

    )
}

export default TaskCard