import { Hono } from "hono";
import { cors } from "hono/cors";
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import { meRouter } from "./routes/me";
import { matchmakingRouter } from "./routes/matchmaking";
import { onboardingRouter } from "./routes/onboarding";

export const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000", // frontend origin
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.get("/", (c) => c.text("front-http alive"));

app.route("/auth", authRoutes);
app.route("/dashboard", dashboardRoutes);
app.route("/me", meRouter);
app.route("/matchmaking", matchmakingRouter);
app.route("/onboarding", onboardingRouter);
