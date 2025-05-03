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
      return state.filter(el=>el.id !== action.payload.todolistId);
    }
    case "ADD-TODOLIST": {
      const newTodoList: TodolistType = { id: action.payload.todolistId, title: action.payload.title, filter: "all" }
      return [newTodoList, ...state];
    }
    case "FILTER-TODOLIST": {
      return state.map(el => el.id === action.payload.todolistId ? { ...el, filter: action.payload.filter } : el);
    }
    case "UPDATE-TITLE-TODOLIST": {
      return state.map(el => el.id === action.payload.todolistId ? { ...el, title: action.payload.title } : el);
    }
    default:
      return state;
  }
};

//actions
export const removeTodolistAC = (payload: {todolistId: string})=> {
  return {type: 'REMOVE-TODOLIST', payload} as const
}

export const createNewTodolistAC = (payload: {title: string, todolistId:string})=> {
  return {type: "ADD-TODOLIST", payload} as const
}

export const filteredTodolistAC = (payload: {todolistId: string, filter: FilterValuesType}) => {
  return {type: "FILTER-TODOLIST", payload} as const
}

export const updateTitleTodolistAC = (payload: {todolistId: string, title: string}) => {
  return {type: "UPDATE-TITLE-TODOLIST", payload} as const
}
