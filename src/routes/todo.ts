import { Router } from "https://deno.land/x/oak/mod.ts";
import todoService from "../services/todo.ts";

const router = new Router()

router
    .get("/todos", todoService.getAllTodos)
    .post("/todos", todoService.createTodo)
    .get("/todos/:id", todoService.getTodoById)
    .put("/todos/:id", todoService.updateTodoById)
    .delete("/todos/:id", todoService.deleteTodoById)

export default router;    