import { TasksType } from "../App";
import { RootState } from "../app/store";

export const selectTasks = (state: RootState): TasksType => state.tasks