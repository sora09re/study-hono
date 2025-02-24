import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { basicAuth } from "hono/basic-auth";
import posts from "./posts/posts";
import auth from "./auth/auth";

export const app = new Hono();

app.use("*", prettyJSON());
app.use(
  "/*",
  basicAuth({
    username: "hono",
    password: "acoolproject",
  })
);

app.route("/posts", posts);
app.route("/auth", auth);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
