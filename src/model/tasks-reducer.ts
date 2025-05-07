import { TasksType } from "../App";
import {
  createNewTodolistAC,
  removeTodolistAC,
} from "./todolists-reducer";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

//actions
export const removeTaskAC = createAction<{
  taskId: string;
  todolistId: string;
}>("tasks/removeTask");
export const createTaskAC = createAction<{ title: string; itemId: string }>(
  "tasks/createTask"
);
export const changeStatusTaskAC = createAction<{
  taskId: string;
  newStatus: boolean;
  todolistId: string;
}>("tasks/changeStatusTask");
export const updateTitleTaskAC = createAction<{
  todolistId: string;
  itemId: string;
  title: string;
}>("tasks/updateTitleTask");

const initialState: TasksType = {};
//reducer
export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(removeTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) state[action.payload.todolistId].splice(index, 1);
      }
    )
    .addCase(createTaskAC, (state, action) => {
      state[action.payload.itemId].unshift({
        id: nanoid(),
        title: action.payload.title,
        isDone: false,
      });
    })
    .addCase(changeStatusTaskAC, (state, action) => {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId);
      if (task) {
        task.isDone = action.payload.newStatus
      }
    })
    .addCase(updateTitleTaskAC, (state, action) => {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.itemId);
      if (task) {
        task.title = action.payload.title
      }
    })
    .addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistId];
    })
    .addCase(createNewTodolistAC, (state, action) => {
      state[action.payload.todolistId] = [];
    });
});

