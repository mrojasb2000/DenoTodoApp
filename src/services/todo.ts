import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std@0.85.0/uuid/mod.ts";
import todos from "../../stubs/todos.ts";
// interface
import Todo from "../interfaces/Todo.ts";
// models
import TodoModel from "../models/todo.ts";

export default {
  /**
   * @description Get all todos
   * @route GET /todos
   */
  getAllTodos: async ({ response }: { response: Response }) => {
    try {
      const data = await TodoModel.getAll();
      response.status = 200;
      response.body = {
        data,
      };
    } catch (error) {
      const { status, message } = error;
      response.status = status;
      response.body = { message };
    }
  },
  /**
   * @description Add a new todo
   * @route POST /todos
   */
  createTodo: async (
    { request, response }: { request: Request; response: Response },
  ) => {
    if (!request.hasBody) {
      throw { status: 400, message: "No data provided" };
    }
    const { todo } = await request.body().value;
    if (!todo) {
      throw { status: 400, message: "Invalid input data" };
    }
    try {
      await TodoModel.add({ todo: todo, isCompleted: false });
      response.status = 201;
      response.body = {
        message: "The record was added successfully",
      };
    } catch (error) {
      const { status, message } = error;
      response.status = status;
      response.body = { message };
    }
  },
  /**
   * @description Get todo by id
   * @route GET todos/:id
   */
  getTodoById: async (
    { params, response }: { params: { id: string }; response: Response },
  ) => {
    const isAvailable = await TodoModel.doesExistById({
      id: Number(params.id),
    });

    if (!isAvailable) {
      response.status = 404;
      response.body = {
        message: "No todo found",
      };
      return;
    }
    try {
      const todoFound = await TodoModel.getById({ id: Number(params.id) });
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
  /**
   * @description Up`date todo by id
   * @route PUT todos/:id
   */
  updateTodoById: async (
    { request, response, params }: {
      request: Request;
      response: Response;
      params: { id: string };
    },
  ) => {
    /* try {
      if (!request.hasBody) {
        throw { status: 400, message: "Invalid input body" };
      }
      const todoFound: Todo | undefined = todos.find((todo) =>
        todo.id === params.id
      );
      if (todoFound === undefined) {
        throw { status: 404, message: "Entity not found" };
      }
      const { todo, isCompleted } = await request.body().value;
      if (todo === undefined && isCompleted === undefined) {
        throw { status: 400, message: "Invalid input data" };
      }
      todoFound.todo = todo !== undefined ? todo : todoFound.todo;
      todoFound.isCompleted = isCompleted !== undefined
        ? isCompleted
        : todoFound.isCompleted;

      response.status = 200;
      response.body = {
        data: todoFound,
      };
    } catch (error) {
      const { status, message } = error;
      response.status = status;
      response.body = { message };
    } */
  },
  /**
   * @description Delete todo by id
   * @route DELETE todos/:id
   */
  deleteTodoById: async (
    { response, params }: {
      response: Response;
      params: { id: string };
    },
  ) => {
    /* try {
      const allTodos: Todo[] = todos.filter((todo) => todo.id !== params.id);
      response.status = 200;
      response.body = {
        data: allTodos,
      };
    } catch (error) {
      const { status, message } = error;
      response.status = status;
      response.body = { message };
    } */
  },
};
