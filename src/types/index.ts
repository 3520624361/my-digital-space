// ========== 用户相关 ==========
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  website: string | null;
  role: "USER" | "ADMIN";
  points: number;
  level: number;
  createdAt: string;
}

// ========== 博客相关 ==========
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  readingTime: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  author: Pick<UserProfile, "id" | "username" | "displayName" | "avatarUrl">;
  category: Category | null;
  tags: Tag[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  _count?: { posts: number };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  _count?: { posts: number };
}

// ========== 评论相关 ==========
export interface Comment {
  id: string;
  content: string;
  depth: number;
  createdAt: string;
  author: Pick<UserProfile, "id" | "username" | "displayName" | "avatarUrl">;
  replies?: Comment[];
}

// ========== 音乐相关 ==========
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  duration: number;
  coverUrl: string | null;
  audioUrl: string;
  lyrics: string | null;
  playCount: number;
}

export interface Playlist {
  id: string;
  name: string;
  coverUrl: string | null;
  songs: Song[];
}

// ========== 游戏相关 ==========
export type GameType = "SNAKE" | "GAME_2048" | "TETRIS" | "SPACE_INVADERS";

export interface GameScore {
  id: string;
  game: GameType;
  score: number;
  level: number;
  createdAt: string;
  user: Pick<UserProfile, "id" | "username" | "displayName" | "avatarUrl">;
}

export interface LeaderboardEntry {
  rank: number;
  score: number;
  user: Pick<UserProfile, "id" | "username" | "displayName" | "avatarUrl">;
}

// ========== 成就相关 ==========
export type AchievementCategory = "READING" | "AI" | "MUSIC" | "GAME" | "SOCIAL" | "DAILY";

export interface Achievement {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  points: number;
  earned?: boolean;
  earnedAt?: string;
}

// ========== AI相关 ==========
export type AIType = "CHAT" | "WRITING" | "CODE" | "TRANSLATE" | "SUMMARY" | "STUDY";

export interface AIConversation {
  id: string;
  title: string;
  type: AIType;
  model: string | null;
  createdAt: string;
  messages: AIMessage[];
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
}

// ========== 知识库相关 ==========
export interface Document {
  id: string;
  title: string;
  content: string;
  fileType: string;
  fileUrl: string | null;
  fileSize: number;
  createdAt: string;
}

// ========== 每日相关 ==========
export interface DailySignIn {
  id: string;
  signInDate: string;
  streak: number;
  bonusPoints: number;
}

// ========== 社区相关 ==========
export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  type: "POST" | "QUESTION" | "SHARE";
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  author: Pick<UserProfile, "id" | "username" | "displayName" | "avatarUrl">;
}

// ========== 统计数据 ==========
export interface SiteStats {
  totalPosts: number;
  totalUsers: number;
  totalComments: number;
  totalSongs: number;
  totalGames: number;
  totalViews: number;
}

// ========== 主题 ==========
export type ThemeMode = "light" | "dark";
export type ThemePreset = "default" | "cyberpunk" | "ocean" | "purple-neon";
export type Theme = ThemeMode | `${ThemePreset}-${ThemeMode}`;

// ========== API 响应 ==========
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ========== 搜索 ==========
export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  type: "post" | "document" | "song";
  url: string;
  createdAt: string;
}
