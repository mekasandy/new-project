import React, { useState } from 'react';
import {
  ArrowLeftRight,
  Baby,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileCheck2,
  FilePlus2,
  FileText,
  FolderKanban,
  Info,
  LayoutDashboard,
  PawPrint,
  Send,
  Save,
  Upload,
  UserCheck,
} from 'lucide-react';
import {
  BsdZooLogo,
  StatusBadge,
  ZooButton,
  ZooInput,
  ZooSelect,
} from '../components/ui/ZooComponents';
import {
  MASTER_SPECIES,
  ScreenId,
  ThemeTokens,
  ViewportMode,
} from '../theme/themeConfig';

interface RegistrationScreenProps {
  theme: ThemeTokens;
  viewportMode: ViewportMode;
  onNavigateScreen: (screen: ScreenId) => void;
}

const REGISTRAR_MENU = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'registrasi', label: 'Registrasi satwa', icon: FilePlus2 },
  { id: 'daftar', label: 'Daftar satwa', icon: PawPrint },
  { id: 'transfer', label: 'Transfer in/out', icon: ArrowLeftRight },
  { id: 'kelahiran', label: 'Kelahiran dan kematian', icon: Baby },
  { id: 'dokumen', label: 'Dokumen legal', icon: FileText },
  { id: 'laporan', label: 'Laporan koleksi', icon: BarChart3 },
];

type RegistrationType = 'awal' | 'transfer' | 'kelahiran';
type RecordUnitType = 'Individu' | 'Kelompok';

