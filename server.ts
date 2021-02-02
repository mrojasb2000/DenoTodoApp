import { Application, Response, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.85.0/fmt/colors.ts";
import todoRouter from "./routes/todo.ts";

const app = new Application();
// deno-lint-ignore no-inferrable-types
const port: number = 8080;

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow("Listering on port")} ${green(url)}`);
});
await app.listen({ port });
