import { serve } from "bun";
import { app } from "./app";
import { gameWsHandler } from "./ws/game.ws.ts";
import { authMiddleware } from "./middleware/auth";

const server = serve({
  port: 3001,
  fetch(req, server) {
    return app.fetch(req, { server });
  },

  websocket: {
    open(ws) {
      gameWsHandler.open(ws);
    },

    message(ws, message) {
      gameWsHandler.message(ws, message);
    },

    close(ws) {
      gameWsHandler.close(ws);
    },
  },
});

console.log("http + ws running on http://localhost:3001");

app.get("/ws/:gameId", authMiddleware, (c) => {
  const gameId = c.req.param("gameId");
  const userId = c.get("userId");

  const upgraded = server.upgrade(c.req.raw, {
    data: {
      gameId,
      userId,
    },
  });

  if (!upgraded) return c.text("Upgrade failed", 500);
});
