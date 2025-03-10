import { FilterValuesType, TaskType, TodolistType } from '../App';
import { Button } from './Button';
import { TodoComponentHeader } from './TodoComponentHeader'
import { AddForm } from './AddForm';
import { FiltersButtons } from './FiltersButtons';
import { ChangeEvent } from 'react';
import { EditableSpan } from './EditableSpan';

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
    const taskList = props.tasks.length === 0
        ? <span>List is empty</span>
        : <ul>
            {
                props.tasks.map(t => {
                    const removeTaskHandler = () => props.removeTask(t.id, props.todolist.id)
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolist.id)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                            <EditableSpan title={t.title} onClick={(value: string) => onClickHandler(t.id, value)} />
                            <Button onClickHandler={removeTaskHandler} title={"x"} />
                        </li>
                    )
                })
            }
        </ul>
    //handlers
    const removeTodoListHandler = () => props.removeTodoList(props.todolist.id)
    const changeTodoListTitleHandler = (title: string) => props.changeTodoListTitle(props.todolist.id, title)
    const addNewTaskHandler = (title: string) => props.createTask(title, props.todolist.id)
    const onClickHandler = (taskId: string, value: string) => props.changeTaskTitle(props.todolist.id, taskId, value)
    return (
        <div className="todoList">
            <TodoComponentHeader title={props.todolist.title} onClick={removeTodoListHandler} onChange={changeTodoListTitleHandler} />
            <AddForm createNewItem={addNewTaskHandler} />
            {taskList}
            <FiltersButtons changeTodoListFilter={props.changeTodoListFilter} filter={props.todolist.filter} todolistsId={props.todolist.id} />
        </div>
    );
}


