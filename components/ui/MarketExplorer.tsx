"use client";

import { useMemo, useState } from "react";
import MarketFilters from "@/components/layout/MarketFilters";
import MarketCard from "@/components/ui/MarketCard";
import { Market } from "@/types/market";

type Props = {
  markets: Market[];
};

export default function MarketExplorer({ markets }: Props) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filters = useMemo(() => {
    const uniqueTags = new Set<string>();

    markets.forEach((market) => {
      market.tags?.forEach((tag) => uniqueTags.add(tag));
    });

    return Array.from(uniqueTags).sort();
  }, [markets]);

  const visibleMarkets = useMemo(() => {
    if (!activeFilter) return markets;

    return markets.filter((market) =>
      market.tags?.includes(activeFilter)
    );
  }, [markets, activeFilter]);

  return (
    <>
      <MarketFilters
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-12 sm:px-6 lg:px-8">
        {visibleMarkets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>
    </>
  );
}