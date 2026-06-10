'use client';

import { CalendarEvent } from '../types/calendar';

const DAYS = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  today: Date;
}

export default function MonthView({ currentDate, events, today }: MonthViewProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  // getDay() returns 0=Sun, 1=Mon... we want Mon=0
  let startOffset = firstDayOfMonth.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  const cells: { day: number; month: 'prev' | 'current' | 'next' }[] = [];
  for (let i = 0; i < totalCells; i++) {
    if (i < startOffset) {
      cells.push({ day: daysInPrevMonth - startOffset + i + 1, month: 'prev' });
    } else if (i < startOffset + daysInMonth) {
      cells.push({ day: i - startOffset + 1, month: 'current' });
    } else {
      cells.push({ day: i - startOffset - daysInMonth + 1, month: 'next' });
    }
  }

  const isToday = (day: number, m: string) => {
    return (
      m === 'current' &&
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const getEventsForDay = (day: number, m: string) => {
    if (m !== 'current') return [];
    return events.filter(
      (e) =>
        e.date.getFullYear() === year &&
        e.date.getMonth() === month &&
        e.date.getDate() === day
    );
  };

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-[#2d3148]">
        {DAYS.map((d) => (
          <div
            key={d}
            className="py-2 text-center text-xs font-semibold text-[#6b7280] tracking-wider border-r border-[#2d3148] last:border-r-0"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex flex-col flex-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 flex-1 border-b border-[#2d3148] last:border-b-0" style={{ minHeight: '100px' }}>
            {week.map((cell, ci) => {
              const dayEvents = getEventsForDay(cell.day, cell.month);
              const todayCell = isToday(cell.day, cell.month);
              return (
                <div
                  key={ci}
                  className={`border-r border-[#2d3148] last:border-r-0 p-1 ${
                    cell.month !== 'current' ? 'opacity-30' : ''
                  } ${todayCell ? 'bg-[#1e2a4a]' : ''}`}
                >
                  <div className="flex items-center justify-start mb-1">
                    <span
                      className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${
                        todayCell
                          ? 'bg-[#7c5cbf] text-white'
                          : 'text-[#e2e8f0]'
                      }`}
                    >
                      {cell.day}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {dayEvents.slice(0, 3).map((ev) => (
                      <div
                        key={ev.id}
                        className="text-[10px] text-white px-1 py-0.5 rounded truncate"
                        style={{ backgroundColor: ev.color }}
                        title={`${ev.startTime} ${ev.title}`}
                      >
                        {ev.startTime && (
                          <span className="opacity-80 mr-1">{ev.startTime}</span>
                        )}
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-[10px] text-[#6b7280] px-1">
                        +{dayEvents.length - 3} autres
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
