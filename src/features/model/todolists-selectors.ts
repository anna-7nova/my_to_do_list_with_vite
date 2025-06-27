import { RootState } from "@/app/store";
import { TodolistType } from "./todolists-reducer";

export const selectTodolists = (state: RootState) : TodolistType[]=> state.todolists