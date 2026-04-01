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

meRouter.patch("/update-username", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  try {
    const updated = await db.profile.update({
      where: { userId: userId },
      data: { username: body.username },
    });
    return c.json(updated);
  } catch (error) {
    console.error("Error updating username:", error);
    return c.json({ error: "Failed to update username" }, 500);
  }
});

meRouter.post("/create-userprofile", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  try {
    const updated = await db.profile.create({
      data: { username: body.username, userId },
    });
    return c.json(updated);
  } catch (error) {
    console.error("Error creating user profile:", error);
    return c.json({ error: "Failed to create user profile" }, 500);
  }
});
