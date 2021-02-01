import { Application } from "https://deno.land/x/oak/mod.ts"

const app = new Application()
// deno-lint-ignore no-inferrable-types
const port: number = 8080

console.log(`running on port `, port)
await app.listen({ port })