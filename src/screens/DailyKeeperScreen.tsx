import React, { useState } from 'react';
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Clock,
  FileWarning,
  Info,
  MapPin,
  RotateCcw,
  Send,
  ThumbsDown,
  ThumbsUp,
  UserCheck,
  Users,
  Utensils,
  XCircle,
} from 'lucide-react';
import {
  BsdZooLogo,
  StatusBadge,
  ZooButton,
  ZooInput,
} from '../components/ui/ZooComponents';
import { ScreenId, ThemeTokens, ViewportMode } from '../theme/themeConfig';

interface DailyKeeperScreenProps {
  theme: ThemeTokens;
  viewportMode: ViewportMode;
  onNavigateScreen: (screen: ScreenId) => void;
}

const KEEPER_SIDEBAR_MENU = [
  { id: 'jadwal', label: 'Jadwal dan tugas', icon: ClipboardCheck },
  { id: 'rutin', label: 'Laporan rutin', icon: CalendarDays },
  { id: 'insiden', label: 'Laporan insiden', icon: FileWarning },
  { id: 'cuti', label: 'Cuti dan tukar jadwal', icon: Users },
];

type AppetiteLevel = 'Baik' | 'Kurang' | 'Menolak';

interface KeeperTask {
  id: string;
  time: string;
  title: string;
  enclosureAndAnimal: string;
  completed: boolean;
  isFeedTask?: boolean;
  nutritionFormula?: string;
  amountGivenKg?: string;
  leftoverKg?: string;
  appetite?: AppetiteLevel;
  notes?: string;
  needsAttention?: boolean;
}

const INITIAL_TASKS: KeeperTask[] = [
  {
    id: 'task-0630',
    time: '06.30',
    title: 'Cek air minum dan suhu kandang',
    enclosureAndAnimal: 'Kandang Sumatera A1–A4 · Suhu rata-rata 26,4°C',
    completed: true,
    notes: 'Aliran air otomatis normal, kunci ganda kandang tidur terverifikasi.',
  },
  {
    id: 'task-0730',
    time: '07.30',
    title: 'Pakan pagi Harimau "Bara"',
    enclosureAndAnimal: 'Kandang A1 · Harimau Sumatera (Panthera tigris sumatrae)',
    completed: true,
    isFeedTask: true,
    nutritionFormula: 'Daging sapi segar tanpa lemak & suplemen kalsium, 6,2 kg',
    amountGivenKg: '6,2',
    leftoverKg: '0,0',
    appetite: 'Baik',
  },
  {
    id: 'task-0800',
    time: '08.00',
    title: 'Pakan pagi Beruang madu',
    enclosureAndAnimal: 'Kandang A3 · Beruang Madu "Madu & Bimo" (Helarctos malayanus)',
    completed: false,
    isFeedTask: true,
    nutritionFormula: 'Buah campur dan madu, 4,5 kg',
    amountGivenKg: '4,5',
    leftoverKg: '0,2',
    appetite: 'Baik',
    needsAttention: true,
  },
  {
    id: 'task-0900',
    time: '09.00',
    title: 'Bersihkan kandang',
    enclosureAndAnimal: 'Kandang A1–A3 · Area pamer & kolam rendam Zona Sumatera',
    completed: false,
    notes: 'Gunakan desinfektan food-grade sesuai protokol sanitasi mingguan.',
  },
  {
    id: 'task-1030',
    time: '10.30',
    title: 'Observasi perilaku',
    enclosureAndAnimal: 'Kandang A1 (Harimau "Bara") & Kandang A3 (Beruang Madu)',
    completed: false,
    notes: 'Catat respons pengayaan lingkungan (enrichment) bola rotan.',
  },
  {
    id: 'task-1300',
    time: '13.00',
    title: 'Pakan siang',
    enclosureAndAnimal: 'Kandang A2 & A3 · Beruang Madu & Tapir Asia',
    completed: false,
    isFeedTask: true,
    nutritionFormula: 'Pepaya matang, ubi rebus, dan serangga pakan, 3,8 kg',
    amountGivenKg: '3,8',
    leftoverKg: '0,0',
    appetite: 'Baik',
  },
];

