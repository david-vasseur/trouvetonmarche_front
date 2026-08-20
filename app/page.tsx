
import { getMarkets } from "@/actions/market.action";
import Hero from "@/components/layout/Hero";
import HomeShowcase from "@/components/layout/HomeShowcase";

export default async function Home() {
  const markets = await getMarkets();

  return (
    <div className="flex flex-1 flex-col items-center justify-center font-sans">
      <Hero />
      <HomeShowcase markets={markets} />
    </div>
  );
}
