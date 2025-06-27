import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"

//actions
export const removeTodolistAC = createAction<{ todolistId: string }>(
  "todolists/removeTodolist"
);
export const createNewTodolistAC = createAction(
  "todolists/createNewTodolist",
  ({title}) => {
    return { payload: { title, todolistId: nanoid() } };
  }
);
export const updateFilterTodolistAC = createAction<{
  todolistId: string;
  filter: FilterValuesType;
}>("todolists/filteredTodolist");
export const updateTitleTodolistAC = createAction<{
  todolistId: string;
  title: string;
}>("todolists/updateTitleTodolist");

const initialState: TodolistType[] = [];
//reducer
export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(removeTodolistAC, (state, action) => {
      const index = state.findIndex((t) => t.id === action.payload.todolistId);
      if (index !== -1) state.splice(index, 1);
    })
    .addCase(createNewTodolistAC, (state, action) => {
      state.unshift({
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: "all",
      });
    })
    .addCase(updateFilterTodolistAC, (state, action) => {
      const todolist = state.find((t) => t.id === action.payload.todolistId);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    })
    .addCase(updateTitleTodolistAC, (state, action) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todolistId
      );
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    });
});
