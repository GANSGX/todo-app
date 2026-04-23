import { useState } from "react";
import { TextField, Button, Box } from '@mui/material';

interface AddTaskProps {
    onAdd: (title:string) => void;
}

const AddTask = (props: AddTaskProps) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    return (
        <Box display="flex" gap={2} mb={4} flexDirection={"column"}>
            <TextField
                fullWidth
                label="Новая задача"
                variant="outlined"
                value={input}
                onChange={(e) => {
                    setError(false)
                    setInput(e.target.value)
                }}
                error={error}
                helperText={error ? 'Поле ввода не может быть пустым или состоять из пробелов!' : ''}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                    if (input.trim().length < 1) {
                        setError(true)
                        return
                    }
                    props.onAdd(input);
                    setInput('')
                }}
                disabled={input.length === 0}
            >
                Добавить
            </Button>
        </Box>
    )
}

export default AddTask