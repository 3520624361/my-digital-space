import { Hero, FeaturedPosts, QuickAccess, TechStack, HomeStats } from "@/components/home";

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <div className="relative z-10">
        <FeaturedPosts />
        <QuickAccess />
        <TechStack />
        <HomeStats />
      </div>
    </div>
  );
}
