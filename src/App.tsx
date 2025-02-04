import { useState } from 'react';
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

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [todolistId: string]: Array<TaskType>
}

export function App() {
    // data
const todolistId1 = v1()
const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ]
    )

    const [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
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
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: "Milk",
                isDone: true
            },
            {
                id: v1(),
                title: "Water",
                isDone: true
            },
            {
                id: v1(),
                title: "Juice",
                isDone: false
            },
        ],
    })

    // BLL - business logic

    const removeTask = (taskId: string, todolistId: string) => {
        const curentTaskList = tasks[todolistId]
        const newTodolistTask = curentTaskList.filter(t => t.id !== taskId)
        tasks[todolistId] = newTodolistTask
        setTasks({...tasks})
    }
    const removeTodoList = (todolistId: string) => {
        setTodolists(todolists.filter(t=>t.id!==todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const changeTodoListFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist))
    }

    const createTask = (title: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.map(t => t.id === taskId ? { ...t, isDone: newStatus } : t)
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todolists.map(t => {
                    const todolistTasks = tasks[t.id]
                    let filteredTask = todolistTasks
                    if (t.filter === "active") {
                        filteredTask = todolistTasks.filter(item => !item.isDone)
                    }
                    if (t.filter === "completed") {
                        filteredTask = todolistTasks.filter(item => item.isDone)
                    }
                    return (
                        <TodoList
                            key={t.id}
                            todolist={t}
                            tasks={filteredTask}
                            removeTask={removeTask}
                            changeTodoListFilter={changeTodoListFilter}
                            createTask={createTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }
        </div>
    );
}


