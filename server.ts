import { Application, Response, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.85.0/fmt/colors.ts"

const app = new Application();
// deno-lint-ignore no-inferrable-types
const port: number = 8080;

const router = new Router();
router.get("/", ({ response }: { response: Response }) => {
  response.body = {
    message: "hello world",
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow("Listering on port")} ${green(url)}`);
});
await app.listen({ port });
