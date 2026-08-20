"use client"

import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/core";

type MarketDescriptionProps = {
    description?: JSONContent;
};

export default function MarketDescription({ description }: MarketDescriptionProps) {

	if (!description) return;
	console.log("DESCRIPTION :", description);

	const html = generateHTML(description, [StarterKit]);

	return (
		<section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
			<p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
				À propos
			</p>

			<h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
				Le marché
			</h2>

			<div
    className="tiptap-editor mt-5 text-sm leading-7 rounded-2xl bg-slate-50 p-4"
>
    {/* On ajoute la classe ProseMirror au conteneur du HTML */}
    <div 
        className="ProseMirror" 
        dangerouslySetInnerHTML={{ __html: html }} 
    />
</div>
		</section>
	);
}