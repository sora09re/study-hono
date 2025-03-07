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

app.get("/", (c) => c.json({ posts: blogPosts }));

app.get("/:id", (c) => {
  const id = c.req.param("id");
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return c.json({ message: "not found this page" }, 404);
  }

  return c.json(post);
});

app.post("/", async (c) => {
  const { title, content } = await c.req.json<{
    title: string;
    content: string;
  }>();
  const newPost = { id: String(blogPosts.length + 1), title, content };
  blogPosts = [...blogPosts, newPost];
  return c.json(newPost, 201);
});

app.put("/:id", async (c) => {
  const id = c.req.param("id");
  const index = blogPosts.findIndex((p) => p.id == id);

  if (index === -1) {
    return c.json({ message: "Post not found" }, 404);
  }

  const { title, content } = await c.req.json<{
    title: string;
    content: string;
  }>();
  blogPosts[index] = { ...blogPosts[index], title, content };

  return c.json(blogPosts[index]);
});

app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const index = blogPosts.findIndex((p) => p.id == id);

  if (index === -1) {
    return c.json({ message: "Post not found" }, 404);
  }

  blogPosts = blogPosts.filter((p) => {
    p.id !== id;
  });

  return c.json({ message: "Blog Post deleted" });
});

export default app;
