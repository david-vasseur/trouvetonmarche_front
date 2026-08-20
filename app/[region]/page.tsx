
import mockMarkets from '@/data/mockMarkets';
import { getRegion } from '@/lib/utils';
import MarketCard from '@/components/ui/MarketCard';
import { notFound } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import EmptyMarketState from '@/components/layout/NoResult';
import HeadingPage from '@/components/layout/HeadingPage';
import { normalizeString } from '@/lib/string';
import { getMarketsByRegion } from '@/actions/market.action';



export default async function RegionPage({ params }: { params: { region: string } }) {
    const { region } = await params;
    const matchedRegion = await getRegion(normalizeString(region));
    console.log("Matched region:", matchedRegion);
    if (!matchedRegion) {
      notFound();
    }

    const markets = await getMarketsByRegion(matchedRegion.code);


    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            {/* Header */}
            <HeadingPage region={region} />

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
