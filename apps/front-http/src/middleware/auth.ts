import { verifyToken } from "../auth/jwt";
import type { MiddlewareHandler } from "hono";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = verifyToken(token);

    // Attach user identity to request context
    c.set("userId", payload.userId);

    await next();
  } catch {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
};
