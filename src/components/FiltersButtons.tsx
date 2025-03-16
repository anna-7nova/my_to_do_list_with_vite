import Button from '@mui/material/Button';
import { FilterValuesType } from '../App';

type FilterButton = {
    changeTodoListFilter: (todolistId: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    todolistsId: string
}

export const FiltersButtons = ({ changeTodoListFilter, filter, todolistsId }: FilterButton) => {
    const changeTodoListFilterHandler = (filter: FilterValuesType) => {
        changeTodoListFilter(todolistsId, filter)
    }
    return (
        <div>
            <Button onClick={() => changeTodoListFilterHandler("all")} variant={filter === "all" ? "contained" : "outlined"}>All</Button>
            <Button onClick={() => changeTodoListFilterHandler("active")} variant={filter === "active" ? "contained" : "outlined"}>Active</Button>
            <Button onClick={() => changeTodoListFilterHandler("completed")} variant={filter === "completed" ? "contained" : "outlined"}>Completed</Button>
        </div>
    );
}


