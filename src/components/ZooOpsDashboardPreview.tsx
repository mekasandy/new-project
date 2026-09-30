import React, { useState } from 'react';
import {
  CheckCircle2,
  ClipboardCheck,
  LogOut,
  MapPin,
  Stethoscope,
  Utensils,
} from 'lucide-react';
import { Language, StaffAccount } from '../data/translations';
import { FaunaTrackLogo } from './BrandIllustration';

interface DashboardPreviewProps {
  account: StaffAccount;
  loginMethod: 'password' | 'pin' | 'biometric';
  lang: Language;
  onLogout: () => void;
}

interface EnclosureTask {
  code: string;
  species: { ID: string; EN: string };
  individual: string;
  enclosure: string;
  taskType: { ID: string; EN: string };
  time: string;
  completed: boolean;
}

const INITIAL_TASKS: EnclosureTask[] = [
  {
    code: 'EL-04',
    species: { ID: 'Gajah Sumatera', EN: 'Sumatran Elephant' },
    individual: 'Bona (Betina, 18 thn)',
    enclosure: 'KND-A01 · Savana Timur',
    taskType: {
      ID: 'Distribusi Pakan Pagi & Cek Elektrolit',
      EN: 'Morning Feed & Electrolyte Check',
    },
    time: '07:30',
    completed: true,
  },
  {
    code: 'TG-02',
    species: { ID: 'Harimau Sumatera', EN: 'Sumatran Tiger' },
    individual: 'Raja (Jantan, 9 thn)',
    enclosure: 'KND-A04 · Hutan Tropis',
    taskType: {
      ID: 'Observasi Perilaku & Kunci Sekat Kandang',
      EN: 'Behavioral Observation & Partition Lock',
    },
    time: '08:15',
    completed: false,
  },
  {
    code: 'TP-07',
    species: { ID: 'Tapir Asia', EN: 'Malayan Tapir' },
    individual: 'Maya (Betina, 6 thn)',
    enclosure: 'KND-B02 · Rawa Lembah',
    taskType: {
      ID: 'Timbang Berat Badan & Pemeriksaan Kuku',
      EN: 'Body Weight Log & Hoof Inspection',
    },
    time: '09:00',
    completed: false,
  },
  {
    code: 'HB-11',
    species: { ID: 'Rangkong Badak', EN: 'Rhinoceros Hornbill' },
    individual: 'Sepasang Indukan',
    enclosure: 'AVI-C03 · Kubah Burung',
    taskType: {
      ID: 'Pemberian Buah Ara & Suplemen Kalsium',
      EN: 'Fig Ration & Calcium Supplement',
    },
    time: '10:00',
    completed: false,
  },
];

