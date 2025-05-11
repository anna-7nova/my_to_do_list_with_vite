import type { TodolistType } from "../app/App";
import type { RootState } from "../app/store";

export const selectTodolists = (state: RootState) : TodolistType[]=> state.todolists