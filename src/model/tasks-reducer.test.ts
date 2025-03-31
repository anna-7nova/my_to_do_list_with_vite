import { beforeEach, expect, test } from "vitest";
import { TasksType } from "../App";
import { v1 } from "uuid";
import { changeStatusTaskAC, createTaskAC, removeTaskAC, tasksReducer, updateTitleTaskAC } from "./tasks-reducer";
import { createNewTodolistAC, removeTodolistAC } from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: TasksType = {}

beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
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
                title: "English",
                isDone: true
            },
            {
                id: v1(),
                title: "CV",
                isDone: true
            },
            {
                id: v1(),
                title: "Cover letter",
                isDone: false
            },
        ],
    }
})

test("correct list of task should be deleted 1 position",()=>{
const endState = tasksReducer(startState, removeTaskAC(startState[todolistId2][1].id, todolistId2))

expect(endState[todolistId2].length).toBe(2)
expect(endState[todolistId2][1].title).toBe("Cover letter")
})

test("correct list of task should add 1 task",()=>{
const endState = tasksReducer(startState, createTaskAC("New task", todolistId1))

expect(endState[todolistId1].length).toBe(4)
expect(endState[todolistId1][3].title).toBe("New task")
})

test("correct list of task should change status of task",()=>{
const endState = tasksReducer(startState, changeStatusTaskAC( startState[todolistId1][0].id, false, todolistId1))

expect(endState[todolistId1].length).toBe(3)
expect(endState[todolistId1][0].isDone).toBe(false)
})

test("correct list of task should update the title",()=>{
const endState = tasksReducer(startState, updateTitleTaskAC( todolistId1, startState[todolistId1][0].id, "aaa"))

expect(endState[todolistId1].length).toBe(3)
expect(endState[todolistId1][0].title).toBe("aaa")
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createNewTodolistAC("new todolist"))
   
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
      throw Error('New key should be added')
    }
   
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
  })

  test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, removeTodolistAC(todolistId2))
   
    const keys = Object.keys(endState)
   
    expect(keys.length).toBe(1)
    expect(endState[todolistId2]).not.toBeDefined()
    // or
    expect(endState[todolistId2]).toBeUndefined()
  })