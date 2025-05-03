import { FilterValuesType, TaskType, TodolistType } from '../App';
import { TodoComponentHeader } from './TodoComponentHeader'
import { AddForm } from './AddForm';
import { FiltersButtons } from './FiltersButtons';
import { ChangeEvent } from 'react';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { cardStyle, listItemStylesSx } from './TodoList.styles';

type TodoListPropsType = {
    todolist: TodolistType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    createTask: (title: string, itemId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    changeTaskTitle: (todolistId: string, itemId: string, title: string) => void
    changeTodoListFilter: (todolistId: string, filter: FilterValuesType) => void
    removeTodoList: (todolistId: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    //условный рендеринг
    const taskList = props.tasks.length===0
        ? <span>List is empty</span>
        : <List>
            {
                props.tasks.map(t => {
                    const removeTaskHandler = () => props.removeTask(t.id, props.todolist.id)
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolist.id)
                    return (
                        <ListItem key={t.id} 
                        sx={listItemStylesSx(t.isDone)}>
                            <div>
                                <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler} />
                                <EditableSpan title={t.title} onClick={(value: string) => onClickHandler(t.id, value)} />
                            </div>
                            <IconButton onClick={removeTaskHandler} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    )
                })
            }
        </List>
    //handlers
    const removeTodoListHandler = () => props.removeTodoList(props.todolist.id)
    const changeTodoListTitleHandler = (title: string) => props.changeTodoListTitle(props.todolist.id, title)
    const addNewTaskHandler = (title: string) => props.createTask(title, props.todolist.id)
    const onClickHandler = (taskId: string, value: string) => props.changeTaskTitle(props.todolist.id, taskId, value)
    return (
        <div className="todoList">
            <Paper elevation={5}>
                <Card variant="outlined" sx={cardStyle}>
                    <CardContent>
                        <TodoComponentHeader title={props.todolist.title} onClick={removeTodoListHandler} onChange={changeTodoListTitleHandler} />
                        <AddForm createNewItem={addNewTaskHandler} />
                        {taskList}
                        <FiltersButtons changeTodoListFilter={props.changeTodoListFilter} filter={props.todolist.filter} todolistsId={props.todolist.id} />
                    </CardContent>
                </Card>
            </Paper>
        </div>
    );
}


