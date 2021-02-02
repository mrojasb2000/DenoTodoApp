import { Response  } from "https://deno.land/x/oak/mod.ts";
import todos from "../stubs/todos.ts";

export default {
  getAllTodos: ({response}:{response: Response}) => {
    response.status = 200;
    response.body = {
      success: true,
      data: todos,
    };
  },
  createTodo: () => {},
  getTodoById: () => {},
  updateTodoById: () => {},
  deleteTodoById: () => {},
};