export const ZooOpsDashboardPreview: React.FC<DashboardPreviewProps> = ({
  account,
  loginMethod,
  lang,
  onLogout,
}) => {
  const [tasks, setTasks] = useState<EnclosureTask[]>(INITIAL_TASKS);

  const toggleTask = (code: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.code === code ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  const methodLabels = {
    password: { ID: 'Kredensial Staf', EN: 'Staff Credentials' },
    pin: { ID: 'PIN Cepat Lapangan', EN: 'Field Quick PIN' },
    biometric: { ID: 'Biometrik Perangkat', EN: 'Device Biometric' },
  };

  return (
    <div className="min-h-screen bg-[#FFF1CA] text-[#1D351B] flex flex-col">
      {/* Top Bar following 3-zone contract */}
      <header className="bg-[#2D4F2B] text-[#FFF1CA] border-b border-[#708A58]/40 px-6 py-4">
        <div className="mx-auto max-w-[1200px] flex items-center justify-between gap-4">
          <FaunaTrackLogo variant="dark-panel" size="md" />

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#FFF1CA]/90">
            <span>{account.sector[lang]}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{account.id}</span>
            <span aria-hidden="true">·</span>
            <span>{methodLabels[loginMethod][lang]}</span>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="focus-zoo inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#FFB823] px-4 text-[15px] font-semibold text-[#2D4F2B] hover:bg-[#f2ab13] transition-colors whitespace-nowrap"
          >
            <LogOut className="h-4 w-4" />
            <span>
              {lang === 'ID' ? 'Keluar ke Halaman Login' : 'Sign Out to Login'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-[1200px] flex-1 p-6 md:p-8 space-y-6">
        {/* Active Session Welcome Banner */}
        <div className="rounded-[8px] border border-[#708A58]/50 bg-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#708A58] font-medium">
              <span className="font-mono font-semibold text-[#2D4F2B]">
                {account.id}
              </span>
              <span aria-hidden="true">·</span>
              <span>{account.role[lang]}</span>
              <span aria-hidden="true">·</span>
              <span>{account.sector[lang]}</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-[#2D4F2B]">
              {lang === 'ID'
                ? `Selamat bertugas, ${account.name}`
                : `Welcome on shift, ${account.name}`}
            </h1>
            <p className="mt-1 text-[16px] text-[#1D351B]/85">
              {lang === 'ID'
                ? 'Sesi FaunaTrack ZOO OPS aktif. Klik pada baris tugas kandang di bawah untuk memperbarui status harian.'
                : 'FaunaTrack ZOO OPS session is active. Click any enclosure task row below to update daily status.'}
            </p>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-[#2D4F2B]/15 pt-4 md:pt-0 md:pl-6 shrink-0">
            <div>
              <div className="text-sm text-[#708A58] font-medium">
                {lang === 'ID' ? 'Progres Shift Pagi' : 'Morning Shift Progress'}
              </div>
              <div className="font-mono text-2xl font-bold text-[#2D4F2B] tabular-nums">
                {completedCount} / {tasks.length}{' '}
                <span className="text-sm font-normal text-[#708A58]">
                  {lang === 'ID' ? 'Selesai' : 'Done'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Metric Strip (Single-level white cards, 8px radius, 1px border) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-[8px] border border-[#708A58]/40 bg-white p-5">
            <div className="flex items-center justify-between text-sm font-medium text-[#708A58]">
              <span>
                {lang === 'ID' ? 'Satwa Dalam Pantauan' : 'Monitored Wildlife'}
              </span>
              <ClipboardCheck className="h-4 w-4 text-[#2D4F2B]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-[#2D4F2B] tabular-nums">
              28 Individu
            </div>
            <div className="mt-1 text-xs text-[#1D351B]/70">
              4 Kandang Utama · 100% Terdata Pagi Ini
            </div>
          </div>

          <div className="rounded-[8px] border border-[#708A58]/40 bg-white p-5">
            <div className="flex items-center justify-between text-sm font-medium text-[#708A58]">
              <span>
                {lang === 'ID' ? 'Distribusi Ransum Pakan' : 'Feed Ration Status'}
              </span>
              <Utensils className="h-4 w-4 text-[#2D4F2B]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-[#2D4F2B] tabular-nums">
              142.5 kg
            </div>
            <div className="mt-1 text-xs text-[#1D351B]/70">
              Hijauan Segar · Buah · Pelet Nutrisi
            </div>
          </div>

          <div className="rounded-[8px] border border-[#708A58]/40 bg-white p-5">
            <div className="flex items-center justify-between text-sm font-medium text-[#708A58]">
              <span>
                {lang === 'ID' ? 'Jadwal Cek Veteriner' : 'Veterinary Checks'}
              </span>
              <Stethoscope className="h-4 w-4 text-[#2D4F2B]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-[#2D4F2B] tabular-nums">
              09:00 WIB
            </div>
            <div className="mt-1 text-xs text-[#1D351B]/70">
              KND-B02 · Tapir Asia (TP-07)
            </div>
          </div>
        </div>

        {/* Interactive Keeper Task Table */}
        <div className="rounded-[8px] border border-[#708A58]/50 bg-white overflow-hidden">
          <div className="border-b border-[#2D4F2B]/15 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D4F2B]">
              {lang === 'ID'
                ? 'Daftar Tugas Operasional Kandang Hari Ini'
                : "Today's Enclosure Operational Tasks"}
            </h2>
            <span className="font-mono text-xs font-medium text-[#708A58]">
              SHIFT PAGI · 07:00–15:00
            </span>
          </div>

          <div className="divide-y divide-[#2D4F2B]/10">
            {tasks.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => toggleTask(item.code)}
                className="focus-zoo w-full text-left px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FFF1CA]/40 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] border transition-colors ${
                      item.completed
                        ? 'border-[#2D4F2B] bg-[#2D4F2B] text-[#FFB823]'
                        : 'border-[#708A58] bg-white text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#2D4F2B]">
                        {item.code}
                      </span>
                      <span aria-hidden="true" className="text-[#708A58]">
                        ·
                      </span>
                      <span
                        className={`text-[16px] font-semibold ${
                          item.completed
                            ? 'line-through text-[#708A58]'
                            : 'text-[#2D4F2B]'
                        }`}
                      >
                        {item.species[lang]}
                      </span>
                      <span className="text-sm text-[#1D351B]/70">
                        ({item.individual})
                      </span>
                    </div>
                    <p className="mt-0.5 text-[15px] text-[#1D351B]">
                      {item.taskType[lang]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-9 sm:pl-0 shrink-0 text-sm text-[#708A58]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.enclosure}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono font-semibold text-[#2D4F2B] tabular-nums">
                    {item.time}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
