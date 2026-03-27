import { Hono } from "hono";
import { signToken } from "../auth/jwt";
import { db } from "@repo/postgres-config/client";
import bcrypt from "bcryptjs";

const app = new Hono();

/**
 * POST /auth/login
 * body: { email: string, password: string }
 */

app.get("/check-email", async (c) => {
  const email = c.req.query("email");

  if (!email) {
    return c.json({ available: false });
  }

  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return c.json({
    available: !user,
  });
});

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

  // ✅ verify password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

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

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      await tx.profile.create({
        data: {
          userId: newUser.id,
          username: email.split("@")[0],
        },
      });

      return newUser;
    });

    // ✅ AUTO LOGIN
    const token = signToken({ userId: user.id });

    return c.json(
      {
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      },
      201,
    );
  } catch (error) {
    console.error(error);
    return c.json({ error: "User creation failed" }, 500);
  }
});

export default app;
