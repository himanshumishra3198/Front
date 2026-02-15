import { Hono } from "hono";
import { signToken } from "../auth/jwt";
import { db } from "@repo/postgres-config/client";
// later: import { db } from "@repo/db";

const app = new Hono();

/**
 * POST /auth/login
 * body: { email: string, password: string }
 */
app.post("/login", async (c) => {
  const body = await c.req.json();

  const { email, password } = body;

  if (!email || !password) {
    return c.json({ error: "Missing credentials" }, 400);
  }
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // TODO: verify password hash from DB

  const token = signToken({ userId: user.id });

  return c.json({
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
});

app.post("/signup", async (c) => {
  const body = await c.req.json();

  const { email, password } = body;
  console.log(body);
  console.log(email, password);
  if (!email || !password) {
    return c.json({ error: "Missing credentials" }, 400);
  }
  try {
    const existing = await db.user.findUnique({
      where: { email },
    });

    if (existing) {
      return c.json({ error: "Email already in use" }, 409);
    }

    const user = await db.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password,
        },
      });

      await tx.profile.create({
        data: {
          userId: newUser.id,
          username: email.split("@")[0], // temporary default
        },
      });

      return newUser;
    });
    return c.json(
      {
        user: {
          id: user.id,
          email: user.email,
        },
      },
      201,
    );
  } catch (error) {
    console.log(error);
    return c.json({ error: "User creation failed" }, 500);
  }
});

export default app;
