"use client";

import dynamic from "next/dynamic";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const SnakeGame = dynamic(() => import("@/components/games/snake-game").then(m => ({ default: m.SnakeGame })), { ssr: false });
const Game2048 = dynamic(() => import("@/components/games/game2048").then(m => ({ default: m.Game2048 })), { ssr: false });

const gameConfigs: Record<string, { name: string; description: string; component: React.ComponentType }> = {
  snake: { name: "贪吃蛇", description: "经典贪吃蛇游戏，控制蛇吃食物不断变长", component: SnakeGame },
  "2048": { name: "2048", description: "合并数字方块，挑战2048！", component: Game2048 },
  tetris: { name: "俄罗斯方块", description: "经典俄罗斯方块，消除行数得分", component: SnakeGame },
  "space-invaders": { name: "飞机大战", description: "太空射击游戏，消灭外星入侵者", component: SnakeGame },
};

export default function GamePage() {
  const params = useParams();
  const id = params.id as string;
  const config = gameConfigs[id];

  if (!config) notFound();

  const GameComponent = config.component;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回游戏中心
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">{config.name}</h1>
          <p className="text-sm text-muted">{config.description}</p>
        </div>

        <div className="flex justify-center">
          <GameComponent />
        </div>
      </motion.div>
    </div>
  );
}
