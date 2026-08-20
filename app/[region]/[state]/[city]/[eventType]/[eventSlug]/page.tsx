import { notFound } from "next/navigation";
import MarketHeader from "@/components/layout/market/MarketHeader";
import MarketPracticalInfo from "@/components/layout/market/MarketPraticalInfos";
import MarketDescription from "@/components/layout/market/MarketDescription";
import MarketOpeningHours from "@/components/layout/market/MarketOpeningHours";
import MarketLocation from "@/components/layout/market/MarketLocation";
import MarketTags from "@/components/layout/market/MarketTags";
import MarketProfessionalInfo from "@/components/layout/market/MarketProfessionalInfos";
import MarketOrganizer from "@/components/layout/market/MarketOrganizer";
import { normalizeString } from "@/lib/string";
import { getMarket } from "@/actions/market.action";

type MarketPageProps = {
  params: {
    region: string;
    state: string;
    city: string;
    eventType: string;
    eventSlug: string;
  };
};

export default async function MarketPage({ params }: MarketPageProps) {

    const { region, state, city, eventType, eventSlug } = await params;

    const marketId = Number(eventSlug.split("-").pop());

	const marketData = await getMarket(marketId);

	if (!marketData) {
		notFound();
	}

	const expectedRegion = normalizeString(marketData.region);
	const expectedDepartment = normalizeString(marketData.department);
	const expectedCity = normalizeString(marketData.city);
	const expectEvent = normalizeString(marketData.category.name)

	if (
		region.toLowerCase() !== expectedRegion ||
		state.toLowerCase() !== expectedDepartment ||
		city.toLowerCase() !== expectedCity ||
		eventType.toLowerCase() !== expectEvent
	) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(42,111,69,0.10),transparent_40%),linear-gradient(180deg,#f4f7f9_0%,#eef5f0_100%)] px-4 py-8 sm:px-6 lg:px-8">
		<div className="mx-auto max-w-6xl">

			{/* Fil d'Ariane */}
			<div className="mb-6">
			<p className="text-sm text-slate-500">
				Accueil
				<span className="mx-2 text-slate-300">/</span>
				{marketData.region}
				<span className="mx-2 text-slate-300">/</span>
				{marketData.department}
				<span className="mx-2 text-slate-300">/</span>
				{marketData.city}
				<span className="mx-2 text-slate-300">/</span>
				{marketData.name}
			</p>
			</div>

			<div className="space-y-6">

			{/* HEADER */}
			<MarketHeader
				name={marketData.name}
				city={marketData.city}
				department={marketData.department}
				image={marketData.image}
				marketType={marketData.marketType}
			/>

			<div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">

				<div className="space-y-6">

				{/* INFOS PRATIQUES */}
				<MarketPracticalInfo
					startAt={marketData.startAt}
					endAt={marketData.endAt}
					recurrence={marketData.recurrence}
					address={marketData.address}
					zip={marketData.zip}
					city={marketData.city}
					price={marketData.price}
				/>

				{/* DESCRIPTION */}
				{marketData.description && (
					<MarketDescription
					description={marketData.description}
					/>
				)}
				


				{/* TAGS */}
				<MarketTags
					tags={marketData.tags}
					externalUrl={marketData.externalUrl}
				/>

				{/* INFOS PRO */}
				<MarketProfessionalInfo
					standPrice={marketData.standPrice}
					price={marketData.price}
					history={marketData.history}
					visitors={marketData.visitors}
					registrationsOpen={marketData.registrationsOpen}
					exhibitors={marketData.exhibitors}
					standSizes={marketData.standSizes}
					marketType={marketData.marketType}
					barnum={marketData.barnum}
					parkingAvailability={marketData.parkingAvailability}
					parkingFree={marketData.parkingFree}
					electricity={marketData.electricity}
				/>

				</div>

				<aside className="space-y-6">

				{/* LOCALISATION */}
				<MarketLocation
					address={marketData.address}
					zip={marketData.zip}
					city={marketData.city}
					latitude={marketData.latitude}
					longitude={marketData.longitude}
				/>


				{/* HORAIRES */}
				<MarketOpeningHours
					openingHours={marketData.openingHours}
				/>

				{/* ORGANISATEUR */}
				<MarketOrganizer
					name={`${marketData.user.firstName} ${marketData.user.lastName}`}
					shopName={marketData.user.profile?.shopName}
					avatarUrl={marketData.user.avatarUrl}
					city={
					marketData.user.profile?.city ??
					marketData.city
					}
					phone={marketData.user.phone}
					email={marketData.user.email}
				/>

				</aside>

			</div>
			</div>
		</div>
		</main>
	);
}