const SHIFT_TEAM = [
  {
    id: 'team-1',
    name: 'Hendra Wijaya',
    role: 'Head Keeper · Zona Sumatera',
    location: 'Pos Komando Sektor A',
    onlineStatus: 'Aktif di lapangan',
  },
  {
    id: 'team-2',
    name: 'Siti Rahmawati',
    role: 'Keeper · Karnivora Besar',
    location: 'Kandang A1–A2',
    onlineStatus: 'Aktif di lapangan',
  },
  {
    id: 'team-3',
    name: 'Dimas Pratama',
    role: 'Keeper · Omnivora & Tapir',
    location: 'Dapur Pakan Zona A',
    onlineStatus: 'Aktif di gudang pakan',
  },
];

const MY_WEEKLY_SCHEDULE = [
  { day: 'Senin, 28 Sep', shift: 'Pagi (06.00–14.00)', zone: 'Zona Sumatera (A1–A4)', status: 'Selesai' },
  { day: 'Selasa, 29 Sep (Hari ini)', shift: 'Pagi (06.00–14.00)', zone: 'Zona Sumatera (A1–A4)', status: 'Sedang berjalan' },
  { day: 'Rabu, 30 Sep', shift: 'Pagi (06.00–14.00)', zone: 'Zona Sumatera (A1–A4)', status: 'Terjadwal' },
  { day: 'Kamis, 1 Okt', shift: 'Siang (13.00–21.00)', zone: 'Karantina & Medis Satwa', status: 'Terjadwal' },
  { day: 'Jumat, 2 Okt', shift: 'Libur Shift Mingguan', zone: '—', status: 'Libur rutin' },
];

