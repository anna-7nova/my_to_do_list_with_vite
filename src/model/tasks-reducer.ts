import { v1 } from "uuid";
import { TasksType, TaskType } from "../App";
import { CreateNewToodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

//types
type RemoveTaskType = ReturnType<typeof removeTaskAC>;
type CreateTaskType = ReturnType<typeof createTaskAC>;
type ChangeStatusTaskType = ReturnType<typeof changeStatusTaskAC>;
type UpdateTitleTaskType = ReturnType<typeof updateTitleTaskAC>;

type ActionType =
  | RemoveTaskType
  | CreateTaskType
  | ChangeStatusTaskType
  | UpdateTitleTaskType
  | CreateNewToodolistActionType
  | RemoveTodolistActionType;

  //data
  const todolistId1 = v1()
  const todolistId2 = v1()

  const state: TasksType = {
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

//reducer
export const tasksReducer = (
  state: TasksType,
  action: ActionType
): TasksType => {
  switch (action.type) {
    case "REMOVE-TASKS": {
      return {...state, [action.payload.todolistId] : state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)};
    }
    case "CREATE-TASKS": {
          const newTask: TaskType = {
              id: v1(),
              title: action.payload.title,
              isDone: false
          }
      return {...state, [action.payload.itemId]: [...state[action.payload.itemId], newTask]};
    }
    case "CHANGE-STATUS-TASKS": {
      return {...state, 
        [action.payload.todolistId]: 
        state[action.payload.todolistId].map(el=> el.id === action.payload.taskId ? {...el, isDone: action.payload.newStatus} : el)
      };
    }
    case "UPDATE-TITLE-TASKS": {
      return {...state, [action.payload.todolistId] : state[action.payload.todolistId].map(el => el.id === action.payload.itemId ? { ...el, title: action.payload.title } : el) };
    }
    case 'REMOVE-TODOLIST': {
      delete state[action.payload.id]
      return {...state}
    }
    case "ADD-TODOLIST": {
      return {...state, [action.payload.todolistId]: []}
    }
    default:
      return state;
  }
};

//actions
export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: "REMOVE-TASKS", payload: { taskId, todolistId } } as const;
};
export const createTaskAC = (title: string, itemId: string) => {
  return { type: "CREATE-TASKS", payload: { title, itemId } } as const;
};
export const changeStatusTaskAC = (taskId: string, newStatus: boolean, todolistId: string) => {
  return {
    type: "CHANGE-STATUS-TASKS",
    payload: { taskId, newStatus, todolistId },
  } as const;
};
export const updateTitleTaskAC = (todolistId: string, itemId: string, title: string) => {
  return {
    type: "UPDATE-TITLE-TASKS",
    payload: { todolistId, itemId, title },
  } as const;
};


