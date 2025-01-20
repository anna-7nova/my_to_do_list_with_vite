import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { v1 } from 'uuid';

//CRUD
// - repeat, duplicate
// - create clear structure
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export function App() {
    // data

    const toDoListTitle = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {
            id: v1(),
            title: "HTML&CSS",
            isDone: true
        },
        {
            id: v1(),
            title: "JS",
            isDone: true
        },
        {
            id: v1(),
            title: "React",
            isDone: false
        },
    ])

        // BLL - business logic

    const removeTask = (taskId: string) => {
        const nextState = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
        // console.log(tasks_1)
    }

    const changeTodoListFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }

    const createTask = (title: string) => {
      const newTask: TaskType = {
        id: v1(),
        title: title,
        isDone: false  
      }
      const newArray: Array<TaskType> = [newTask, ...tasks]
      setTasks(newArray)
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean) => {
        const nextState:Array<TaskType> = tasks.map(t => t.id === taskId ?  {...t, isDone: newStatus} : t)
        setTasks(nextState)
    }

    //UI
    const [filter, setFilter] = useState<FilterValuesType>("all")
    let filteredTask: Array<TaskType> = tasks
    if(filter === "active") {
        filteredTask = tasks.filter(item => !item.isDone)
    }
    if(filter === "completed") {
        filteredTask = tasks.filter(item => item.isDone)
    }

    return (
        <div className="App">
            <TodoList 
            changeTodoListFilter={changeTodoListFilter} 
            removeTask={removeTask} 
            title={toDoListTitle} 
            tasks={filteredTask} 
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            filter={filter}/>
        </div>
    );
}

