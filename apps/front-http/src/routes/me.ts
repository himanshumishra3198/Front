import { Hono } from "hono";
import { db } from "@repo/postgres-config/client";
import { authMiddleware } from "../middleware/auth";

export const meRouter = new Hono();

// Protect everything below this line
meRouter.use("*", authMiddleware);

meRouter.get("/", async (c) => {
  const userId = c.get("userId");

  const profile = await db.profile.findUnique({
    where: { userId },
  });

  return c.json(profile);
});

meRouter.patch("/", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const updated = await db.profile.update({
    where: { userId: userId },
    data: { username: body.username },
  });

  return c.json(updated);
});