export function RegistrationScreen({
  theme,
  viewportMode,
}: RegistrationScreenProps) {
  const [activeNav, setActiveNav] = useState('registrasi');

  // Section 1: Jenis registrasi
  const [regType, setRegType] = useState<RegistrationType>('awal');
  const [recordAs, setRecordAs] = useState<RecordUnitType>('Individu');

  // Section 2: Klasifikasi (Master Data)
  const [selectedSpeciesId, setSelectedSpeciesId] = useState('tiger-sumatra');
  const currentSpecies =
    MASTER_SPECIES.find((s) => s.id === selectedSpeciesId) || MASTER_SPECIES[0];

  // Section 3: Identitas satwa (Contoh data: Harimau Sumatera bernama "Bara", jantan, berat 118,5 kg)
  const [nickname, setNickname] = useState('Bara');
  const [sex, setSex] = useState('Jantan');
  const [birthDate, setBirthDate] = useState('2021-04-14');
  const [estimatedAge, setEstimatedAge] = useState('5 tahun 5 bulan');
  const [weightKg, setWeightKg] = useState('118,5');
  const [sireDamFather, setSireDamFather] = useState('Tidak diketahui');
  const [sireDamMother, setSireDamMother] = useState('Tidak diketahui');

  // Section 4: Identifikasi unik & Dokumen legal
  const [markerType, setMarkerType] = useState('Microchip ISO 11784/11785');
  const [markerId, setMarkerId] = useState('900118000482910');
  const [markerLocation, setMarkerLocation] = useState('Subkutan bahu kiri');
  const [physicalMark, setPhysicalMark] = useState(
    'Pola belang menyatu di pelipis kanan, bekas luka kecil di telinga kiri'
  );

  const [legalDocs, setLegalDocs] = useState([
    {
      id: 'doc-bksda',
      title: 'Berita Acara Penitipan Satwa (BAP BKSDA)',
      fileName: 'BAP-BKSDA-SUMBAR-2026-09.pdf · 1,8 MB',
      uploaded: true,
    },
    {
      id: 'doc-karantina',
      title: 'Sertifikat Kesehatan Karantina Hewan',
      fileName: 'SKKH-Medis-Bara-2026.pdf · 940 KB',
      uploaded: true,
    },
    {
      id: 'doc-satsdn',
      title: 'Surat Angkut Tumbuhan dan Satwa Dalam Negeri (SATS-DN)',
      fileName: 'Menunggu unggahan berkas PDF/JPG',
      uploaded: false,
    },
  ]);

  const [submissionStatus, setSubmissionStatus] = useState<
    'draft' | 'submitted' | 'saved'
  >('draft');
  const [statusFeedbackMessage, setStatusFeedbackMessage] = useState<
    string | null
  >(null);

  const isTablet = viewportMode === 'tablet';
  const allDocsUploaded = legalDocs.every((d) => d.uploaded);

  const checklistItems = [
    {
      id: 'jenis',
      label: 'Jenis registrasi',
      complete: Boolean(regType && recordAs),
      detail: `${
        regType === 'awal'
          ? 'Registrasi awal'
          : regType === 'transfer'
          ? 'Transfer in eksternal'
          : 'Kelahiran'
      } (${recordAs})`,
    },
    {
      id: 'klasifikasi',
      label: 'Klasifikasi',
      complete: Boolean(currentSpecies),
      detail: currentSpecies.scientificName,
    },
    {
      id: 'identitas',
      label: 'Identitas',
      complete: Boolean(nickname.trim() && weightKg.trim()),
      detail: `${nickname || '-'} · ${sex} · ${weightKg || '-'} kg`,
    },
    {
      id: 'identifikasi',
      label: 'Identifikasi unik',
      complete: Boolean(markerId.trim()),
      detail: `Chip #${markerId.slice(-6)}`,
    },
    {
      id: 'dokumen',
      label: 'Dokumen legal',
      complete: allDocsUploaded,
      detail: allDocsUploaded ? '3/3 berkas lengkap' : '2/3 berkas (Menunggu SATS-DN)',
    },
  ];

  const handleToggleDocUpload = (docId: string) => {
    setLegalDocs((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              uploaded: !doc.uploaded,
              fileName: !doc.uploaded
                ? 'SATS-DN-BKSDA-0142-Bara.pdf · 1,4 MB'
                : 'Menunggu unggahan berkas PDF/JPG',
            }
          : doc
      )
    );
  };

  const handleSaveDraft = () => {
    setSubmissionStatus('saved');
    setStatusFeedbackMessage(
      'Draft registrasi REG-BSD-2026-0142 berhasil disimpan pada 09.42 WIB.'
    );
  };

  const handleSubmitToCurator = () => {
    setSubmissionStatus('submitted');
    setStatusFeedbackMessage(
      'Pengajuan registrasi "Bara" telah dikirim ke antrean pemeriksaan Kurator.'
    );
  };

  const renderStatusPanel = () => (
    <aside
      aria-label="Status dan Kelengkapan Registrasi"
      className={`${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} ${theme.radiusClass} p-6 space-y-6`}
    >
      {/* Header Nomor Registrasi & Badge Status */}
      <div className="space-y-3 pb-5 border-b border-black/10">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-sm font-semibold ${theme.mutedColor}`}>
            Nomor Registrasi
          </span>
          <span
            className={`font-mono text-sm font-bold px-2.5 py-1 ${theme.radiusSmClass} bg-black/[0.04] ${theme.headingColor}`}
          >
            REG-BSD-2026-0142
          </span>
        </div>

        <div>
          {submissionStatus === 'submitted' ? (
            <StatusBadge
              theme={theme}
              variant="info"
              label="Diajukan - Menunggu Kurator"
            />
          ) : allDocsUploaded ? (
            <StatusBadge
              theme={theme}
              variant="success"
              label="Draft - Dokumen lengkap"
            />
          ) : (
            <StatusBadge
              theme={theme}
              variant="warning"
              label="Draft - Menunggu dokumen"
            />
          )}
        </div>

        {statusFeedbackMessage && (
          <div
            role="status"
            className={`p-3 ${theme.radiusSmClass} ${theme.infoBg} border ${theme.infoBorder} ${theme.infoColor} text-sm font-medium flex items-start gap-2`}
          >
            <Info className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{statusFeedbackMessage}</span>
          </div>
        )}
      </div>

      {/* Checklist Kelengkapan */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`font-bold ${theme.bodyTextClass} ${theme.headingColor}`}>
            Checklist kelengkapan
          </h3>
          <span className="font-mono text-xs font-semibold">
            {checklistItems.filter((i) => i.complete).length}/5 selesai
          </span>
        </div>

        <ul className="space-y-2.5">
          {checklistItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-start justify-between gap-3 p-3 ${theme.radiusSmClass} ${
                item.complete
                  ? 'bg-black/[0.02] border border-black/10'
                  : `${theme.warningBg} border ${theme.warningBorder}`
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                {item.complete ? (
                  <CheckCircle2
                    className={`h-5 w-5 shrink-0 mt-0.5 ${theme.successColor}`}
                    aria-hidden="true"
                  />
                ) : (
                  <Clock
                    className={`h-5 w-5 shrink-0 mt-0.5 ${theme.warningColor}`}
                    aria-hidden="true"
                  />
                )}
                <div className="min-w-0">
                  <div className={`font-semibold text-sm ${theme.bodyColor}`}>
                    {item.label}
                  </div>
                  <div className={`text-xs truncate ${theme.mutedColor}`}>
                    {item.detail}
                  </div>
                </div>
              </div>

              <span
                className={`text-xs font-semibold shrink-0 px-2 py-0.5 ${theme.radiusSmClass} ${
                  item.complete
                    ? `${theme.successBg} ${theme.successColor}`
                    : `${theme.warningBg} ${theme.warningColor}`
                }`}
              >
                {item.complete ? 'Lengkap' : 'Menunggu'}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tombol Aksi Utama & Sekunder */}
      <div className="space-y-3 pt-2 border-t border-black/10">
        <ZooButton
          theme={theme}
          type="button"
          variant="primary"
          fullWidth
          onClick={handleSubmitToCurator}
        >
          <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Ajukan ke Kurator</span>
        </ZooButton>

        <ZooButton
          theme={theme}
          type="button"
          variant="secondary"
          fullWidth
          onClick={handleSaveDraft}
        >
          <Save className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Simpan draft</span>
        </ZooButton>
      </div>

      {/* Timeline Alur Setelah Diajukan */}
      <div className="pt-4 border-t border-black/10 space-y-3.5">
        <h3 className={`font-bold text-sm uppercase tracking-wider ${theme.mutedColor}`}>
          Alur setelah diajukan
        </h3>

        <ol className="space-y-3.5">
          {[
            {
              step: '1',
              title: 'Registrar mengisi data',
              desc: 'Pencatatan taksonomi, identitas fisik, dan berkas legalitas.',
              state: submissionStatus === 'submitted' ? 'done' : 'active',
            },
            {
              step: '2',
              title: 'Kurator memeriksa',
              desc: 'Verifikasi kesesuaian koleksi dan persetujuan penempatan.',
              state: submissionStatus === 'submitted' ? 'active' : 'pending',
            },
            {
              step: '3',
              title: 'Satwa aktif dan ditempatkan di kandang',
              desc: 'Kode satwa aktif untuk penjadwalan Keeper & Ahli Nutrisi.',
              state: 'pending',
            },
            {
              step: '4',
              title: 'Riwayat tersimpan permanen',
              desc: 'Arsip induk koleksi BSD Zoo tercatat secara permanen.',
              state: 'pending',
            },
          ].map((flow) => (
            <li key={flow.step} className="flex items-start gap-3">
              <span
                className={`h-7 w-7 ${theme.radiusSmClass} font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                  flow.state === 'done'
                    ? `${theme.primaryBtnBg} text-white`
                    : flow.state === 'active'
                    ? `${theme.accentBg} ${theme.accentText}`
                    : 'bg-black/[0.06] text-[#526050]'
                }`}
              >
                {flow.step}
              </span>
              <div>
                <div className={`text-sm font-semibold ${theme.bodyColor}`}>
                  {flow.title}
                </div>
                <p className={`text-xs leading-relaxed ${theme.mutedColor}`}>
                  {flow.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );

  return (
    <div
      className={`w-full ${
        isTablet ? 'min-h-[1130px]' : 'min-h-[calc(100vh-56px)]'
      } ${theme.pageBg} ${theme.fontClass} flex`}
    >
      {/* ===================================================================
          SIDEBAR KIRI (Menu Role Registrar — Bukan Bottom Nav!)
         =================================================================== */}
      <aside
        aria-label="Navigasi Utama Registrar"
        className={`${
          isTablet ? 'w-[220px]' : 'w-[264px]'
        } shrink-0 ${theme.sidebarBg} ${theme.sidebarText} border-r ${
          theme.sidebarBorder
        } flex flex-col justify-between select-none`}
      >
        <div className="p-5 space-y-6">
          <BsdZooLogo theme={theme} surface="sidebar" size="md" />

          {/* Profil Singkat Role Registrar */}
          <div
            className={`p-3 ${theme.radiusSmClass} ${
              theme.id === 'modern'
                ? 'bg-[#F7F8F5] border border-[#E4E8E0]'
                : 'bg-black/20 border border-white/10'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono opacity-80">
              <UserCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>PERAN AKTIF</span>
            </div>
            <div className="font-bold text-sm mt-0.5">Nadia Pramesti</div>
            <div className={`text-xs ${theme.sidebarMuted}`}>
              Registrar Koleksi Satwa
            </div>
          </div>

          {/* Daftar Menu Sidebar */}
          <nav aria-label="Menu Koleksi Satwa" className="space-y-1.5">
            {REGISTRAR_MENU.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
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
                  <span className="text-[15px] leading-snug">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className={`p-5 border-t ${theme.sidebarBorder} text-xs ${theme.sidebarMuted}`}>
          <div className="font-mono">Divisi Konservasi BSD Zoo</div>
          <div className="mt-0.5">Buku Induk Koleksi 2026</div>
        </div>
      </aside>

      {/* ===================================================================
          AREA KONTEN UTAMA (Form di tengah + Panel Status di kanan / atas-bawah)
         =================================================================== */}
      <div className="flex-1 min-w-0 p-6 xl:p-8 overflow-y-auto">
        {/* Header Halaman */}
        <header className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-black/10">
          <div>
            <div className={`text-xs font-mono uppercase tracking-wider ${theme.mutedColor}`}>
              Manajemen Koleksi Satwa · Modul Registrar
            </div>
            <h1
              className={`text-2xl sm:text-[28px] font-bold tracking-tight mt-1 ${theme.headingColor}`}
            >
              Registrasi satwa baru
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`font-mono text-sm font-semibold ${theme.mutedColor}`}>
              No: REG-BSD-2026-0142
            </span>
            {allDocsUploaded ? (
              <StatusBadge
                theme={theme}
                variant="success"
                label="Draft - Dokumen lengkap"
              />
            ) : (
              <StatusBadge
                theme={theme}
                variant="warning"
                label="Draft - Menunggu dokumen"
              />
            )}
          </div>
        </header>

        {/* Jika menu sidebar selain 'Registrasi satwa' diklik, tampilkan bar pemberitahuan kontekstual dengan tombol kembali cepat */}
        {activeNav !== 'registrasi' && (
          <div
            className={`mb-6 p-4 ${theme.radiusClass} ${theme.infoBg} border ${theme.infoBorder} flex flex-wrap items-center justify-between gap-3`}
          >
            <div className="flex items-center gap-2.5">
              <FolderKanban className={`h-5 w-5 ${theme.infoColor}`} />
              <span className={`font-medium ${theme.bodyTextClass} ${theme.infoColor}`}>
                Menampilkan pratinjau menu{' '}
                <strong>
                  {REGISTRAR_MENU.find((m) => m.id === activeNav)?.label}
                </strong>
                . Formulir aktif di bawah tetap terjaga sebagai draft.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveNav('registrasi')}
              className={`${theme.focusClass} px-3 py-1.5 ${theme.radiusSmClass} bg-white font-semibold text-sm ${theme.headingColor} border border-black/15 cursor-pointer`}
            >
              Kembali ke Registrasi satwa
            </button>
          </div>
        )}

        {/* Di Tablet Portrait: Tampilkan ringkasan bar status di atas form agar mudah dipantau */}
        {isTablet && (
          <div
            className={`mb-6 p-4 ${theme.cardBg} ${theme.cardBorder} ${theme.radiusClass} flex flex-wrap items-center justify-between gap-3`}
          >
            <div className="space-y-0.5">
              <div className={`text-sm font-bold ${theme.headingColor}`}>
                Status Berkas: REG-BSD-2026-0142 ({nickname || 'Bara'})
              </div>
              <div className={`text-xs ${theme.mutedColor}`}>
                Kelengkapan saat ini:{' '}
                <strong className="font-mono">
                  {checklistItems.filter((i) => i.complete).length} dari 5 bagian
                </strong>{' '}
                (Panel pengajuan berada di bagian bawah formulir)
              </div>
            </div>
            <ZooButton
              theme={theme}
              type="button"
              variant="secondary"
              onClick={handleSaveDraft}
            >
              <Save className="h-4 w-4" />
              <span>Simpan draft</span>
            </ZooButton>
          </div>
        )}

        {/* Grid Utama: Desktop 12 Kolom (8 Form + 4 Status Kanan), Tablet Portrait 1 Kolom penuh */}
        <div
          className={`grid gap-6 ${
            isTablet ? 'grid-cols-1' : 'grid-cols-12 items-start'
          }`}
        >
          {/* ===============================================================
              KOLOM TENGAH: FORMULIR BERNOMOR 1 - 4
             =============================================================== */}
          <div className={`${isTablet ? '' : 'col-span-8'} space-y-6`}>
            {/* SECTION 1: JENIS REGISTRASI */}
            <section
              aria-labelledby="sec-1-heading"
              className={`${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} ${theme.radiusClass} p-6 space-y-5`}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-black/10">
                <span
                  className={`h-8 w-8 ${theme.radiusSmClass} ${theme.primaryBtnBg} text-white font-mono font-bold text-sm flex items-center justify-center shrink-0`}
                >
                  1
                </span>
                <div>
                  <h2
                    id="sec-1-heading"
                    className={`text-lg font-bold ${theme.headingColor}`}
                  >
                    Jenis registrasi
                  </h2>
                  <p className={`text-sm ${theme.mutedColor}`}>
                    Pilih asal perolehan satwa dan metode pencatatan buku induk
                  </p>
                </div>
              </div>

              {/* Pilihan Kartu: Registrasi awal, Transfer in eksternal, Kelahiran */}
              <div>
                <span className={`block mb-2 ${theme.labelTextClass} ${theme.headingColor}`}>
                  Kategori perolehan satwa
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      id: 'awal' as RegistrationType,
                      title: 'Registrasi awal',
                      desc: 'Pendataan perdana ke buku induk koleksi',
                    },
                    {
                      id: 'transfer' as RegistrationType,
                      title: 'Transfer in eksternal',
                      desc: 'Mutasi masuk dari lembaga konservasi lain',
                    },
                    {
                      id: 'kelahiran' as RegistrationType,
                      title: 'Kelahiran',
                      desc: 'Kelahiran atau penetasan di fasilitas BSD Zoo',
                    },
                  ].map((option) => {
                    const selected = regType === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setRegType(option.id)}
                        aria-pressed={selected}
                        className={`${theme.focusClass} text-left p-4 ${
                          theme.radiusClass
                        } transition-all cursor-pointer flex flex-col justify-between min-h-[104px] ${
                          selected
                            ? `border-2 ${
                                theme.id === 'earthy'
                                  ? 'border-[#6E3511] bg-[#FCECD8]/60'
                                  : 'border-[#2D4F2B] bg-[#ECF4EB]/70'
                              }`
                            : `border ${theme.inputBorder} bg-white hover:bg-black/[0.02]`
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 w-full">
                          <span className={`font-bold ${theme.bodyTextClass} ${theme.headingColor}`}>
                            {option.title}
                          </span>
                          {selected && (
                            <CheckCircle2
                              className={`h-5 w-5 shrink-0 ${theme.headingColor}`}
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <p className={`text-xs mt-2 ${theme.mutedColor}`}>
                          {option.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pilihan "Dicatat sebagai": Individu atau Kelompok */}
              <div>
                <span className={`block mb-2 ${theme.labelTextClass} ${theme.headingColor}`}>
                  Dicatat sebagai
                </span>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  {(['Individu', 'Kelompok'] as RecordUnitType[]).map((unit) => {
                    const active = recordAs === unit;
                    return (
                      <button
                        key={unit}
                        type="button"
                        onClick={() => setRecordAs(unit)}
                        aria-pressed={active}
                        className={`${theme.focusClass} ${theme.controlHeightClass} px-4 ${
                          theme.radiusClass
                        } font-semibold ${
                          theme.bodyTextClass
                        } flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                          active
                            ? `${theme.primaryBtnBg} text-white`
                            : `bg-white ${theme.inputBorder} ${theme.bodyColor} hover:bg-black/[0.03]`
                        }`}
                      >
                        {active && (
                          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        )}
                        <span>{unit}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SECTION 2: KLASIFIKASI (DIPILIH DARI DATA MASTER) */}
            <section
              aria-labelledby="sec-2-heading"
              className={`${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} ${theme.radiusClass} p-6 space-y-5`}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-black/10">
                <span
                  className={`h-8 w-8 ${theme.radiusSmClass} ${theme.primaryBtnBg} text-white font-mono font-bold text-sm flex items-center justify-center shrink-0`}
                >
                  2
                </span>
                <div>
                  <h2
                    id="sec-2-heading"
                    className={`text-lg font-bold ${theme.headingColor}`}
                  >
                    Klasifikasi (dipilih dari data master)
                  </h2>
                  <p className={`text-sm ${theme.mutedColor}`}>
                    Taksonomi ilmiah otomatis menyesuaikan daftar master spesies
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ZooSelect
                  theme={theme}
                  id="tax-kelompok"
                  label="Kelompok"
                  value={currentSpecies.kelompok}
                  onChange={() => {}}
                  options={[
                    { value: 'Vertebrata', label: 'Vertebrata (Bertulang belakang)' },
                    { value: 'Invertebrata', label: 'Invertebrata' },
                  ]}
                />
                <ZooSelect
                  theme={theme}
                  id="tax-class"
                  label="Class"
                  value={currentSpecies.className}
                  onChange={() => {}}
                  options={[
                    { value: 'Mammalia', label: 'Mammalia (Mamalia)' },
                    { value: 'Aves', label: 'Aves (Burung)' },
                    { value: 'Reptilia', label: 'Reptilia (Reptil)' },
                  ]}
                />
                <ZooSelect
                  theme={theme}
                  id="tax-ordo"
                  label="Ordo"
                  value={currentSpecies.ordo}
                  onChange={() => {}}
                  options={[
                    { value: 'Carnivora', label: 'Carnivora' },
                    { value: 'Primates', label: 'Primates' },
                    { value: 'Perissodactyla', label: 'Perissodactyla' },
                  ]}
                />
                <ZooSelect
                  theme={theme}
                  id="tax-famili"
                  label="Famili"
                  value={currentSpecies.famili}
                  onChange={() => {}}
                  options={[
                    { value: 'Felidae', label: 'Felidae (Kucing besar)' },
                    { value: 'Ursidae', label: 'Ursidae (Beruang)' },
                    { value: 'Hominidae', label: 'Hominidae (Kera besar)' },
                    { value: 'Tapiridae', label: 'Tapiridae (Tapir)' },
                  ]}
                />
              </div>

              {/* Dropdown Spesies Master */}
              <ZooSelect
                theme={theme}
                id="tax-spesies"
                label="Spesies"
                value={selectedSpeciesId}
                onChange={(e) => setSelectedSpeciesId(e.target.value)}
                options={MASTER_SPECIES.map((sp) => ({
                  value: sp.id,
                  label: `${sp.scientificName} — ${sp.commonName}`,
                }))}
              />

              {/* Status IUCN di bawah Spesies + Breadcrumb Taksonomi */}
              <div
                className={`p-4 ${theme.radiusClass} bg-black/[0.025] border border-black/10 space-y-3`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-sm font-semibold ${theme.headingColor}`}>
                    Status Konservasi IUCN Red List:
                  </span>
                  <StatusBadge
                    theme={theme}
                    variant={
                      currentSpecies.iucnCode === 'CR'
                        ? 'iucn-cr'
                        : currentSpecies.iucnCode === 'EN'
                        ? 'iucn-en'
                        : 'iucn-vu'
                    }
                    label={currentSpecies.iucnLabel}
                  />
                </div>

                <p className={`text-xs ${theme.mutedColor}`}>
                  {currentSpecies.iucnNote}
                </p>

                {/* Breadcrumb Taksonomi */}
                <div className="pt-2 border-t border-black/10">
                  <div className={`text-xs font-semibold mb-1 ${theme.mutedColor}`}>
                    Hierarki Taksonomi:
                  </div>
                  <div
                    aria-label="Breadcrumb taksonomi"
                    className={`flex flex-wrap items-center gap-1.5 font-mono text-sm font-medium ${theme.headingColor}`}
                  >
                    <span>{currentSpecies.kelompok}</span>
                    <ChevronRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                    <span>{currentSpecies.className}</span>
                    <ChevronRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                    <span>{currentSpecies.ordo}</span>
                    <ChevronRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                    <span>{currentSpecies.famili}</span>
                    <ChevronRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                    <span className="italic font-bold underline decoration-current/40 underline-offset-4">
                      {currentSpecies.scientificName}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: IDENTITAS SATWA */}
            <section
              aria-labelledby="sec-3-heading"
              className={`${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} ${theme.radiusClass} p-6 space-y-5`}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-black/10">
                <span
                  className={`h-8 w-8 ${theme.radiusSmClass} ${theme.primaryBtnBg} text-white font-mono font-bold text-sm flex items-center justify-center shrink-0`}
                >
                  3
                </span>
                <div>
                  <h2
                    id="sec-3-heading"
                    className={`text-lg font-bold ${theme.headingColor}`}
                  >
                    Identitas satwa
                  </h2>
                  <p className={`text-sm ${theme.mutedColor}`}>
                    Data individu, ukuran bobot saat kedatangan, dan silsilah induk
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ZooInput
                  theme={theme}
                  id="animal-nickname"
                  label="Nama panggilan"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Contoh: Bara"
                />

                <ZooSelect
                  theme={theme}
                  id="animal-sex"
                  label="Jenis kelamin"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  options={[
                    { value: 'Jantan', label: 'Jantan (Male)' },
                    { value: 'Betina', label: 'Betina (Female)' },
                    { value: 'Belum diketahui', label: 'Belum diketahui (Indeterminate)' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ZooInput
                  theme={theme}
                  id="animal-dob"
                  label="Tanggal lahir"
                  optionalText="(Opsional)"
                  type="date"
                  mono
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  helperText="Isi perkiraan umur jika tidak diketahui"
                />

                <ZooInput
                  theme={theme}
                  id="animal-est-age"
                  label="Perkiraan umur"
                  optionalText="(Jika tanggal lahir tidak pasti)"
                  value={estimatedAge}
                  onChange={(e) => setEstimatedAge(e.target.value)}
                  placeholder="Contoh: 5 tahun 5 bulan"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ZooInput
                  theme={theme}
                  id="animal-weight"
                  label="Berat saat registrasi (kg)"
                  mono
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="Contoh: 118,5"
                  rightElement={
                    <span className="px-3 font-mono text-sm font-bold text-[#526050]">
                      kg
                    </span>
                  }
                />

                <div className="flex flex-col justify-end pb-1">
                  <div
                    className={`p-3 ${theme.radiusSmClass} bg-black/[0.025] border border-black/10 text-xs ${theme.mutedColor}`}
                  >
                    Bobot ditimbang menggunakan timbangan lantai kandang karantina
                    Zona Sumatera pada saat serah terima.
                  </div>
                </div>
              </div>

              {/* Silsilah (Induk jantan dan Induk betina, default "Tidak diketahui") */}
              <div className="pt-2 border-t border-black/10">
                <h3 className={`font-bold ${theme.bodyTextClass} ${theme.headingColor} mb-3`}>
                  Silsilah (Induk)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <ZooSelect
                    theme={theme}
                    id="sire-father"
                    label="Induk jantan"
                    value={sireDamFather}
                    onChange={(e) => setSireDamFather(e.target.value)}
                    options={[
                      { value: 'Tidak diketahui', label: 'Tidak diketahui (Liar / Eksternal)' },
                      { value: 'Raja (REG-2018-004)', label: 'Raja (REG-2018-004)' },
                      { value: 'Sultan (REG-2016-019)', label: 'Sultan (REG-2016-019)' },
                    ]}
                  />
                  <ZooSelect
                    theme={theme}
                    id="dam-mother"
                    label="Induk betina"
                    value={sireDamMother}
                    onChange={(e) => setSireDamMother(e.target.value)}
                    options={[
                      { value: 'Tidak diketahui', label: 'Tidak diketahui (Liar / Eksternal)' },
                      { value: 'Sari (REG-2019-011)', label: 'Sari (REG-2019-011)' },
                      { value: 'Kirana (REG-2017-008)', label: 'Kirana (REG-2017-008)' },
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* SECTION 4: IDENTIFIKASI UNIK DAN DOKUMEN LEGAL (UPLOAD) */}
            <section
              aria-labelledby="sec-4-heading"
              className={`${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} ${theme.radiusClass} p-6 space-y-5`}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-black/10">
                <span
                  className={`h-8 w-8 ${theme.radiusSmClass} ${theme.primaryBtnBg} text-white font-mono font-bold text-sm flex items-center justify-center shrink-0`}
                >
                  4
                </span>
                <div>
                  <h2
                    id="sec-4-heading"
                    className={`text-lg font-bold ${theme.headingColor}`}
                  >
                    Identifikasi unik dan Dokumen legal
                  </h2>
                  <p className={`text-sm ${theme.mutedColor}`}>
                    Penanda permanen satwa (microchip/tag) dan unggahan dokumen resmi BKSDA
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <ZooSelect
                  theme={theme}
                  id="marker-type"
                  label="Jenis penanda unik"
                  value={markerType}
                  onChange={(e) => setMarkerType(e.target.value)}
                  options={[
                    {
                      value: 'Microchip ISO 11784/11785',
                      label: 'Microchip ISO 11784/11785',
                    },
                    { value: 'Cincin Kaki (Leg Band)', label: 'Cincin Kaki (Leg Band)' },
                    { value: 'Ear Tag Bernomor', label: 'Ear Tag Bernomor' },
                  ]}
                />

                <ZooInput
                  theme={theme}
                  id="marker-id"
                  label="Nomor Microchip / Tag"
                  mono
                  value={markerId}
                  onChange={(e) => setMarkerId(e.target.value)}
                />

                <ZooInput
                  theme={theme}
                  id="marker-location"
                  label="Lokasi penanda di tubuh"
                  value={markerLocation}
                  onChange={(e) => setMarkerLocation(e.target.value)}
                />
              </div>

              <ZooInput
                theme={theme}
                id="physical-mark"
                label="Ciri fisik pembeda (pola belang / tanda alami)"
                value={physicalMark}
                onChange={(e) => setPhysicalMark(e.target.value)}
              />

              {/* Area Unggah Dokumen Legal */}
              <div className="pt-3 border-t border-black/10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`block ${theme.labelTextClass} ${theme.headingColor}`}>
                    Dokumen legal (unggah berkas PDF atau foto terverifikasi)
                  </span>
                  <span className={`text-xs font-mono ${theme.mutedColor}`}>
                    Maks. 10 MB per berkas
                  </span>
                </div>

                <div className="space-y-3">
                  {legalDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className={`p-4 ${theme.radiusClass} border ${
                        doc.uploaded
                          ? 'bg-black/[0.02] border-black/15'
                          : `${theme.warningBg} ${theme.warningBorder}`
                      } flex flex-wrap items-center justify-between gap-3`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <FileCheck2
                          className={`h-5 w-5 shrink-0 mt-0.5 ${
                            doc.uploaded ? theme.successColor : theme.warningColor
                          }`}
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <div className={`font-semibold ${theme.bodyTextClass} ${theme.bodyColor}`}>
                            {doc.title}
                          </div>
                          <div className={`text-xs font-mono mt-0.5 ${theme.mutedColor}`}>
                            {doc.fileName}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <StatusBadge
                          theme={theme}
                          size="sm"
                          variant={doc.uploaded ? 'success' : 'warning'}
                          label={doc.uploaded ? 'Terunggah' : 'Belum diunggah'}
                        />
                        <button
                          type="button"
                          onClick={() => handleToggleDocUpload(doc.id)}
                          className={`${theme.focusClass} inline-flex items-center gap-1.5 min-h-[44px] px-3.5 ${theme.radiusSmClass} text-sm font-semibold cursor-pointer transition-colors ${
                            doc.uploaded
                              ? 'bg-white border border-black/20 text-[#1F2A1E] hover:bg-black/5'
                              : `${theme.primaryBtnBg} text-white`
                          }`}
                        >
                          <Upload className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>{doc.uploaded ? 'Ganti berkas' : 'Unggah berkas'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ===============================================================
              PANEL STATUS KANAN (Di Desktop berada di kanan col-span-4,
              di Tablet Portrait berada di bawah form)
             =============================================================== */}
          <div className={isTablet ? 'w-full' : 'col-span-4 sticky top-6'}>
            {renderStatusPanel()}
          </div>
        </div>
      </div>
    </div>
  );
}
