# My Digital Space 🚀

> 一个集个人博客、AI助手、音乐娱乐、小游戏、知识库于一体的综合网站

## ✨ 特性

- 📝 **博客系统** - Markdown/MDX 支持、分类标签、搜索、评论、阅读统计
- 🤖 **AI 中心** - 聊天、写作、代码、翻译、总结、学习六大助手
- 🎨 **AI 绘图** - 文生图、头像、Logo、海报、壁纸生成
- 🎵 **音乐中心** - 在线播放、歌单管理、歌词显示、底部固定播放器
- 🎮 **娱乐中心** - 贪吃蛇、2048、俄罗斯方块、飞机大战
- 🏆 **排行榜** - 游戏排行、阅读排行、积分排行
- 👤 **用户系统** - 注册登录、成就徽章、积分系统
- 📚 **知识库** - 文档上传、AI问答
- 🌐 **社区** - 发帖、评论、点赞（预留）
- 🎨 **多主题** - 暗色/亮色/赛博朋克/海洋/紫霓虹
- 📱 **PWA** - 安装到桌面、离线访问
- 🔍 **SEO优化** - Sitemap、OG、RSS、Schema

## 🛠 技术栈

| 前端 | 后端 | 数据库 | AI | 部署 |
|------|------|--------|-----|------|
| Next.js 16 | Next.js API | PostgreSQL | OpenAI | Vercel |
| React 19 | Prisma ORM | | DeepSeek | |
| TypeScript | Supabase Auth | | Claude | |
| Tailwind CSS | | | | |
| Framer Motion | | | | |

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local

# 启动开发服务器
npm run dev
```

## 📁 项目结构

```
src/
├── app/                    # 页面路由
│   ├── blog/              # 博客
│   ├── ai-center/         # AI中心
│   ├── ai-drawing/        # AI绘图
│   ├── music/             # 音乐
│   ├── games/             # 游戏
│   ├── leaderboard/       # 排行榜
│   ├── knowledge-base/    # 知识库
│   ├── community/         # 社区
│   ├── daily/             # 每日
│   ├── profile/           # 个人中心
│   ├── auth/              # 登录注册
│   ├── admin/             # 管理后台
│   └── about/             # 关于
├── components/             # 组件
│   ├── ui/                # 基础UI
│   ├── layout/            # 布局
│   ├── home/              # 首页
│   ├── blog/              # 博客
│   ├── ai/                # AI
│   ├── music/             # 音乐
│   └── theme/             # 主题
├── hooks/                  # Hooks
├── lib/                    # 工具库
├── services/               # 服务
└── types/                  # 类型
```

## 📄 许可证

MIT
