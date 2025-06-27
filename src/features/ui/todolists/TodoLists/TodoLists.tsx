import React from "react";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTodolists } from "@/features/model/todolists-selectors";
import { TodoList } from "./TodoList/TodoList";

export const TodoLists: React.FC = () => {
  const todolists = useAppSelector(selectTodolists);
  return (
    <>
      {todolists?.map((t) => (
        <TodoList key={t.id} todolist={t} />
      ))}
    </>
  );
};
