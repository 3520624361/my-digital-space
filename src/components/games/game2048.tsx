"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type Tile = { id: number; value: number; row: number; col: number };

const TILE_COLORS: Record<number, string> = {
  2: "bg-[#eee4da] text-[#776e65]",
  4: "bg-[#ede0c8] text-[#776e65]",
  8: "bg-[#f2b179] text-white",
  16: "bg-[#f59563] text-white",
  32: "bg-[#f67c5f] text-white",
  64: "bg-[#f65e3b] text-white",
  128: "bg-[#edcf72] text-white",
  256: "bg-[#edcc61] text-white",
  512: "bg-[#edc850] text-white",
  1024: "bg-[#edc53f] text-white",
  2048: "bg-[#edc22e] text-white",
};

const createInitialTiles = (): Tile[] => {
  const tiles: Tile[] = [];
  const addRandom = () => {
    const empty = [];
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 4; c++)
        if (!tiles.find((t) => t.row === r && t.col === c))
          empty.push({ row: r, col: c });
    if (empty.length > 0) {
      const pos = empty[Math.floor(Math.random() * empty.length)];
      tiles.push({ id: Date.now() + Math.random(), value: Math.random() < 0.9 ? 2 : 4, ...pos });
    }
  };
  addRandom();
  addRandom();
  return tiles;
};

export function Game2048() {
  const [tiles, setTiles] = useState<Tile[]>(createInitialTiles());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const move = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      if (gameOver || won) return;

      const grid = Array.from({ length: 4 }, () => Array(4).fill(0));
      tiles.forEach((t) => (grid[t.row][t.col] = t.value));

      const rotate = (g: number[][]) =>
        g[0].map((_, i) => g.map((r) => r[i]).reverse());
      const rotateBack = (g: number[][]) =>
        g[0].map((_, i) => g.map((r) => r[i])).reverse();

      let working = grid.map((r) => [...r]);
      if (direction === "up") working = rotate(working);
      else if (direction === "down") working = rotateBack(working);
      else if (direction === "right") working = working.map((r) => [...r].reverse());

      let moved = false;
      let newScore = score;
      const result = working.map((row) => {
        const filtered = row.filter((v) => v !== 0);
        const newRow: number[] = [];
        for (let i = 0; i < filtered.length; i++) {
          if (filtered[i] === filtered[i + 1]) {
            const merged = filtered[i] * 2;
            newRow.push(merged);
            newScore += merged;
            if (merged === 2048) setWon(true);
            i++;
          } else {
            newRow.push(filtered[i]);
          }
        }
        while (newRow.length < 4) newRow.push(0);
        if (newRow.join(",") !== row.join(",")) moved = true;
        return newRow;
      });

      let final = result;
      if (direction === "up") final = rotateBack(result);
      else if (direction === "down") final = rotate(result);
      else if (direction === "right") final = final.map((r) => [...r].reverse());

      if (!moved) return;

      setScore(newScore);
      const newTiles: Tile[] = [];
      final.forEach((row, r) =>
        row.forEach((val, c) => {
          if (val !== 0) newTiles.push({ id: r * 4 + c, value: val, row: r, col: c });
        })
      );

      const empty = [];
      for (let r = 0; r < 4; r++)
        for (let c = 0; c < 4; c++)
          if (!newTiles.find((t) => t.row === r && t.col === c))
            empty.push({ row: r, col: c });

      if (empty.length > 0) {
        const pos = empty[Math.floor(Math.random() * empty.length)];
        newTiles.push({ id: Date.now() + Math.random(), value: Math.random() < 0.9 ? 2 : 4, ...pos });
      }

      setTiles(newTiles);

      // Check game over
      const g = Array.from({ length: 4 }, () => Array(4).fill(0));
      newTiles.forEach((t) => (g[t.row][t.col] = t.value));
      let canMove = false;
      for (let r = 0; r < 4 && !canMove; r++)
        for (let c = 0; c < 4 && !canMove; c++) {
          if (g[r][c] === 0) canMove = true;
          if (c < 3 && g[r][c] === g[r][c + 1]) canMove = true;
          if (r < 3 && g[r][c] === g[r + 1][c]) canMove = true;
        }
      if (!canMove) setGameOver(true);
    },
    [tiles, score, gameOver, won]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const keyMap: Record<string, "up" | "down" | "left" | "right"> = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
      };
      if (keyMap[e.key]) {
        e.preventDefault();
        move(keyMap[e.key]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move]);

  const restart = () => {
    setTiles(createInitialTiles());
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const tileMap = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => null as Tile | null)
  );
  tiles.forEach((t) => (tileMap[t.row][t.col] = t));

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-[400px]">
        <div className="glass-card px-4 py-2">
          <span className="text-sm text-muted">得分: </span>
          <span className="text-xl font-bold gradient-text">{score}</span>
        </div>
        <Button onClick={restart} variant="outline" size="sm">
          新游戏
        </Button>
      </div>

      <div className="relative rounded-xl bg-surface-900/50 p-2 border border-card-border">
        <div className="grid grid-cols-4 gap-2 w-[320px] h-[320px]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="rounded-md bg-surface-800/30" />
          ))}
        </div>
        <div className="absolute inset-2">
          {tileMap.flatMap((row, r) =>
            row.map((tile, c) =>
              tile ? (
                <motion.div
                  key={tile.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute flex items-center justify-center font-bold text-2xl rounded-md ${
                    TILE_COLORS[tile.value] || "bg-surface-700 text-white"
                  }`}
                  style={{
                    width: "72px",
                    height: "72px",
                    left: c * 78 + 3,
                    top: r * 78 + 3,
                  }}
                >
                  {tile.value}
                </motion.div>
              ) : null
            )
          )}
        </div>

        {/* Overlay */}
        {(gameOver || won) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm">
            <p className="mb-2 text-2xl font-bold">{won ? "🎉 你赢了！" : "💀 游戏结束"}</p>
            <p className="mb-4">得分: <span className="font-bold gradient-text">{score}</span></p>
            <Button onClick={restart} variant="gradient" size="lg">
              {won ? "继续挑战" : "再来一次"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
