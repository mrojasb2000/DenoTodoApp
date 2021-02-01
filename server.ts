import { Application, Response, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
// deno-lint-ignore no-inferrable-types
const port: number = 8080;

const router = new Router();
router.get("/", ({ response }: { response: Response }) => {
    response.body = {
        message: "hello world",
    }
});

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`running on port `, port);
await app.listen({ port });
