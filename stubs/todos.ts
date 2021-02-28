import { v4 } from "https://deno.land/std/uuid/mod.ts";
import Todo from "../src/interfaces/Todo.ts";

let todos: Todo[] = [
    {
        id: 1,
        todo: 'walk dog',
        isCompleted: true,
    },
    {
        id: 2,
        todo: 'eat food',
        isCompleted: false,
    },
];

export default todos;