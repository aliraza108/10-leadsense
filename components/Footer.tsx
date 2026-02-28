"use client";

export default function Footer() {
  return (
    <footer className="bg-surface/80">
      <div className="h-1 w-full bg-hero" />
      <div className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xl font-heading font-black">
            <span className="text-text">Lead</span>
            <span className="text-primary">Sense</span>
          </div>
          <p className="mt-2 text-xs text-muted">AI Sales Intelligence for Modern Teams</p>
        </div>
        <div className="flex gap-6 text-xs text-muted">
          <span>Docs</span>
          <span>API</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
        <p className="text-xs text-muted">Built with ♥ and Gemini AI</p>
      </div>
      </div>
    </footer>
  );
}
