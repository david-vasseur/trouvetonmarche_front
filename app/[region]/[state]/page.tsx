
import mockMarkets from '@/data/mockMarkets';
import { getDepartment } from '@/lib/utils';
import MarketCard from '@/components/ui/MarketCard';
import BackButton from '@/components/ui/BackButton';
import { notFound } from 'next/navigation';
import HeadingPage from '@/components/layout/HeadingPage';
import EmptyMarketState from '@/components/layout/NoResult';
import { normalizeString } from '@/lib/string';
import { getMarketsByDepartment } from '@/actions/market.action';



export default async function StatePage({ params }: { params: { region: string, state: string } }) {
    const { region, state } = await params;
    console.log(region, state);
    const matchedState = await getDepartment(state);
    console.log("Matched state:", matchedState);
    if (!matchedState) {
        notFound();
    }

    const markets = await getMarketsByDepartment(matchedState.code);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <HeadingPage region={state} />
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
