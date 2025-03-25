import { v1 } from 'uuid';
import {test, expect} from 'vitest'
import { createNewTodolistAC, filteredTodolistAC, removeTodolistAC, todolistsReducer, updateTitleTodolistAC } from './todolists-reducer';
import { TodolistType } from '../App';


test('correct todolist should be removed', () => {
// initialState
const todolistId1 = v1();
const todolistId2 = v1();

// 1. Стартовый state
const startState: TodolistType[] = [
  { id: todolistId1, title: "What to learn", filter: "all" },
  { id: todolistId2, title: "What to improve", filter: "all" },
];

  // 2. Действие
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется один тудулист
  expect(endState.length).toBe(1);
  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should have the new result', () => {
// initialState
const todolistId1 = v1();
const todolistId2 = v1();

// 1. Стартовый state
const startState: TodolistType[] = [
  { id: todolistId1, title: "What to learn", filter: "all" },
  { id: todolistId2, title: "What to improve", filter: "all" },
];

  // 2. Действие
  const endState = todolistsReducer(startState, createNewTodolistAC("new title"));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("new title");
});

test('correct todolist should change filter to complete', () => {
// initialState
const todolistId1 = v1();
const todolistId2 = v1();

// 1. Стартовый state
const startState: TodolistType[] = [
  { id: todolistId1, title: "What to learn", filter: "all" },
  { id: todolistId2, title: "What to improve", filter: "all" },
];

  // 2. Действие
  const endState = todolistsReducer(startState, filteredTodolistAC(todolistId1, "completed"));

  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe("completed");
  expect(endState[1].filter).toBe("all");
});

test('correct todolist should update the name of the todolist', () => {
// initialState
const todolistId1 = v1();
const todolistId2 = v1();

// 1. Стартовый state
const startState: TodolistType[] = [
  { id: todolistId1, title: "What to learn", filter: "all" },
  { id: todolistId2, title: "What to improve", filter: "all" },
];

  // 2. Действие
  const endState = todolistsReducer(startState, updateTitleTodolistAC(todolistId2, "What to use"));

  expect(endState.length).toBe(2);
  expect(endState[1].title).toBe("What to use");
  expect(endState[1].id).toBe(todolistId2);
});

