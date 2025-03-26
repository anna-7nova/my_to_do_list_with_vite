import { v1 } from 'uuid';
import {test, expect, beforeEach} from 'vitest'
import { createNewTodolistAC, filteredTodolistAC, removeTodolistAC, todolistsReducer, updateTitleTodolistAC } from './todolists-reducer';
import { TodolistType } from '../App';

let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(()=>{
todolistId1 = v1();
todolistId2 = v1();

// 1. Стартовый state
startState = [
  { id: todolistId1, title: "What to learn", filter: "all" },
  { id: todolistId2, title: "What to improve", filter: "all" },
];
})

test('correct todolist should be removed', () => {
  // 2. Действие
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется один тудулист
  expect(endState.length).toBe(1);
  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should have the new result', () => {
  // 2. Действие
  const endState = todolistsReducer(startState, createNewTodolistAC("new title"));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("new title");
});

test('correct todolist should change filter to complete', () => {
  // 2. Действие
  const endState = todolistsReducer(startState, filteredTodolistAC(todolistId1, "completed"));

  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe("completed");
  expect(endState[1].filter).toBe("all");
});

test('correct todolist should update the name of the todolist', () => {
  // 2. Действие
  const endState = todolistsReducer(startState, updateTitleTodolistAC(todolistId2, "What to use"));

  expect(endState.length).toBe(2);
  expect(endState[1].title).toBe("What to use");
  expect(endState[1].id).toBe(todolistId2);
});

