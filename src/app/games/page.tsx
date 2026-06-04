"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Trophy, Grid3x3, Blocks, Rocket } from "lucide-react";

const games = [
  {
    id: "snake", name: "贪吃蛇", description: "经典贪吃蛇游戏，控制蛇吃食物不断变长",
    icon: Gamepad2, color: "from-emerald-500/20 to-green-500/20", gradient: "from-emerald-500 to-green-500",
  },
  {
    id: "2048", name: "2048", description: "合并数字方块，挑战2048！",
    icon: Grid3x3, color: "from-amber-500/20 to-orange-500/20", gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "tetris", name: "俄罗斯方块", description: "经典俄罗斯方块，消除行数得分",
    icon: Blocks, color: "from-blue-500/20 to-cyan-500/20", gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "space-invaders", name: "飞机大战", description: "太空射击游戏，消灭外星入侵者",
    icon: Rocket, color: "from-purple-500/20 to-pink-500/20", gradient: "from-purple-500 to-pink-500",
  },
];

export default function GamesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <Gamepad2 className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mb-3 text-4xl font-bold gradient-text">娱乐中心</h1>
        <p className="text-muted">无需安装，浏览器直接畅玩经典小游戏</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/games/${game.id}`}>
              <div className="group relative overflow-hidden rounded-xl border border-card-border bg-card-bg/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-50`} />
                <div className="relative z-10">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${game.gradient} text-white`}>
                    <game.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{game.name}</h3>
                  <p className="text-sm text-muted">{game.description}</p>
                </div>
                <div className="mt-4 flex items-center text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trophy className="mr-1 h-4 w-4" />
                  开始游戏
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
