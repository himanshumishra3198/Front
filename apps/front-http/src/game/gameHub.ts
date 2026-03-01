import { GameType } from "@repo/postgres-config/client";
import { ChessRuntime } from "./chess.runtime";

export interface BaseRuntime {
  attachPlayer(conn: any): void;
  handleMessage(userId: string, payload: any): void;
  disconnect(userId: string): void;
}

class GameHub {
  private games = new Map<string, BaseRuntime>();

  createGame(gameId: string, gameType: GameType, p1: string, p2: string) {
    let runtime: BaseRuntime;

    switch (gameType) {
      case GameType.CHESS:
        runtime = new ChessRuntime(gameId, p1, p2);
        break;

      default:
        throw new Error("Unsupported game type");
    }

    this.games.set(gameId, runtime);
    return runtime;
  }

  get(gameId: string) {
    return this.games.get(gameId);
  }

  remove(gameId: string) {
    this.games.delete(gameId);
  }
}

export const gameHub = new GameHub();
