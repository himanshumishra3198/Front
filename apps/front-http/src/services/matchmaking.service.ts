import { GameType } from "@repo/postgres-config/client";

type QueuePlayer = {
  userId: string;
  rating?: number;
  joinedAt: number;
};

class Matchmaker {
  // One queue per game
  private queues = new Map<GameType, QueuePlayer[]>();

  private getQueue(gameType: GameType) {
    if (!this.queues.has(gameType)) {
      this.queues.set(gameType, []);
    }
    return this.queues.get(gameType)!;
  }

  join(gameType: GameType, player: QueuePlayer) {
    const queue = this.getQueue(gameType);
    console.log(queue);
    if (queue.find((p) => p.userId === player.userId)) return;

    queue.push(player);
  }

  leave(gameType: GameType, userId: string) {
    const queue = this.getQueue(gameType);
    this.queues.set(
      gameType,
      queue.filter((p) => p.userId !== userId),
    );
  }

  findMatch(gameType: GameType, player: QueuePlayer): QueuePlayer | null {
    const queue = this.getQueue(gameType);

    const opponentIndex = queue.findIndex((p) => p.userId !== player.userId);
    if (opponentIndex === -1) return null;

    const opponent = queue[opponentIndex];

    // remove both players
    this.leave(gameType, opponent.userId);
    this.leave(gameType, player.userId);

    return opponent;
  }

  size(gameType: GameType) {
    return this.getQueue(gameType).length;
  }
}

export const matchmaker = new Matchmaker();
