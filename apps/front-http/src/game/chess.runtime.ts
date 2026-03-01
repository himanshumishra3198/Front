import { Chess } from "chess.js";
import type { GameRuntime, PlayerConnection } from "./types";

export class ChessRuntime implements GameRuntime {
  gameId: string;
  private chess = new Chess();
  private turnUserId: string;
  players = new Map<string, PlayerConnection>();

  constructor(gameId: string, player1Id: string, player2Id: string) {
    this.gameId = gameId;

    // white always starts
    this.turnUserId = player1Id;

    console.log("Chess runtime created", gameId);
  }

  attachPlayer(conn: PlayerConnection) {
    this.players.set(conn.userId, conn);

    conn.socket.send(
      JSON.stringify({
        type: "INIT",
        fen: this.chess.fen(),
      }),
    );
  }

  handleMessage(userId: string, payload: any) {
    if (payload.type !== "MOVE") return;

    if (userId !== this.turnUserId) {
      return this.send(userId, { type: "ERROR", message: "Not your turn" });
    }

    const move = this.chess.move(payload.move);

    if (!move) {
      return this.send(userId, { type: "ERROR", message: "Illegal move" });
    }

    // switch turn
    this.turnUserId = this.getOpponent(userId);

    // broadcast new board
    this.broadcast({
      type: "STATE",
      fen: this.chess.fen(),
      move,
    });

    if (this.chess.isGameOver()) {
      this.broadcast({
        type: "GAME_OVER",
        result: this.getResult(),
      });
    }
  }

  disconnect(userId: string) {
    this.players.delete(userId);
  }

  private getOpponent(userId: string) {
    return [...this.players.keys()].find((id) => id !== userId)!;
  }

  private send(userId: string, msg: any) {
    this.players.get(userId)?.socket.send(JSON.stringify(msg));
  }

  private broadcast(msg: any) {
    const encoded = JSON.stringify(msg);
    this.players.forEach((p) => p.socket.send(encoded));
  }

  private getResult() {
    if (this.chess.isCheckmate()) return "CHECKMATE";
    if (this.chess.isDraw()) return "DRAW";
    return "UNKNOWN";
  }
}
