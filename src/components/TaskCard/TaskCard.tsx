import type { Task } from "../../types/task.types.ts"
import { ListItem, Checkbox, ListItemText, IconButton } from '@mui/material';
import { useState } from "react";

interface TaskPropsCard {
    task: Task;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (id: number, title: string) => void;
}

const TaskCard = (props: TaskPropsCard) =>  {

    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');


    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" onClick={() => props.onDelete(props.task.id)}>
                    Удалить
                </IconButton>
            }
        >
            { visible && <input value={value} onChange={(e) => setValue(e.target.value)}/> }
            { visible && <button onClick={() => {
                props.onEdit(props.task.id, value)
                setVisible(false)
            }}>Сохранить</button> }
            <button onClick={() => {
                setVisible(true)
                setValue(props.task.title)
            }}>Изменить</button>
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