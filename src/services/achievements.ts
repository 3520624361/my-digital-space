import { prisma } from "@/lib/prisma";
import type { Achievement } from "@/types";

const DEFAULT_ACHIEVEMENTS: Omit<Achievement, "id" | "earned" | "earnedAt">[] = [
  { key: "first-read", name: "初次阅读", description: "阅读第一篇文章", icon: "BookOpen", category: "READING", points: 10 },
  { key: "ten-reads", name: "阅读达人", description: "累计阅读10篇文章", icon: "BookOpen", category: "READING", points: 50 },
  { key: "fifty-reads", name: "阅读大师", description: "累计阅读50篇文章", icon: "BookOpen", category: "READING", points: 200 },
  { key: "first-ai", name: "AI探索者", description: "首次使用AI助手", icon: "Sparkles", category: "AI", points: 10 },
  { key: "ten-ai", name: "AI达人", description: "使用AI助手10次", icon: "Sparkles", category: "AI", points: 50 },
  { key: "first-music", name: "音乐爱好者", description: "收藏第一首歌", icon: "Music", category: "MUSIC", points: 10 },
  { key: "first-game", name: "游戏新手", description: "完成第一次游戏", icon: "Gamepad2", category: "GAME", points: 10 },
  { key: "high-score", name: "游戏达人", description: "任意游戏获得1000分以上", icon: "Trophy", category: "GAME", points: 100 },
  { key: "signin-7", name: "连续签到", description: "连续签到7天", icon: "CalendarCheck", category: "DAILY", points: 100 },
  { key: "signin-30", name: "签到王者", description: "连续签到30天", icon: "CalendarCheck", category: "DAILY", points: 500 },
  { key: "first-comment", name: "社交达人", description: "发表第一条评论", icon: "MessageCircle", category: "SOCIAL", points: 10 },
  { key: "first-like", name: "点赞初体验", description: "首次点赞文章", icon: "Heart", category: "SOCIAL", points: 5 },
];

export async function getAchievements(userId?: string): Promise<Achievement[]> {
  const achievements = await prisma.achievement.findMany();
  const userAchievements = userId
    ? await prisma.userAchievement.findMany({ where: { userId } })
    : [];

  return achievements.map((a: any) => {
    const earned = userAchievements.find((ua: any) => ua.achievementId === a.id);
    return {
      ...a,
      category: a.category as Achievement["category"],
      earned: !!earned,
      earnedAt: earned?.earnedAt.toISOString(),
    };
  });
}

export async function seedAchievements(): Promise<void> {
  const existing = await prisma.achievement.count();
  if (existing > 0) return;

  await prisma.achievement.createMany({
    data: DEFAULT_ACHIEVEMENTS.map((a) => ({
      key: a.key,
      name: a.name,
      description: a.description,
      icon: a.icon,
      category: a.category,
      points: a.points,
    })),
  });
}

export async function awardAchievement(userId: string, key: string): Promise<boolean> {
  const achievement = await prisma.achievement.findUnique({ where: { key } });
  if (!achievement) return false;

  const existing = await prisma.userAchievement.findUnique({
    where: { userId_achievementId: { userId, achievementId: achievement.id } },
  });
  if (existing) return false;

  await prisma.userAchievement.create({
    data: { userId, achievementId: achievement.id },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { points: { increment: achievement.points } },
  });

  return true;
}
