import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import prd from "../content/prd.md?raw";

export default function Spec() {
  return (
    <div className="min-h-screen bg-ivory text-obsidian">
      <header className="fixed top-0 inset-x-0 z-50 bg-ivory/85 backdrop-blur-md border-b border-brass/20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-[19px] tracking-editorial flex items-baseline gap-2"
          >
            <span className="font-medium">KODA</span>
            <span className="text-brass">·</span>
            <span className="font-mono text-[11px] tracking-eyebrow text-brass-deep">
              01 · Spec
            </span>
          </Link>
          <Link
            to="/"
            className="font-mono text-[11px] tracking-eyebrow uppercase text-warmgrey hover:text-amber"
          >
            ← Back to object
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-24">
        <div className="eyebrow mb-6 flex items-center gap-3">
          <span className="text-amber">●</span>
          <span>PRD · live source · prd.md</span>
        </div>
        <article className="prose-koda">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{prd}</ReactMarkdown>
        </article>
      </main>

      <style>{`
        .prose-koda { font-family: "Inter Tight", sans-serif; color: #1C1C1C; }
        .prose-koda h1 {
          font-family: "Fraunces", serif;
          font-size: 64px;
          line-height: 1;
          letter-spacing: -0.02em;
          margin: 0 0 24px;
        }
        .prose-koda h2 {
          font-family: "Fraunces", serif;
          font-size: 32px;
          line-height: 1.05;
          letter-spacing: -0.015em;
          margin: 56px 0 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(184,153,104,0.4);
        }
        .prose-koda h3 {
          font-family: "Fraunces", serif;
          font-size: 22px;
          margin: 32px 0 8px;
          color: #5C3A21;
        }
        .prose-koda p { font-size: 18px; line-height: 1.6; margin: 14px 0; color: #2a2a2a; }
        .prose-koda blockquote {
          font-family: "Fraunces", serif;
          font-style: italic;
          font-size: 24px;
          line-height: 1.4;
          padding: 8px 0 8px 24px;
          margin: 24px 0;
          border-left: 2px solid #B89968;
          color: #5C3A21;
        }
        .prose-koda code {
          font-family: "JetBrains Mono", monospace;
          font-size: 13px;
          background: rgba(184,153,104,0.15);
          padding: 2px 6px;
          border-radius: 2px;
          color: #5C3A21;
        }
        .prose-koda ul, .prose-koda ol {
          padding-left: 22px;
          margin: 14px 0;
        }
        .prose-koda li { margin: 6px 0; line-height: 1.55; }
        .prose-koda table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 14px;
        }
        .prose-koda th {
          text-align: left;
          padding: 10px 12px;
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8B7548;
          border-bottom: 1px solid #1C1C1C;
        }
        .prose-koda td {
          padding: 10px 12px;
          border-bottom: 1px solid rgba(184,153,104,0.25);
        }
        .prose-koda hr {
          border: none;
          height: 1px;
          margin: 40px 0;
          background: linear-gradient(to right, transparent, #B89968, transparent);
        }
        .prose-koda strong { font-weight: 600; color: #1C1C1C; }
        .prose-koda em { font-style: italic; color: #5C3A21; }
      `}</style>
    </div>
  );
}
