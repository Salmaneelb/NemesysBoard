'use client';

import { CalendarEvent } from '../types/calendar';

const DAY_LABELS = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  today: Date;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun, 1=Mon...
  const diff = day === 0 ? -6 : 1 - day; // adjust to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function WeekView({ currentDate, events, today }: WeekViewProps) {
  const weekStart = getWeekStart(currentDate);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const isToday = (d: Date) =>
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();

  const getEventsForDay = (d: Date) =>
    events.filter(
      (e) =>
        e.date.getFullYear() === d.getFullYear() &&
        e.date.getMonth() === d.getMonth() &&
        e.date.getDate() === d.getDate()
    );

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Day headers */}
      <div className="grid border-b border-[#2d3148]" style={{ gridTemplateColumns: '48px repeat(7, 1fr)' }}>
        <div className="border-r border-[#2d3148]" />
        {weekDays.map((d, i) => {
          const today_ = isToday(d);
          return (
            <div
              key={i}
              className="py-2 text-center border-r border-[#2d3148] last:border-r-0"
            >
              <div className="text-xs font-semibold text-[#6b7280] tracking-wider">
                {DAY_LABELS[i]}
              </div>
              <div
                className={`text-sm font-bold mx-auto mt-0.5 w-7 h-7 flex items-center justify-center rounded-full ${
                  today_ ? 'bg-[#7c5cbf] text-white' : 'text-[#e2e8f0]'
                }`}
              >
                {d.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="grid border-b border-[#2d3148]"
            style={{ gridTemplateColumns: '48px repeat(7, 1fr)', minHeight: '60px' }}
          >
            <div className="border-r border-[#2d3148] px-1 pt-1">
              <span className="text-[10px] text-[#6b7280]">
                {String(hour).padStart(2, '0')}:00
              </span>
            </div>
            {weekDays.map((d, di) => {
              const dayEvents = getEventsForDay(d).filter((ev) => {
                if (!ev.startTime) return false;
                const h = parseInt(ev.startTime.split(':')[0]);
                return h === hour;
              });
              return (
                <div
                  key={di}
                  className={`border-r border-[#2d3148] last:border-r-0 relative p-0.5 ${
                    isToday(d) ? 'bg-[#1e2a4a]/30' : ''
                  }`}
                >
                  {dayEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="text-[10px] text-white px-1 py-0.5 rounded truncate mb-0.5"
                      style={{ backgroundColor: ev.color }}
                      title={`${ev.startTime} ${ev.title}`}
                    >
                      <span className="opacity-80 mr-1">{ev.startTime}</span>
                      {ev.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
