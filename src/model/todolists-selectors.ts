import { TodolistType } from "../App";
import { RootState } from "../app/store";

export const selectTodolists = (state: RootState) : TodolistType[]=> state.todolists