import type { Task } from "../../types/task.types.ts"
import { ListItem, Checkbox, ListItemText, IconButton, Button, Box, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
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
                <Box display="flex" alignItems="center" gap={1}>
                    { visible && <TextField size="small" value={value} onChange={(e) => setValue(e.target.value)}/> }
                    { visible && <Button
                        onClick={() => {
                            props.onEdit(props.task.id, value)
                            setVisible(false)
                        }}
                        startIcon={<SaveIcon />}
                        size='small'
                    >Сохранить
                    </Button> }
                    <Button onClick={() => {
                        setVisible(true)
                        setValue(props.task.title)
                    }}
                            startIcon={<EditIcon/>}
                            size='small'
                    >Изменить</Button>
                    <IconButton edge="end" onClick={() => props.onDelete(props.task.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            }
        >

            <Checkbox
                edge="start"
                checked={props.task.isDone}
                onChange={() => props.onToggle(props.task.id)}
            />
            { !visible && <ListItemText
                primary={props.task.title}
                style={{
                    textDecoration: props.task.isDone ? 'line-through' : 'none',
                    opacity: props.task.isDone ? 0.5 : 1
                }}
            /> }
        </ListItem>

    )
}

export default TaskCard