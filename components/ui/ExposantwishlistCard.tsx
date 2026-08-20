import Link from "next/link";

function ExposantWishlistCard({ userId }: { userId: number }) {
    // Plus tard :
    // const wishlist = ...
    
    const wishlistCount = 0;

    return (
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
                Ma wishlist
            </p>

            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                {wishlistCount}
            </p>

            <p className="mt-1 text-sm text-slate-500">
                marchés sauvegardés
            </p>

            <Link
                href="/profile/favoris"
                className="mt-4 inline-flex items-center rounded-full bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
                Voir mes favoris
            </Link>
        </div>
    );
}