export function DailyKeeperScreen({
  theme,
  viewportMode,
}: DailyKeeperScreenProps) {
  const [activeSidebar, setActiveSidebar] = useState('jadwal');
  const [activeTab, setActiveTab] = useState<'today' | 'schedule'>('today');
  const [tasks, setTasks] = useState<KeeperTask[]>(INITIAL_TASKS);
  // Tugas 08.00 Pakan pagi Beruang madu dibuka/expanded secara default sesuai prompt
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>('task-0800');
  const [reportSentToHeadKeeper, setReportSentToHeadKeeper] = useState(false);

  const isTablet = viewportMode === 'tablet';

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const remainingCount = totalCount - completedCount;
  const overdueCount = 0;
  const attentionCount = tasks.filter((t) => !t.completed && t.needsAttention).length;
  const allCompleted = completedCount === totalCount;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleUpdateTaskField = (
    taskId: string,
    field: keyof KeeperTask,
    value: string | boolean
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, [field]: value } : task
      )
    );
    setReportSentToHeadKeeper(false);
  };

  const handleMarkTaskDone = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      );
      // Buka otomatis tugas berikutnya yang belum selesai jika ada
      const nextIncomplete = updated.find((t) => !t.completed);
      if (nextIncomplete) {
        setExpandedTaskId(nextIncomplete.id);
      }
      return updated;
    });
    setReportSentToHeadKeeper(false);
  };

  const handleToggleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    setReportSentToHeadKeeper(false);
  };

  const handleCompleteAllDemo = () => {
    setTasks((prev) => prev.map((t) => ({ ...t, completed: true })));
    setReportSentToHeadKeeper(false);
  };

  const handleResetDefaultDemo = () => {
    setTasks(INITIAL_TASKS);
    setExpandedTaskId('task-0800');
    setReportSentToHeadKeeper(false);
  };

  const renderRightPanels = () => (
    <div
      className={`space-y-6 ${
        isTablet ? 'grid grid-cols-2 gap-6 space-y-0 items-start' : ''
      }`}
    >
      {/* ===================================================================
          PANEL PROGRES ("2 dari 6 tugas selesai", progress bar, 3 angka kecil,
          tombol "Kirim ke Head Keeper" nonaktif sampai semua tugas selesai)
         =================================================================== */}
      <section
        aria-labelledby="progress-panel-title"
        className={`${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} ${theme.radiusClass} p-6 space-y-5`}
      >
        <div className="flex items-center justify-between gap-2">
          <h2
            id="progress-panel-title"
            className={`text-lg font-bold ${theme.headingColor}`}
          >
            Progres tugas harian
          </h2>
          <span
            className={`font-mono text-sm font-bold px-2.5 py-1 ${theme.radiusSmClass} ${theme.accentBg} ${theme.accentText}`}
          >
            {progressPercent}%
          </span>
        </div>

        {/* Kalimat Utama & Progress Bar */}
        <div className="space-y-2.5">
          <div className={`text-xl font-bold font-mono ${theme.bodyColor}`}>
            {completedCount} dari {totalCount} tugas selesai
          </div>

          <div
            role="progressbar"
            aria-valuenow={completedCount}
            aria-valuemin={0}
            aria-valuemax={totalCount}
            className={`w-full h-3.5 ${theme.radiusSmClass} bg-black/10 overflow-hidden`}
          >
            <div
              className={`h-full transition-all duration-200 ${theme.primaryBtnBg}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Tiga Angka Kecil: Belum, Terlambat, Perlu perhatian */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div
            className={`p-3 ${theme.radiusSmClass} bg-black/[0.03] border border-black/10 text-center`}
          >
            <div className="font-mono text-xl font-bold tabular-nums">
              {remainingCount}
            </div>
            <div className={`text-xs font-semibold mt-0.5 ${theme.mutedColor}`}>
              Belum
            </div>
          </div>

          <div
            className={`p-3 ${theme.radiusSmClass} bg-black/[0.03] border border-black/10 text-center`}
          >
            <div className="font-mono text-xl font-bold tabular-nums">
              {overdueCount}
            </div>
            <div className={`text-xs font-semibold mt-0.5 ${theme.mutedColor}`}>
              Terlambat
            </div>
          </div>

          <div
            className={`p-3 ${theme.radiusSmClass} ${
              attentionCount > 0
                ? `${theme.warningBg} border ${theme.warningBorder}`
                : 'bg-black/[0.03] border border-black/10'
            } text-center`}
          >
            <div
              className={`font-mono text-xl font-bold tabular-nums ${
                attentionCount > 0 ? theme.warningColor : ''
              }`}
            >
              {attentionCount}
            </div>
            <div
              className={`text-xs font-semibold mt-0.5 ${
                attentionCount > 0 ? theme.warningColor : theme.mutedColor
              }`}
            >
              Perlu perhatian
            </div>
          </div>
        </div>

        {/* Tombol "Kirim ke Head Keeper" (Nonaktif sampai semua tugas selesai) + Teks Bantuan */}
        <div className="pt-3 border-t border-black/10 space-y-2.5">
          <ZooButton
            theme={theme}
            type="button"
            variant="primary"
            fullWidth
            disabled={!allCompleted}
            onClick={() => setReportSentToHeadKeeper(true)}
          >
            <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Kirim ke Head Keeper</span>
          </ZooButton>

          {reportSentToHeadKeeper ? (
            <div className="pt-1">
              <StatusBadge
                theme={theme}
                variant="success"
                label="Laporan harian terkirim ke Hendra Wijaya (Head Keeper)"
              />
            </div>
          ) : (
            <p className={`text-xs leading-relaxed ${theme.mutedColor}`}>
              {allCompleted
                ? 'Seluruh 6 tugas telah selesai. Klik tombol di atas untuk mengirim rekap shift ke Head Keeper.'
                : 'Tombol aktif otomatis setelah seluruh 6 tugas harian ditandai selesai.'}
            </p>
          )}

          {/* Kontrol bantu simulasi cepat untuk mencoba state selesai semua vs default 2/6 */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {!allCompleted ? (
              <button
                type="button"
                onClick={handleCompleteAllDemo}
                className={`${theme.focusClass} text-xs font-semibold px-2.5 py-1.5 ${theme.radiusSmClass} bg-black/[0.05] hover:bg-black/[0.09] ${theme.headingColor} cursor-pointer`}
              >
                Simulasi: Tandai 6/6 Selesai
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetDefaultDemo}
                className={`${theme.focusClass} inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 ${theme.radiusSmClass} bg-black/[0.05] hover:bg-black/[0.09] ${theme.headingColor} cursor-pointer`}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset ke 2 dari 6 tugas</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================================
          PANEL "SATU SHIFT DENGAN KAMU" (Daftar 3 orang: Head Keeper & 2 Keeper)
         =================================================================== */}
      <section
        aria-labelledby="shift-team-title"
        className={`${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} ${theme.radiusClass} p-6 space-y-4`}
      >
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-black/10">
          <h2
            id="shift-team-title"
            className={`text-lg font-bold ${theme.headingColor}`}
          >
            Satu shift dengan kamu
          </h2>
          <span className={`font-mono text-xs font-semibold ${theme.mutedColor}`}>
            3 personel aktif
          </span>
        </div>

        <ul className="space-y-3.5">
          {SHIFT_TEAM.map((member) => (
            <li
              key={member.id}
              className={`p-3.5 ${theme.radiusSmClass} bg-black/[0.02] border border-black/10 flex items-start justify-between gap-3`}
            >
              <div className="min-w-0">
                <div className={`font-bold text-[15px] ${theme.bodyColor}`}>
                  {member.name}
                </div>
                <div className={`text-xs font-semibold mt-0.5 ${theme.headingColor}`}>
                  {member.role}
                </div>
                <div className={`text-xs mt-1 ${theme.mutedColor}`}>
                  Lokasi: {member.location}
                </div>
              </div>

              {/* Titik Status Online + Label Teks */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${theme.radiusSmClass} text-xs font-semibold shrink-0 ${theme.successBg} ${theme.successColor} border ${theme.successBorder}`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full bg-[#16A34A] shrink-0"
                  aria-hidden="true"
                />
                <span>Online</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );

  return (
    <div
      className={`w-full ${
        isTablet ? 'min-h-[1130px]' : 'min-h-[calc(100vh-56px)]'
      } ${theme.pageBg} ${theme.fontClass} flex`}
    >
      {/* ===================================================================
          SIDEBAR KIRI (Menu Role Keeper — Tanpa Bottom Navigation)
         =================================================================== */}
      <aside
        aria-label="Navigasi Utama Keeper"
        className={`${
          isTablet ? 'w-[216px]' : 'w-[260px]'
        } shrink-0 ${theme.sidebarBg} ${theme.sidebarText} border-r ${
          theme.sidebarBorder
        } flex flex-col justify-between select-none`}
      >
        <div className="p-5 space-y-6">
          <BsdZooLogo theme={theme} surface="sidebar" size="md" />

          {/* Kartu Identitas Keeper Lapangan */}
          <div
            className={`p-3.5 ${theme.radiusSmClass} ${
              theme.id === 'modern'
                ? 'bg-[#F7F8F5] border border-[#E4E8E0]'
                : 'bg-black/20 border border-white/10'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono opacity-80">
              <UserCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>KEEPER LAPANGAN</span>
            </div>
            <div className="font-bold text-base mt-0.5">Rudi Hartono</div>
            <div className={`text-xs font-mono mt-0.5 ${theme.sidebarMuted}`}>
              NIP: 19940819-BSD-KPR
            </div>
          </div>

          {/* Menu Sidebar Keeper (Touch Target >= 48px / 52px) */}
          <nav aria-label="Menu Harian Keeper" className="space-y-2">
            {KEEPER_SIDEBAR_MENU.map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebar === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSidebar(item.id)}
                  className={`${theme.focusClass} w-full ${
                    theme.controlHeightClass
                  } px-3.5 ${
                    theme.radiusClass
                  } flex items-center gap-3 text-left transition-colors cursor-pointer ${
                    isActive
                      ? `${theme.sidebarActiveBg} ${theme.sidebarActiveText}`
                      : `${theme.sidebarText} ${theme.sidebarHoverBg}`
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="text-[15.5px] leading-snug">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className={`p-5 border-t ${theme.sidebarBorder} text-xs ${theme.sidebarMuted}`}>
          <div className="font-mono font-semibold">Sektor Konservasi Sumatera</div>
          <div className="mt-0.5">Tablet Lapangan Unit #TB-04</div>
        </div>
      </aside>

      {/* ===================================================================
          AREA UTAMA + PANEL KANAN (Di Tablet Portrait Panel Kanan Pindah ke Bawah)
         =================================================================== */}
      <div className="flex-1 min-w-0 p-6 xl:p-8 overflow-y-auto">
        {/* HEADER: Sapaan "Selamat pagi, Rudi", Tanggal, Badge Shift, Badge Zona */}
        <header className="flex flex-wrap items-start justify-between gap-4 pb-5 mb-6 border-b border-black/10">
          <div>
            <p className={`text-sm font-mono font-semibold ${theme.mutedColor}`}>
              Selasa, 29 September 2026
            </p>
            <h1
              className={`text-2xl sm:text-[28px] font-bold tracking-tight mt-1 ${theme.headingColor}`}
            >
              Selamat pagi, Rudi
            </h1>
          </div>

          {/* Badge Shift & Zona (Selalu dengan Ikon + Label Teks) */}
          <div className="flex flex-wrap items-center gap-2.5">
            <StatusBadge
              theme={theme}
              variant="info"
              icon={<Clock className="h-4 w-4 shrink-0" aria-hidden="true" />}
              label="Shift: Pagi 06.00-14.00"
            />
            <StatusBadge
              theme={theme}
              variant="success"
              icon={<MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />}
              label="Zona: Sumatera"
            />
          </div>
        </header>

        {/* TAB: "Tugas hari ini" (aktif) dan "Jadwal saya" */}
        <div
          role="tablist"
          aria-label="Tampilan Tugas dan Jadwal Keeper"
          className="flex items-center gap-3 mb-6"
        >
          <button
            role="tab"
            type="button"
            aria-selected={activeTab === 'today'}
            onClick={() => setActiveTab('today')}
            className={`${theme.focusClass} ${theme.controlHeightClass} px-6 ${
              theme.radiusClass
            } font-bold ${
              theme.bodyTextClass
            } inline-flex items-center gap-2.5 cursor-pointer transition-colors ${
              activeTab === 'today'
                ? `${theme.primaryBtnBg} text-white`
                : `bg-white ${theme.cardBorder} ${theme.headingColor} hover:bg-black/[0.03]`
            }`}
          >
            <ClipboardCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Tugas hari ini</span>
            <span
              className={`font-mono text-xs px-2 py-0.5 ${theme.radiusSmClass} ${
                activeTab === 'today'
                  ? 'bg-white/20 text-white'
                  : 'bg-black/10 text-current'
              }`}
            >
              {completedCount}/{totalCount}
            </span>
          </button>

          <button
            role="tab"
            type="button"
            aria-selected={activeTab === 'schedule'}
            onClick={() => setActiveTab('schedule')}
            className={`${theme.focusClass} ${theme.controlHeightClass} px-6 ${
              theme.radiusClass
            } font-bold ${
              theme.bodyTextClass
            } inline-flex items-center gap-2.5 cursor-pointer transition-colors ${
              activeTab === 'schedule'
                ? `${theme.primaryBtnBg} text-white`
                : `bg-white ${theme.cardBorder} ${theme.headingColor} hover:bg-black/[0.03]`
            }`}
          >
            <CalendarDays className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Jadwal saya</span>
          </button>
        </div>

        {/* Grid Konten: Desktop 12 Kolom (8 Daftar Tugas + 4 Panel Kanan), Tablet Portrait 1 Kolom (Panel Kanan di Bawah) */}
        <div
          className={`grid gap-6 ${
            isTablet ? 'grid-cols-1' : 'grid-cols-12 items-start'
          }`}
        >
          {/* AREA UTAMA (Tengah) */}
          <div className={`${isTablet ? '' : 'col-span-8'} space-y-4`}>
            {activeTab === 'today' ? (
              tasks.map((task) => {
                const isExpanded = expandedTaskId === task.id;
                return (
                  <article
                    key={task.id}
                    className={`${theme.cardBg} ${
                      isExpanded
                        ? `border-2 ${
                            theme.id === 'earthy'
                              ? 'border-[#6E3511]'
                              : 'border-[#2D4F2B]'
                          }`
                        : theme.cardBorder
                    } ${theme.cardShadow} ${theme.radiusClass} overflow-hidden transition-colors`}
                  >
                    {/* Baris Utama Tugas (Touch target besar >= 56px) */}
                    <div
                      className={`p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 ${
                        isExpanded ? 'border-b border-black/10 bg-black/[0.015]' : ''
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedTaskId(isExpanded ? null : task.id)
                        }
                        className={`${theme.focusClass} flex-1 min-w-[240px] flex items-start gap-3.5 text-left cursor-pointer`}
                      >
                        <span
                          className={`font-mono text-base font-bold px-3 py-1.5 ${
                            theme.radiusSmClass
                          } shrink-0 tabular-nums ${
                            task.completed
                              ? `${theme.successBg} ${theme.successColor} border ${theme.successBorder}`
                              : `${theme.accentBg} ${theme.accentText}`
                          }`}
                        >
                          {task.time}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              className={`font-bold ${
                                theme.id === 'earthy'
                                  ? 'text-[19px]'
                                  : 'text-[17px]'
                              } ${theme.headingColor}`}
                            >
                              {task.title}
                            </h3>
                            {task.needsAttention && !task.completed && (
                              <span
                                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 ${theme.radiusSmClass} ${theme.warningBg} ${theme.warningColor}`}
                              >
                                <AlertTriangle
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                                <span>Prioritas Pakan</span>
                              </span>
                            )}
                          </div>
                          <p className={`text-sm mt-0.5 ${theme.mutedColor}`}>
                            {task.enclosureAndAnimal}
                          </p>
                        </div>
                      </button>

                      {/* Badge Status (Selesai / Belum dengan Ikon + Teks) & Tombol Buka/Tutup */}
                      <div className="flex items-center gap-2.5">
                        <StatusBadge
                          theme={theme}
                          variant={task.completed ? 'success' : 'warning'}
                          label={task.completed ? 'Selesai' : 'Belum'}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedTaskId(isExpanded ? null : task.id)
                          }
                          aria-expanded={isExpanded}
                          aria-label={
                            isExpanded
                              ? `Tutup rincian ${task.title}`
                              : `Buka rincian ${task.title}`
                          }
                          className={`${theme.focusClass} h-12 w-12 ${theme.radiusSmClass} border border-black/15 bg-white hover:bg-black/5 flex items-center justify-center cursor-pointer`}
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="h-5 w-5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Panel Rincian Ketika Tugas Dibuka (Khususnya 08.00 Pakan pagi Beruang madu) */}
                    {isExpanded && (
                      <div className="p-5 sm:p-6 space-y-5 bg-white">
                        {task.isFeedTask ? (
                          <>
                            {/* Formula dari Ahli Nutrisi */}
                            <div
                              className={`p-4 ${theme.radiusClass} ${theme.successBg} border ${theme.successBorder} flex items-start gap-3`}
                            >
                              <Utensils
                                className={`h-5 w-5 shrink-0 mt-0.5 ${theme.successColor}`}
                                aria-hidden="true"
                              />
                              <div>
                                <div
                                  className={`text-xs font-mono uppercase tracking-wider font-bold ${theme.successColor}`}
                                >
                                  Formula dari Ahli Nutrisi
                                </div>
                                <div
                                  className={`font-bold text-lg mt-0.5 ${theme.headingColor}`}
                                >
                                  {task.nutritionFormula}
                                </div>
                              </div>
                            </div>

                            {/* Input Jumlah diberikan (kg) & Sisa pakan (kg) */}
                            <div className="grid grid-cols-2 gap-4">
                              <ZooInput
                                theme={theme}
                                id={`given-${task.id}`}
                                label="Jumlah diberikan (kg)"
                                mono
                                value={task.amountGivenKg || ''}
                                onChange={(e) =>
                                  handleUpdateTaskField(
                                    task.id,
                                    'amountGivenKg',
                                    e.target.value
                                  )
                                }
                                placeholder="Contoh: 4,5"
                                rightElement={
                                  <span className="px-3 font-mono text-sm font-bold text-[#526050]">
                                    kg
                                  </span>
                                }
                              />

                              <ZooInput
                                theme={theme}
                                id={`leftover-${task.id}`}
                                label="Sisa pakan (kg)"
                                mono
                                value={task.leftoverKg || ''}
                                onChange={(e) =>
                                  handleUpdateTaskField(
                                    task.id,
                                    'leftoverKg',
                                    e.target.value
                                  )
                                }
                                placeholder="Contoh: 0,2"
                                rightElement={
                                  <span className="px-3 font-mono text-sm font-bold text-[#526050]">
                                    kg
                                  </span>
                                }
                              />
                            </div>

                            {/* Pilihan Segmented "Nafsu makan": Baik / Kurang / Menolak */}
                            <div>
                              <span
                                className={`block mb-2 ${theme.labelTextClass} ${theme.headingColor}`}
                              >
                                Nafsu makan
                              </span>
                              <div
                                role="group"
                                aria-label="Pilihan nafsu makan satwa"
                                className="grid grid-cols-3 gap-3"
                              >
                                {(
                                  [
                                    {
                                      value: 'Baik' as AppetiteLevel,
                                      label: 'Baik',
                                      icon: ThumbsUp,
                                    },
                                    {
                                      value: 'Kurang' as AppetiteLevel,
                                      label: 'Kurang',
                                      icon: ThumbsDown,
                                    },
                                    {
                                      value: 'Menolak' as AppetiteLevel,
                                      label: 'Menolak',
                                      icon: XCircle,
                                    },
                                  ] as const
                                ).map((opt) => {
                                  const Icon = opt.icon;
                                  const selected =
                                    (task.appetite || 'Baik') === opt.value;
                                  return (
                                    <button
                                      key={opt.value}
                                      type="button"
                                      aria-pressed={selected}
                                      onClick={() =>
                                        handleUpdateTaskField(
                                          task.id,
                                          'appetite',
                                          opt.value
                                        )
                                      }
                                      className={`${theme.focusClass} ${
                                        theme.controlHeightClass
                                      } px-4 ${
                                        theme.radiusClass
                                      } font-bold ${
                                        theme.bodyTextClass
                                      } flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                                        selected
                                          ? opt.value === 'Menolak'
                                            ? 'bg-[#B3261E] text-white'
                                            : opt.value === 'Kurang'
                                            ? `${theme.accentBg} ${theme.accentText} border-2 border-current`
                                            : `${theme.primaryBtnBg} text-white`
                                          : `bg-white ${theme.inputBorder} ${theme.bodyColor} hover:bg-black/[0.03]`
                                      }`}
                                    >
                                      <Icon
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                      />
                                      <span>{opt.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Catatan Otomatisasi Gudang Pakan & Tombol "Tandai selesai" */}
                            <div className="pt-3 border-t border-black/10 flex flex-wrap items-center justify-between gap-4">
                              <div
                                className={`flex items-center gap-2 text-sm font-medium ${theme.infoColor}`}
                              >
                                <Info
                                  className="h-5 w-5 shrink-0"
                                  aria-hidden="true"
                                />
                                <span>
                                  Jumlah diberikan mengurangi stok gudang pakan
                                  otomatis
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                {task.completed ? (
                                  <ZooButton
                                    theme={theme}
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                      handleToggleTaskComplete(task.id)
                                    }
                                  >
                                    Batalkan status selesai
                                  </ZooButton>
                                ) : (
                                  <ZooButton
                                    theme={theme}
                                    type="button"
                                    variant="primary"
                                    onClick={() => handleMarkTaskDone(task.id)}
                                  >
                                    <CheckCircle2
                                      className="h-5 w-5 shrink-0"
                                      aria-hidden="true"
                                    />
                                    <span>Tandai selesai</span>
                                  </ZooButton>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          /* Rincian Tugas Non-Pakan (Sanitasi / Air Minum / Observasi) */
                          <div className="space-y-4">
                            <p className={`${theme.bodyTextClass} ${theme.bodyColor}`}>
                              {task.notes}
                            </p>
                            <div className="flex justify-end">
                              {task.completed ? (
                                <ZooButton
                                  theme={theme}
                                  type="button"
                                  variant="outline"
                                  onClick={() =>
                                    handleToggleTaskComplete(task.id)
                                  }
                                >
                                  Batalkan status selesai
                                </ZooButton>
                              ) : (
                                <ZooButton
                                  theme={theme}
                                  type="button"
                                  variant="primary"
                                  onClick={() => handleMarkTaskDone(task.id)}
                                >
                                  <CheckCircle2
                                    className="h-5 w-5 shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span>Tandai selesai</span>
                                </ZooButton>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })
            ) : (
              /* Tab "Jadwal saya" */
              <div
                className={`${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} ${theme.radiusClass} p-6 space-y-4`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-black/10">
                  <div>
                    <h2 className={`text-lg font-bold ${theme.headingColor}`}>
                      Jadwal Shift Mingguan — Rudi Hartono
                    </h2>
                    <p className={`text-sm ${theme.mutedColor}`}>
                      Periode 28 September – 4 Oktober 2026 · Zona Sumatera
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-black/10">
                  {MY_WEEKLY_SCHEDULE.map((row) => (
                    <div
                      key={row.day}
                      className="py-3.5 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <div className={`font-bold ${theme.bodyTextClass} ${theme.bodyColor}`}>
                          {row.day}
                        </div>
                        <div className={`text-sm font-mono ${theme.mutedColor}`}>
                          {row.shift} · {row.zone}
                        </div>
                      </div>
                      <StatusBadge
                        theme={theme}
                        size="sm"
                        variant={
                          row.status === 'Selesai'
                            ? 'success'
                            : row.status === 'Sedang berjalan'
                            ? 'info'
                            : 'neutral'
                        }
                        label={row.status}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PANEL KANAN (Di Desktop berada di kanan col-span-4, di Tablet Portrait pindah ke bawah) */}
          <div className={isTablet ? 'w-full pt-2' : 'col-span-4 sticky top-6'}>
            {renderRightPanels()}
          </div>
        </div>
      </div>
    </div>
  );
}
