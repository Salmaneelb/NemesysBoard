import Calendar from '../components/Calendar';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="flex h-screen bg-[#0f1117] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Calendar />
      </main>
    </div>
  );
}
