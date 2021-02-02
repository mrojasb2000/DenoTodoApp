import { Response } from "https://deno.land/x/oak/mod.ts";
import todos from "../stubs/todos.ts";

export default {
  getAllTodos: ({ response }: { response: Response }) => {
    response.status = 200;
    response.body = {
      success: true,
      data: todos,
    };
  },
  createTodo: () => {},
  getTodoById: (
    { params, response }: { params: { id: string }; response: Response },
  ) => {
    const todoFound = todos.find(todo => todo.id === params.id)
    if(!todoFound){
      response.status = 404;
      response.body = {
        success: false,
        message: "Data not found"
      };
      return;
    }
    response.status = 200;
    response.body = {
      success: true,
      data: todoFound,
    };
  },
  updateTodoById: () => {},
  deleteTodoById: () => {},
};
