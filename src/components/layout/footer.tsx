import Link from "next/link";
import { Sparkles, Github, Twitter, Mail } from "lucide-react";

const footerLinks = {
  博客: [
    { label: "最新文章", href: "/blog" },
    { label: "分类", href: "/categories" },
    { label: "标签", href: "/tags" },
    { label: "RSS", href: "/rss" },
  ],
  AI: [
    { label: "AI聊天", href: "/ai-center" },
    { label: "AI绘图", href: "/ai-drawing" },
    { label: "AI写作", href: "/ai-center/writing" },
    { label: "AI翻译", href: "/ai-center/translate" },
  ],
  娱乐: [
    { label: "音乐中心", href: "/music" },
    { label: "小游戏", href: "/games" },
    { label: "排行榜", href: "/leaderboard" },
    { label: "每日推荐", href: "/daily" },
  ],
  更多: [
    { label: "知识库", href: "/knowledge-base" },
    { label: "社区", href: "/community" },
    { label: "关于我", href: "/about" },
    { label: "管理后台", href: "/admin" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-background/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold gradient-text">
              筱青
            </span>
            <span className="text-sm text-muted">
              &copy; {new Date().getFullYear()} 筱青的空间
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
                title={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
