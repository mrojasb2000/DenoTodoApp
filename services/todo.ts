import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std@0.85.0/uuid/mod.ts";
import todos from "../stubs/todos.ts";
import Todo from "../interfaces/Todo.ts";

export default {
  getAllTodos: ({ response }: { response: Response }) => {
    response.status = 200;
    response.body = {
      success: true,
      data: todos,
    };
  },
  createTodo: async (
    { request, response }: { request: Request; response: Response },
  ) => {
    try {
      if (!request.hasBody) throw { status: 401, message: "Invalid input data" }
      const { todo } = await request.body().value
      const newTodo: Todo = {
        id: v4.generate(),
        todo: todo,
        isCompleted: false,
      }
      todos.push(newTodo)
      response.status = 200;
      response.body = {
        success: true,
        data: todos,
      }
    } catch (error) {
      const { status, message } = error
      response.status = status
      response.body = { message }
    } 
  },

  getTodoById: (
    { params, response }: { params: { id: string }; response: Response },
  ) => {
    try {
      const todoFound = todos.find((todo) => todo.id === params.id);
      if (!todoFound) throw { status: 404, message: "User not found" }
      response.status = 200;
      response.body = {
        success: true,
        data: todoFound,
      }
    } catch (error) {
      const { status, message } = error
      response.status = status
      response.body = { message }
    }
  },
  updateTodoById: () => {},
  deleteTodoById: () => {},
};
