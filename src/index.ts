import { Hono } from "hono";

const app = new Hono();

let blogPosts = [
  {
    id: "1",
    title: "Blog1",
    content: "Blog1 Content",
  },
  {
    id: "2",
    title: "Blog2",
    content: "Blog2 Content",
  },
  {
    id: "3z",
    title: "Blog3z",
    content: "Blog3 Content",
  },
];

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
