import React from 'react';
import { FilterValuesType, TaskType } from '../App';
import { Button } from './Button';
import {TodoComponentHeader} from './TodoComponentHeader'
import { AddForm } from './AddForm';
import { FiltersButtons } from './FiltersButtons';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (nextFilter: FilterValuesType) => void
    createTask: () => void

}

export const TodoList = (props: TodoListPropsType) => {
    //условный рендеринг
    const taskList = props.tasks.length === 0
        ? <span>List is empty</span>
        : <ul>
            {
                props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} /> 
                            <span>{t.title}</span>
                            <Button onClickHandler={() => props.removeTask(t.id)} title={"x"}/>
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
            <FiltersButtons changeTodoListFilter={props.changeTodoListFilter}/>
        </div>
    );
}


