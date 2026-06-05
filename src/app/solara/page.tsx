import { Metadata } from "next";

export const metadata: Metadata = {
  title: "音乐聚合搜索",
  description: "Solara - 聚合多个音乐平台搜索与播放",
};

export default function SolaraPage() {
  return (
    <div className="relative" style={{ height: "calc(100vh - 4rem)", overflow: "hidden" }}>
      <iframe
        src="/solara/index.html"
        className="w-full h-full border-0"
        title="Solara Music Player"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
