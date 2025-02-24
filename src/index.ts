import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import posts from "./posts/posts";

export const app = new Hono();

app.use("*", prettyJSON());
app.route("/posts", posts);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
