import { db } from "@repo/postgres-config/client";
import { gameHub } from "../game/gameHub";

export const gameWsHandler = {
  async open(ws: ServerWebSocket<any>) {
    const { gameId, userId } = ws.data;

    if (!gameId || !userId) {
      return ws.close();
    }

    let runtime = gameHub.get(gameId);

    // First connection → load from DB
    if (!runtime) {
      const session = await db.gameSession.findUnique({
        where: { id: gameId },
      });

      if (!session || session.status !== "ACTIVE") {
        return ws.close();
      }

      // Security check
      if (userId !== session.player1Id && userId !== session.player2Id) {
        return ws.close();
      }

      runtime = gameHub.createGame(
        gameId,
        session.gameType,
        session.player1Id,
        session.player2Id!,
      );
    }

    runtime.attachPlayer({
      userId,
      socket: ws,
    });
  },

  message(ws: ServerWebSocket<any>, message: string | Buffer) {
    const { gameId, userId } = ws.data;

    const runtime = gameHub.get(gameId);
    if (!runtime) return;

    try {
      const payload = JSON.parse(message.toString());
      runtime.handleMessage(userId, payload);
    } catch {
      ws.send(JSON.stringify({ type: "ERROR", message: "Invalid JSON" }));
    }
  },

  close(ws: ServerWebSocket<any>) {
    const { gameId, userId } = ws.data;

    const runtime = gameHub.get(gameId);
    runtime?.disconnect(userId);
  },
};
