import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type CreateNewToodolistActionType = ReturnType<typeof createNewTodolistAC>;
export type FilteredToodolistActionType = ReturnType<typeof filteredTodolistAC>;
export type UpdateTitleActionType = ReturnType<typeof updateTitleTodolistAC>;
export type ActionType = 
RemoveTodolistActionType
| CreateNewToodolistActionType
| FilteredToodolistActionType
| UpdateTitleActionType;

// data
const todolistId1 = v1();
const todolistId2 = v1();

const initialState: TodolistType[] = [
  { id: todolistId1, title: "What to learn", filter: "all" },
  { id: todolistId2, title: "What to improve", filter: "all" },
];

//reducer
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(el=>el.id !== action.payload.id);
    }
    case "ADD-TODOLIST": {
      const newTodoList: TodolistType = { id: action.payload.todolistId, title: action.payload.title, filter: "all" }
      return [newTodoList, ...state];
    }
    case "FILTER-TODOLIST": {
      return state.map(el => el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el);
    }
    case "UPDATE-TITLE-TODOLIST": {
      return state.map(el => el.id === action.payload.id ? { ...el, title: action.payload.title } : el);
    }
    default:
      return state;
  }
};

//actions
export const removeTodolistAC = (id: string)=> {
  return {type: 'REMOVE-TODOLIST', payload: { id }} as const
}

export const createNewTodolistAC = (title: string)=> {
  return {type: "ADD-TODOLIST", payload: {title, todolistId: v1()}} as const
}

export const filteredTodolistAC = (id: string, filter: FilterValuesType) => {
  return {type: "FILTER-TODOLIST", payload: {id, filter}} as const
}

export const updateTitleTodolistAC = (id: string, title: string) => {
  return {type: "UPDATE-TITLE-TODOLIST", payload: {id, title}} as const
}
