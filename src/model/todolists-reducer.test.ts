import {test, expect, beforeEach} from 'vitest'
import { createNewTodolistAC, filteredTodolistAC, removeTodolistAC, todolistsReducer, updateTitleTodolistAC } from './todolists-reducer';
import { TodolistType } from '../App';
import { nanoid } from '@reduxjs/toolkit';

let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(()=>{
todolistId1 = nanoid();
todolistId2 = nanoid();

// 1. Стартовый state
startState = [
  { id: todolistId1, title: "What to learn", filter: "all" },
  { id: todolistId2, title: "What to improve", filter: "all" },
];
})

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC({todolistId: todolistId1}));
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should have the new result', () => {
  const endState = todolistsReducer(startState, createNewTodolistAC({title: "new title", todolistId: nanoid()}));
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("new title");
});

test('correct todolist should change filter to complete', () => {
  const endState = todolistsReducer(startState, filteredTodolistAC({todolistId: todolistId1, filter: "completed"}));
  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe("completed");
  expect(endState[1].filter).toBe("all");
});

test('correct todolist should update the name of the todolist', () => {
  // 2. Действие
  const endState = todolistsReducer(startState, updateTitleTodolistAC({todolistId: todolistId2, title: "What to use"}));
  expect(endState.length).toBe(2);
  expect(endState[1].title).toBe("What to use");
  expect(endState[1].id).toBe(todolistId2);
});

