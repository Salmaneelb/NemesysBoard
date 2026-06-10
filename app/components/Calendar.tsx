'use client';

import { useState } from 'react';
import { ViewMode } from '../types/calendar';
import { sampleEvents } from '../data/events';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';

const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const DAYS_FR_SHORT = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export default function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 10));
  const [view, setView] = useState<ViewMode>('mois');

  const navigate = (dir: -1 | 1) => {
    const d = new Date(currentDate);
    if (view === 'mois') {
      d.setMonth(d.getMonth() + dir);
    } else if (view === 'semaine') {
      d.setDate(d.getDate() + dir * 7);
    } else {
      d.setDate(d.getDate() + dir);
    }
    setCurrentDate(d);
  };

  const getTitle = () => {
    if (view === 'mois') {
      return `${MONTHS_FR[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
    if (view === 'semaine') {
      const start = new Date(currentDate);
      const day = start.getDay();
      const diff = day === 0 ? -6 : 1 - day;
      start.setDate(start.getDate() + diff);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      if (start.getMonth() === end.getMonth()) {
        return `${start.getDate()} – ${end.getDate()} ${MONTHS_FR[start.getMonth()]} ${start.getFullYear()}`;
      }
      return `${start.getDate()} ${MONTHS_FR[start.getMonth()]} – ${end.getDate()} ${MONTHS_FR[end.getMonth()]} ${end.getFullYear()}`;
    }
    return `${DAYS_FR_SHORT[currentDate.getDay()]} ${currentDate.getDate()} ${MONTHS_FR[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d3148]">
        {/* View switcher */}
        <div className="flex rounded-lg overflow-hidden border border-[#2d3148]">
          {(['jour', 'semaine', 'mois'] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-sm capitalize transition-colors ${
                view === v
                  ? 'bg-[#7c5cbf] text-white'
                  : 'text-[#6b7280] hover:text-[#e2e8f0] hover:bg-[#2d3148]'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#2d3148] text-[#e2e8f0] transition-colors"
          >
            ‹
          </button>
          <span className="text-base font-semibold text-[#e2e8f0] min-w-[180px] text-center">
            {getTitle()}
          </span>
          <button
            onClick={() => navigate(1)}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#2d3148] text-[#e2e8f0] transition-colors"
          >
            ›
          </button>
        </div>

        <div className="w-32" />
      </div>

      {/* Calendar content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {view === 'mois' && (
          <MonthView currentDate={currentDate} events={sampleEvents} today={today} />
        )}
        {view === 'semaine' && (
          <WeekView currentDate={currentDate} events={sampleEvents} today={today} />
        )}
        {view === 'jour' && (
          <DayView currentDate={currentDate} events={sampleEvents} today={today} />
        )}
      </div>
    </div>
  );
}
