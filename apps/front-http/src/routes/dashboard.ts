import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";

const app = new Hono();

// Protect everything below this line
app.use("*", authMiddleware);

app.get("/", async (c) => {
  const userId = c.get("userId");

  return c.json({
    message: "Dashboard data",
    userId,
    games: ["chess"],
    chemistryScore: 62,
  });
});

export default app;
