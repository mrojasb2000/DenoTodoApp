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
      const { todo } = await request.body().value;
      if (!request.hasBody || todo === undefined) {
        throw { status: 400, message: "Invalid input data" };
      }
      const newTodo: Todo = {
        id: v4.generate(),
        todo: todo,
        isCompleted: false,
      };
      todos.push(newTodo);
      response.status = 200;
      response.body = {
        message: "New todo added",
        data: todos,
      };
    } catch (error) {
      const { status, message } = error;
      response.status = status;
      response.body = { message };
    }
  },
  getTodoById: (
    { params, response }: { params: { id: string }; response: Response },
  ) => {
    try {
      const todoFound: Todo | undefined = todos.find((todo) =>
        todo.id === params.id
      );
      if (todoFound === undefined) throw { status: 404, message: "Entity not found" };
      response.status = 200;
      response.body = {
        data: todoFound,
      };
    } catch (error) {
      const { status, message } = error;
      response.status = status;
      response.body = { message };
    }
  },
  updateTodoById: async (
    { request, response, params }: {
      request: Request;
      response: Response;
      params: { id: string };
    },
  ) => {
    try {
      if (!request.hasBody) {
        throw { status: 400, message: "Invalid body data" };
      }
      const { todo, isCompleted } = await request.body().value;
      if (todo === undefined && isCompleted === undefined) {
        throw { status: 400, message: "Invalid input data" };
      }

      const todoFound: Todo | undefined = todos.find((todo) =>
        todo.id === params.id
      );
      if (todoFound === undefined) {
        throw { status: 404, message: "Entity not found" };
      }

      todoFound.todo = todo !== undefined ? todo : todoFound.todo;
      todoFound.isCompleted = isCompleted !== undefined ? isCompleted : todoFound.isCompleted;

      response.status = 200;
      response.body = {
        data: todoFound,
      };
    } catch (error) {
      const { status, message } = error;
      response.status = status;
      response.body = { message };
    }
  },
  deleteTodoById: () => {},
};
