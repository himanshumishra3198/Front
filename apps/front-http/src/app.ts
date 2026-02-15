import { Hono } from "hono";
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import { meRouter } from "./routes/me";

export const app = new Hono();

app.get("/", (c) => c.text("front-http alive"));

app.route("/auth", authRoutes);
app.route("/dashboard", dashboardRoutes);
app.route("/me", meRouter);
