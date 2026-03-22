import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { matchmaker } from "../services/matchmaking.service";
import { db } from "@repo/postgres-config/client";
import { GameType } from "@repo/postgres-config/client";

export const matchmakingRouter = new Hono();

matchmakingRouter.use("*", authMiddleware);

matchmakingRouter.post("/join", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();

  const gameType = body.gameType as GameType;

  if (!gameType) {
    return c.json({ error: "gameType required" }, 400);
  }

  const player = {
    userId: userId,
    joinedAt: Date.now(),
  };

  const opponent = matchmaker.findMatch(gameType, player);

  if (!opponent) {
    matchmaker.join(gameType, player);
    return c.json({ status: "WAITING" });
  }

  // create session with correct gameType
  const game = await db.gameSession.create({
    data: {
      gameType,
      player1Id: opponent.userId,
      player2Id: player.userId,
      status: "ACTIVE",
    },
  });

  return c.json({
    status: "MATCH_FOUND",
    gameId: game.id,
    gameType,
  });
});

matchmakingRouter.post("/leave", async (c) => {
  const user = c.get("user");
  const { gameType } = await c.req.json();

  matchmaker.leave(gameType, user.userId);

  return c.json({ status: "LEFT_QUEUE" });
});
