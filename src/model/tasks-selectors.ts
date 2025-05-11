import type { TasksType } from "../app/App";
import type { RootState } from "../app/store";

export const selectTasks = (state: RootState): TasksType => state.tasks