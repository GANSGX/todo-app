import { useState } from "react";
import { TextField, Button, Box } from '@mui/material';

interface AddTaskProps {
    onAdd: (title:string) => void;
}

const AddTask = (props: AddTaskProps) => {
    const [input, setInput] = useState("");

    return (
        <Box display="flex" gap={2} mb={4}>
            <TextField
                fullWidth
                label="Новая задача"
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                    props.onAdd(input);
                    setInput('')
                }}
            >
                Добавить
            </Button>
        </Box>
    )
}

export default AddTask