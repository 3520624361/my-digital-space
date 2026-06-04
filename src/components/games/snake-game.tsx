"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "paused" | "over">("idle");
  const gameRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: "RIGHT" as Direction,
    nextDirection: "RIGHT" as Direction,
    score: 0,
    speed: INITIAL_SPEED,
  });

  const generateFood = useCallback((snake: Position[]): Position => {
    let pos: Position;
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
    return pos;
  }, []);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const game = gameRef.current;
    const size = GRID_SIZE * CELL_SIZE;

    // Background
    ctx.fillStyle = "var(--surface-900, #0f172a)";
    ctx.fillRect(0, 0, size, size);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(size, i * CELL_SIZE);
      ctx.stroke();
    }

    // Snake
    game.snake.forEach((segment, i) => {
      const isHead = i === 0;
      const gradient = ctx.createRadialGradient(
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        0,
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE
      );
      gradient.addColorStop(0, isHead ? "#818cf8" : "#6366f1");
      gradient.addColorStop(1, isHead ? "#6366f1" : "#4f46e5");
      ctx.fillStyle = gradient;
      ctx.shadowColor = isHead ? "rgba(99,102,241,0.5)" : "transparent";
      ctx.shadowBlur = isHead ? 10 : 0;
      ctx.beginPath();
      ctx.roundRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
        4
      );
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    // Food
    const foodGradient = ctx.createRadialGradient(
      game.food.x * CELL_SIZE + CELL_SIZE / 2,
      game.food.y * CELL_SIZE + CELL_SIZE / 2,
      0,
      game.food.x * CELL_SIZE + CELL_SIZE / 2,
      game.food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE
    );
    foodGradient.addColorStop(0, "#f472b6");
    foodGradient.addColorStop(1, "#ec4899");
    ctx.fillStyle = foodGradient;
    ctx.shadowColor = "rgba(244,114,182,0.5)";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(
      game.food.x * CELL_SIZE + CELL_SIZE / 2,
      game.food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
  }, []);

  const gameLoop = useCallback(() => {
    const game = gameRef.current;
    game.direction = game.nextDirection;

    // Move snake
    const head = { ...game.snake[0] };
    switch (game.direction) {
      case "UP": head.y -= 1; break;
      case "DOWN": head.y += 1; break;
      case "LEFT": head.x -= 1; break;
      case "RIGHT": head.x += 1; break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameState("over");
      return;
    }

    // Self collision
    if (game.snake.some((s) => s.x === head.x && s.y === head.y)) {
      setGameState("over");
      return;
    }

    game.snake.unshift(head);

    // Eat food
    if (head.x === game.food.x && head.y === game.food.y) {
      game.score += 10;
      setScore(game.score);
      game.food = generateFood(game.snake);
      // Speed up
      game.speed = Math.max(60, game.speed - 2);
    } else {
      game.snake.pop();
    }

    drawGame();
  }, [drawGame, generateFood]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const game = gameRef.current;
    const timer = setInterval(gameLoop, game.speed);
    return () => clearInterval(timer);
  }, [gameState, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const game = gameRef.current;
      const opposite: Record<string, Direction> = {
        UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT",
      };

      const keyMap: Record<string, Direction> = {
        ArrowUp: "UP", w: "UP", W: "UP",
        ArrowDown: "DOWN", s: "DOWN", S: "DOWN",
        ArrowLeft: "LEFT", a: "LEFT", A: "LEFT",
        ArrowRight: "RIGHT", d: "RIGHT", D: "RIGHT",
      };

      const newDir = keyMap[e.key];
      if (newDir && opposite[newDir] !== game.direction) {
        game.nextDirection = newDir;
      }

      if (e.key === " " || e.key === "Escape") {
        e.preventDefault();
        if (gameState === "playing") setGameState("paused");
        else if (gameState === "paused") setGameState("playing");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  const startGame = () => {
    gameRef.current = {
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: "RIGHT",
      nextDirection: "RIGHT",
      score: 0,
      speed: INITIAL_SPEED,
    };
    setScore(0);
    setGameState("playing");
    drawGame();
  };

  useEffect(() => {
    if (gameState === "idle") drawGame();
  }, [gameState, drawGame]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-[400px]">
        <div className="glass-card px-4 py-2">
          <span className="text-sm text-muted">得分: </span>
          <span className="text-xl font-bold gradient-text">{score}</span>
        </div>
        {(gameState === "playing" || gameState === "paused") && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setGameState(gameState === "playing" ? "paused" : "playing")}
          >
            {gameState === "paused" ? "继续" : "暂停"}
          </Button>
        )}
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="rounded-xl border border-card-border"
        />

        {/* Overlay */}
        {(gameState === "idle" || gameState === "over" || gameState === "paused") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm">
            {gameState === "idle" && (
              <>
                <p className="mb-4 text-lg font-semibold">🐍 贪吃蛇</p>
                <p className="mb-6 text-sm text-muted">使用方向键或 WASD 控制</p>
                <Button onClick={startGame} variant="gradient" size="lg">开始游戏</Button>
              </>
            )}
            {gameState === "paused" && (
              <>
                <p className="mb-4 text-lg font-semibold">⏸️ 已暂停</p>
                <Button onClick={() => setGameState("playing")} variant="outline">继续游戏</Button>
              </>
            )}
            {gameState === "over" && (
              <>
                <p className="mb-2 text-2xl font-bold text-red-500">游戏结束</p>
                <p className="mb-4 text-lg">得分: <span className="font-bold gradient-text">{score}</span></p>
                <Button onClick={startGame} variant="gradient" size="lg">再来一次</Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
