"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type TiptapEditorProps = {
    value?: Record<string, unknown>;
    onChange: (value: Record<string, unknown>) => void;
};

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {

    const editor = useEditor({
        extensions: [StarterKit],
        content: value ?? {
            type: "doc",
            content: [
                {
                type: "paragraph",
                },
            ],
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
        immediatelyRender: false,
    });

    const editorState = useEditorState({
            editor,
            selector: (ctx) => ({
                isItalic: ctx.editor?.isActive("italic") ?? false,
                isBold: ctx.editor?.isActive("bold") ?? false,
                isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
                isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
            }),
        });

  if (!editor) {
    return null;
  }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-3">
                <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        editorState && editorState.isBold
                        ? "bg-blue-500 text-white"
                        : "bg-transparent text-slate-700 hover:bg-slate-100"
                    }`}
                >
                Gras
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        editorState && editorState.isItalic
                        ? "bg-blue-500 text-white"
                        : "bg-transparent text-slate-700 hover:bg-slate-100"
                    }`}
                >
                    Italique
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                            editorState && editorState.isHeading2
                            ? "bg-blue-500 text-white"
                            : "bg-transparent text-slate-700 hover:bg-slate-100"
                        }`}
                    >
                    Titre
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        editorState && editorState.isHeading3
                        ? "bg-blue-500 text-white"
                        : "bg-transparent text-slate-700 hover:bg-slate-100"
                    }`}
                >
                    Sous-titre
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className="rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
                >
                    Liste
                </button>
            </div>

            <EditorContent
                editor={editor}
                className="tiptap-editor p-6"
            />
        </div>
    );
}