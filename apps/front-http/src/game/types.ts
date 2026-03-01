export type PlayerConnection = {
  userId: string;
  socket: ServerWebSocket<any>;
};

export type GameRuntime = {
  gameId: string;
  players: Map<string, PlayerConnection>;
  handleMessage(userId: string, payload: any): void;
  disconnect(userId: string): void;
};
