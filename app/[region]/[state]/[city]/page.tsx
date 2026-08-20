import { getMarketsByCity } from "@/actions/market.action";
import HeadingPage from "@/components/layout/HeadingPage";
import EmptyMarketState from "@/components/layout/NoResult";
import MarketCard from "@/components/ui/MarketCard";
import { getCity } from "@/lib/utils";
import { notFound } from "next/navigation";

async function CityPage({ params }: { params: { region: string, state: string, city: string } }) {
    
    const { region, state, city } = await params;

    const matchedCity = await getCity(city);

    if (!matchedCity) {
        notFound();
    }

    const markets = await getMarketsByCity(matchedCity.code);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <HeadingPage region={city} />
            {/* Content */}
            <div className="max-w-6xl flex flex-col gap-4 mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {markets.length === 0 && (
                    <EmptyMarketState />
                )}
                {markets.map((market) => (
                    <MarketCard key={market.id} market={market} />
                ))}
            </div>
        </main>
    );
}

export default CityPage;