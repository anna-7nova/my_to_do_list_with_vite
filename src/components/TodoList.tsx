import React from 'react';
import { FilterValuesType, TaskType } from '../App';
import { Button } from './Button';
import {TodoComponentHeader} from './TodoComponentHeader'
import { AddForm } from './AddForm';
import { FiltersButtons } from './FiltersButtons';

type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (nextFilter: FilterValuesType) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
    filter: FilterValuesType

}

export const TodoList = (props: TodoListPropsType) => {
    //условный рендеринг
    const taskList = props.tasks.length === 0
        ? <span>List is empty</span>
        : <ul>
            {
                props.tasks.map(t => {
                    const removeTaskHandler = () => props.removeTask(t.id)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={(e)=>props.changeTaskStatus(t.id, e.currentTarget.checked)}/> 
                            <span className={t.isDone ? "task-done" : "task"}>{t.title}</span>
                            <Button onClickHandler={removeTaskHandler} title={"x"}/>
                        </li>
                        )
                })
            }       
        </ul> 

    return (
        <div className="todoList">
            <TodoComponentHeader title={props.title}/>
            <AddForm createTask={props.createTask}/>
            {taskList}
            <FiltersButtons changeTodoListFilter={props.changeTodoListFilter} filter={props.filter}/>
        </div>
    );
}


