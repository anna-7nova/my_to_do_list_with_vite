import Button from '@mui/material/Button';
import { FilterValuesType, type TodolistType } from '../app/App';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { updateFilterTodolistAC } from '../model/todolists-reducer';
import type React from 'react';

type Props = {
    todolist: TodolistType
}

export const FiltersButtons: React.FC<Props> = ({ todolist }: Props) => {
    const { id, filter } = todolist
    const dispatch = useAppDispatch()

    const changeTodoListFilterHandler = (filter: FilterValuesType) => {
        dispatch(updateFilterTodolistAC({ todolistId: id, filter }))
    }
    return (
        <div>
            <Button onClick={() => changeTodoListFilterHandler("all")} variant={filter === "all" ? "contained" : "outlined"}>All</Button>
            <Button onClick={() => changeTodoListFilterHandler("active")} variant={filter === "active" ? "contained" : "outlined"}>Active</Button>
            <Button onClick={() => changeTodoListFilterHandler("completed")} variant={filter === "completed" ? "contained" : "outlined"}>Completed</Button>
        </div>
    );
}


