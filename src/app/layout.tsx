import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "react-hot-toast";
import { MusicPlayer } from "@/components/music/music-player";

export const metadata: Metadata = {
  title: {
    default: "My Digital Space - 个人博客娱乐平台",
    template: "%s | My Digital Space",
  },
  description: "一个集个人博客、AI助手、音乐娱乐、小游戏、知识库于一体的综合网站",
  keywords: ["博客", "AI", "音乐", "游戏", "个人空间", "技术博客"],
  authors: [{ name: "My Digital Space" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "My Digital Space",
    title: "My Digital Space - 个人博客娱乐平台",
    description: "一个集个人博客、AI助手、音乐娱乐、小游戏、知识库于一体的综合网站",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Digital Space",
    description: "个人博客娱乐平台",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          :root {
            --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", sans-serif;
            --font-mono: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased" style={{ fontFamily: "var(--font-sans)" }}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-16 pb-20">
              {children}
            </main>
            <MusicPlayer />
            <Footer />
          </div>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--card-bg)",
                color: "var(--foreground)",
                border: "1px solid var(--card-border)",
                backdropFilter: "blur(12px)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
