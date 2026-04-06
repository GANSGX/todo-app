import type {FilterStatus} from "../../types/task.types.ts";
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

interface TaskFilterProps {
    currentFilter: FilterStatus;
    onFilterChange: (status: FilterStatus) => void;
}

const TaskFilter = (props: TaskFilterProps) => {


    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <ToggleButtonGroup
                value={props.currentFilter}
                exclusive
                onChange={(_, nextView) => {
                    if (nextView !== null) props.onFilterChange(nextView)
                }}
                color="primary"
            >
                <ToggleButton value="ALL">Все</ToggleButton>
                <ToggleButton value="ACTIVE">Активные</ToggleButton>
                <ToggleButton value="COMPLETED">Выполненные</ToggleButton>
            </ToggleButtonGroup>

        </Box>
    )
}

export default TaskFilter