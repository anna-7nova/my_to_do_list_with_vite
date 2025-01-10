import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

//CRUD
// - repeat, duplicate
// - create clear structure
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export function App() {
    // data

    const todolistTitle = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {
            id: 1,
            title: "HTML&CSS",
            isDone: true
        },
        {
            id: 2,
            title: "JS",
            isDone: true
        },
        {
            id: 3,
            title: "React",
            isDone: false
        },
    ])

        // BLL - business logic

    const removeTask = (taskId: number) => {
        const nextState = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
        // console.log(tasks_1)
    }

    const changeTodoListFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }

    const createTask = (title: string) => {
      const newTask: TaskType = {
        id: 4,
        title: title,
        isDone: false  
      }
      const newArray: Array<TaskType> = [newTask, ...tasks]
      setTasks(newArray)
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
            <TodoList changeTodoListFilter={changeTodoListFilter} removeTask={removeTask} title={todolistTitle} tasks={filteredTask} createTask={createTask}/>
        </div>
    );
}

