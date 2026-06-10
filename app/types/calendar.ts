export type ViewMode = 'jour' | 'semaine' | 'mois';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  color: string;
}
