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

//reducer
export const todolistsReducer = (state: TodolistType[] = [], action: ActionType): TodolistType[] => {
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

export const createNewTodolistAC = (title: string, todolistId:string)=> {
  return {type: "ADD-TODOLIST", payload: {title, todolistId}} as const
}

export const filteredTodolistAC = (id: string, filter: FilterValuesType) => {
  return {type: "FILTER-TODOLIST", payload: {id, filter}} as const
}

export const updateTitleTodolistAC = (id: string, title: string) => {
  return {type: "UPDATE-TITLE-TODOLIST", payload: {id, title}} as const
}
