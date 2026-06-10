'use client';

export default function Sidebar() {
  return (
    <aside className="w-48 flex-shrink-0 bg-[#1a1d2e] border-r border-[#2d3148] flex flex-col">
      <div className="px-4 py-4 border-b border-[#2d3148]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#7c5cbf] rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="text-sm font-bold text-[#e2e8f0]">NemesysBoard</span>
        </div>
      </div>

      <nav className="flex-1 py-3">
        <div className="px-3 mb-1">
          <button className="w-full text-left px-3 py-2 rounded text-sm text-[#e2e8f0] bg-[#2d3148] font-medium">
            Calendrier
          </button>
        </div>
        <div className="px-3 mb-1">
          <button className="w-full text-left px-3 py-2 rounded text-sm text-[#6b7280] hover:text-[#e2e8f0] hover:bg-[#2d3148] transition-colors">
            Tableau de bord
          </button>
        </div>
        <div className="px-3 mb-1">
          <button className="w-full text-left px-3 py-2 rounded text-sm text-[#6b7280] hover:text-[#e2e8f0] hover:bg-[#2d3148] transition-colors">
            Équipe
          </button>
        </div>
      </nav>

      <div className="px-4 py-3 border-t border-[#2d3148]">
        <div className="text-xs text-[#6b7280]">Événements d&apos;équipe</div>
      </div>
    </aside>
  );
}
