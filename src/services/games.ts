import { prisma } from "@/lib/prisma";
import type { GameScore, GameType, LeaderboardEntry } from "@/types";

export async function saveScore(
  userId: string,
  game: GameType,
  score: number,
  level = 1
): Promise<void> {
  await prisma.gameScore.create({
    data: { userId, game, score, level },
  });
}

export async function getLeaderboard(
  game: GameType,
  period: "today" | "week" | "month" | "all" = "all",
  limit = 10
): Promise<LeaderboardEntry[]> {
  const now = new Date();
  let dateFilter: Date | null = null;

  switch (period) {
    case "today":
      dateFilter = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "all":
      dateFilter = null;
      break;
  }

  const scores = await prisma.gameScore.groupBy({
    by: ["userId"],
    where: {
      game,
      ...(dateFilter ? { createdAt: { gte: dateFilter } } : {}),
    },
    _max: { score: true },
    orderBy: { _max: { score: "desc" } },
    take: limit,
  });

  const users = await prisma.user.findMany({
    where: { id: { in: scores.map((s: any) => s.userId) } },
    select: { id: true, username: true, displayName: true, avatarUrl: true },
  });

  return scores.map((s: any, index: number) => ({
    rank: index + 1,
    score: s._max.score ?? 0,
    user: users.find((u: any) => u.id === s.userId) ?? {
      id: s.userId,
      username: "未知用户",
      displayName: null,
      avatarUrl: null,
    },
  }));
}

export async function getUserHighScores(userId: string): Promise<(GameScore & { gameName: string })[]> {
  const scores = await prisma.gameScore.findMany({
    where: { userId },
    orderBy: { score: "desc" },
    take: 10,
  });

  const gameNames: Record<GameType, string> = {
    SNAKE: "贪吃蛇",
    GAME_2048: "2048",
    TETRIS: "俄罗斯方块",
    SPACE_INVADERS: "飞机大战",
  };

  return scores.map((s: any) => ({
    ...s,
    gameName: gameNames[s.game as GameType],
  })) as unknown as (GameScore & { gameName: string })[];
}
