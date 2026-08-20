type LoadMoreButtonProps = {
    onClick: () => void;
    isLoading?: boolean;
    label?: string;
    className?: string;
};

export default function LoadMoreButton({
    onClick,
    isLoading = false,
    label = "Charger plus",
    className = "",
}: LoadMoreButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isLoading}
            className={`mx-auto mt-4 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-70 ${className}`.trim()}
        >
            {isLoading ? "Chargement..." : label}
        </button>
    );
}
