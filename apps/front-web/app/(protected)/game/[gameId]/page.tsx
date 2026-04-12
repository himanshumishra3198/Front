"use client";

import { useRouter } from "next/router";

export default function GamePage() {
  const gameId = useRouter().query.gameId as string;

  return (
    <div>
      <h1>Game ID: {gameId}</h1>
      {/* Game board and logic will go here */}
    </div>
  );
}
