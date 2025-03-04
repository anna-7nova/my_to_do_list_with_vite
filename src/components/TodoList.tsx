import { FilterValuesType, TaskType, TodolistType } from '../App';
import { Button } from './Button';
import { TodoComponentHeader } from './TodoComponentHeader'
import { AddForm } from './AddForm';
import { FiltersButtons } from './FiltersButtons';
import { ChangeEvent } from 'react';

type TodoListPropsType = {
    todolist: TodolistType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTodoListFilter: (todolistId: string, filter: FilterValuesType) => void
    createTask: (title: string, itemId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    removeTodoList: (todolistId: string) => void
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
                            <span className={t.isDone ? "task-done" : "task"}>{t.title}</span>
                            <Button onClickHandler={removeTaskHandler} title={"x"} />
                        </li>
                    )
                })
            }
        </ul>

    return (
        <div className="todoList">
            <TodoComponentHeader title={props.todolist.title} onClick={()=>props.removeTodoList(props.todolist.id)}/>
            <AddForm createNewItem={props.createTask} itemId={props.todolist.id} />
            {taskList}
            <FiltersButtons changeTodoListFilter={props.changeTodoListFilter} filter={props.todolist.filter} todolistsId={props.todolist.id} />
        </div>
    );
}


