'use client';

import { CalendarEvent } from '../types/calendar';

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const DAYS_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTHS_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  today: Date;
}

export default function DayView({ currentDate, events, today }: DayViewProps) {
  const isToday =
    currentDate.getFullYear() === today.getFullYear() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getDate() === today.getDate();

  const dayEvents = events.filter(
    (e) =>
      e.date.getFullYear() === currentDate.getFullYear() &&
      e.date.getMonth() === currentDate.getMonth() &&
      e.date.getDate() === currentDate.getDate()
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#2d3148] py-3 px-4">
        <div className={`text-sm font-semibold ${isToday ? 'text-[#7c5cbf]' : 'text-[#e2e8f0]'}`}>
          {DAYS_FR[currentDate.getDay()]} {currentDate.getDate()} {MONTHS_FR[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
      </div>

      {/* Time grid */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {HOURS.map((hour) => {
          const hourEvents = dayEvents.filter((ev) => {
            if (!ev.startTime) return false;
            return parseInt(ev.startTime.split(':')[0]) === hour;
          });
          return (
            <div
              key={hour}
              className="flex border-b border-[#2d3148]"
              style={{ minHeight: '60px' }}
            >
              <div className="w-12 border-r border-[#2d3148] px-1 pt-1 flex-shrink-0">
                <span className="text-[10px] text-[#6b7280]">
                  {String(hour).padStart(2, '0')}:00
                </span>
              </div>
              <div className="flex-1 p-1">
                {hourEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="text-xs text-white px-2 py-1 rounded mb-0.5"
                    style={{ backgroundColor: ev.color }}
                  >
                    <span className="opacity-80 mr-1">{ev.startTime}</span>
                    {ev.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
