import { Application, Response, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.85.0/fmt/colors.ts";
// routes
import todoRouter from "./src/routes/todo.ts";
// middlewares
import notFound from "./src/middlewares/notFound.ts"

const app = new Application();
// deno-lint-ignore no-inferrable-types
const port: number = 8000;

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());
// 404 page not found
app.use(notFound)

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow("Listering on port")} ${green(url)}`);
});

await app.listen({ port });
