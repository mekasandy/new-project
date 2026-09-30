import React, { useState } from 'react';
import {
  AlertCircle,
  CalendarClock,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  HelpCircle,
  KeyRound,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  BsdZooLogo,
  StatusBadge,
  ZooButton,
  ZooInput,
} from '../components/ui/ZooComponents';
import { ScreenId, ThemeTokens, ViewportMode } from '../theme/themeConfig';

interface LoginScreenProps {
  theme: ThemeTokens;
  viewportMode: ViewportMode;
  onNavigateScreen: (screen: ScreenId) => void;
}

const TODAY_AGENDA = [
  {
    time: '06.30',
    activity: 'Pemeriksaan air minum, suhu kandang, dan pakan pagi Zona Sumatera',
    role: 'Keeper Lapangan',
  },
  {
    time: '09.30',
    activity: 'Verifikasi berkas SATS-DN & pengajuan registrasi Harimau "Bara"',
    role: 'Registrar & Kurator',
  },
  {
    time: '13.30',
    activity: 'Evaluasi nutrisi harian Beruang Madu & jadwal timbang bulanan',
    role: 'Ahli Nutrisi & Medis',
  },
];

export function LoginScreen({
  theme,
  viewportMode,
  onNavigateScreen,
}: LoginScreenProps) {
  const [nipOrEmail, setNipOrEmail] = useState('19910412-BSD-REG');
  const [password, setPassword] = useState('bsd-zoo-2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberShift, setRememberShift] = useState(true);
  // Tampilkan contoh state error inline secara default agar sesuai prompt, namun mudah di-toggle / di-submit
  const [showInlineError, setShowInlineError] = useState(true);
  const [activeDialog, setActiveDialog] = useState<'forgot' | 'admin' | null>(
    null
  );
  const [resetNipInput, setResetNipInput] = useState('19910412-BSD-REG');
  const [resetSubmitted, setResetSubmitted] = useState(false);

  const isTablet = viewportMode === 'tablet';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nipOrEmail.trim() || !password.trim() || password === 'salah') {
      setShowInlineError(true);
      return;
    }
    setShowInlineError(false);
    // Arahkan sesuai NIP atau default ke Registrasi Satwa
    if (
      nipOrEmail.toLowerCase().includes('kpr') ||
      nipOrEmail.toLowerCase().includes('rudi')
    ) {
      onNavigateScreen('keeper');
    } else {
      onNavigateScreen('registration');
    }
  };

  // Warna panel kiri mengikuti karakter tema
  const leftPanelClasses =
    theme.id === 'modern'
      ? 'bg-white border-r border-[#E4E8E0] text-[#1F2A1E]'
      : theme.id === 'earthy'
      ? 'bg-[#6E3511] border-r border-[#8C4B22] text-[#FCECD8]'
      : 'bg-[#2D4F2B] border-r border-[#708A58]/40 text-[#FFF1CA]';

  const leftCardClasses =
    theme.id === 'modern'
      ? 'bg-[#F7F8F5] border border-[#E4E8E0] text-[#1F2A1E]'
      : theme.id === 'earthy'
      ? 'bg-[#582A0D] border border-[#91AC67]/45 text-[#FCECD8]'
      : 'bg-[#233E21] border border-[#708A58]/50 text-[#FFF1CA]';

  const leftSubText =
    theme.id === 'modern'
      ? 'text-[#526050]'
      : theme.id === 'earthy'
      ? 'text-[#FCECD8]/85'
      : 'text-[#FFF1CA]/85';

  const timeBadgeClasses =
    theme.id === 'modern'
      ? 'bg-[#E6EFE5] text-[#2D4F2B] border border-[#708A58]/30'
      : theme.id === 'earthy'
      ? 'bg-[#91AC67] text-[#2B1405]'
      : 'bg-[#FFB823] text-[#2D4F2B]';

  return (
    <div
      className={`w-full ${
        isTablet ? 'min-h-[1130px]' : 'min-h-[calc(100vh-56px)]'
      } ${theme.pageBg} ${theme.fontClass} grid grid-cols-12`}
    >
      {/* ===================================================================
          KOLOM KIRI (Identitas BSD Zoo, Tagline Fungsional, Kartu Agenda Hari Ini)
         =================================================================== */}
      <aside
        aria-label="Identitas Sistem dan Agenda Operasional"
        className={`col-span-5 flex flex-col justify-between ${
          isTablet ? 'p-6' : 'p-10 xl:p-14'
        } ${leftPanelClasses}`}
      >
        {/* Bagian Atas: Logo BSD Zoo, Nama Sistem, & Satu Kalimat Tagline Fungsional */}
        <div className="space-y-6">
          <BsdZooLogo
            theme={theme}
            surface={theme.id === 'modern' ? 'light' : 'brand-panel'}
            size="lg"
          />

          <div className="space-y-3 pt-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider opacity-85">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Sistem Internal Staf Konservasi</span>
            </div>
            <h1
              className={`font-bold tracking-tight ${
                isTablet ? 'text-2xl leading-snug' : 'text-3xl xl:text-[34px] leading-tight'
              }`}
            >
              Zoo Management System BSD
            </h1>
            <p className={`${theme.bodyTextClass} ${leftSubText} max-w-md`}>
              Sistem operasional terpadu untuk pencatatan registrasi satwa,
              pemantauan pakan harian, dan koordinasi perawatan antar-divisi di
              BSD Zoo.
            </p>
          </div>
        </div>

        {/* Bagian Tengah: Kartu Kecil "Agenda hari ini (contoh)" berisi 3 baris jam dan aktivitas */}
        <div
          className={`${theme.radiusClass} ${leftCardClasses} ${
            isTablet ? 'p-4 my-6' : 'p-6 my-8'
          }`}
        >
          <div className="flex items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-current/15">
            <div className="flex items-center gap-2 font-semibold text-[16px]">
              <CalendarClock className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Agenda hari ini (contoh)</span>
            </div>
            <span className="font-mono text-xs opacity-80">Selasa, 29 Sep</span>
          </div>

          <div className="space-y-3.5">
            {TODAY_AGENDA.map((item) => (
              <div
                key={item.time}
                className="flex items-start gap-3 text-left"
              >
                <span
                  className={`font-mono text-sm font-bold px-2.5 py-1 ${theme.radiusSmClass} shrink-0 tabular-nums ${timeBadgeClasses}`}
                >
                  {item.time}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`font-medium leading-snug ${
                      isTablet ? 'text-[15px]' : 'text-[16px]'
                    }`}
                  >
                    {item.activity}
                  </p>
                  <p className="text-xs opacity-75 mt-0.5 font-mono">
                    Divisi: {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bagian Bawah: Informasi Peran Staf */}
        <div className={`text-sm ${leftSubText} pt-4 border-t border-current/15`}>
          <span>Akses peran: Registrar · Kurator · Keeper · Ahli Nutrisi · Dokter Hewan</span>
        </div>
      </aside>

      {/* ===================================================================
          KOLOM KANAN (Kartu Login Utama)
         =================================================================== */}
      <main
        className={`col-span-7 flex flex-col justify-center items-center ${
          isTablet ? 'p-6' : 'p-10 xl:p-16'
        }`}
      >
        <div className="w-full max-w-[480px]">
          {/* Bar Simulasi Cepat untuk Menguji State Error Inline atau Pengisian Peran */}
          <div
            className={`mb-4 px-3.5 py-2.5 ${theme.radiusClass} bg-white/85 ${theme.cardBorder} flex flex-wrap items-center justify-between gap-2 text-xs`}
          >
            <span className={`font-semibold ${theme.headingColor}`}>
              Pratinjau State Form:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowInlineError((prev) => !prev)}
                className={`${theme.focusClass} px-2.5 py-1 ${theme.radiusSmClass} font-semibold cursor-pointer transition-colors ${
                  showInlineError
                    ? 'bg-[#B3261E] text-white'
                    : 'bg-[#F1F3EF] text-[#1F2A1E] hover:bg-[#E4E8E0]'
                }`}
              >
                {showInlineError ? 'Error Inline: Aktif' : 'Tampilkan Error Inline'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setNipOrEmail('19910412-BSD-REG');
                  setPassword('bsd-zoo-2026');
                  setShowInlineError(false);
                }}
                className={`${theme.focusClass} px-2.5 py-1 ${theme.radiusSmClass} bg-[#F1F3EF] text-[#1F2A1E] hover:bg-[#E4E8E0] font-mono cursor-pointer`}
              >
                Isi Akun Registrar
              </button>
              <button
                type="button"
                onClick={() => {
                  setNipOrEmail('19940819-BSD-KPR');
                  setPassword('bsd-zoo-2026');
                  setShowInlineError(false);
                }}
                className={`${theme.focusClass} px-2.5 py-1 ${theme.radiusSmClass} bg-[#F1F3EF] text-[#1F2A1E] hover:bg-[#E4E8E0] font-mono cursor-pointer`}
              >
                Isi Akun Keeper
              </button>
            </div>
          </div>

          {/* KARTU LOGIN PUTIH */}
          <div
            className={`${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} ${theme.radiusClass} ${
              isTablet ? 'p-7' : 'p-8 sm:p-10'
            }`}
          >
            {/* Judul dan Subjudul */}
            <div className="mb-6">
              <h2
                className={`text-2xl sm:text-[28px] font-bold tracking-tight ${theme.headingColor}`}
              >
                Selamat datang
              </h2>
              <p className={`mt-1.5 ${theme.bodyTextClass} ${theme.mutedColor}`}>
                Masuk dengan akun kerja yang diberikan admin
              </p>
            </div>

            {/* Contoh state error inline dengan ikon: "NIP atau kata sandi salah" */}
            {showInlineError && (
              <div
                role="alert"
                aria-live="polite"
                className={`mb-6 flex items-center gap-3 ${theme.radiusClass} border-2 ${theme.errorBorder} ${theme.errorBg} px-4 py-3.5 ${theme.errorColor}`}
              >
                <AlertCircle
                  className="h-5 w-5 shrink-0 text-[#B3261E]"
                  aria-hidden="true"
                />
                <span className={`${theme.bodyTextClass} font-semibold`}>
                  NIP atau kata sandi salah
                </span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
              {/* Field 1: NIP atau email kerja */}
              <ZooInput
                theme={theme}
                id="login-nip-email"
                label="NIP atau email kerja"
                type="text"
                autoComplete="username"
                mono
                value={nipOrEmail}
                onChange={(e) => {
                  setNipOrEmail(e.target.value);
                  if (showInlineError) setShowInlineError(false);
                }}
                placeholder="Contoh: 19910412-BSD-REG atau rudi@bsdzoo.id"
                error={showInlineError}
              />

              {/* Field 2: Kata sandi dengan tombol "Lihat" dan link "Lupa kata sandi?" */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <label
                    htmlFor="login-password"
                    className={`block ${theme.labelTextClass} ${theme.headingColor}`}
                  >
                    Kata sandi
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setResetSubmitted(false);
                      setActiveDialog('forgot');
                    }}
                    className={`${theme.focusClass} text-sm font-semibold ${theme.headingColor} underline underline-offset-4 cursor-pointer py-1`}
                  >
                    Lupa kata sandi?
                  </button>
                </div>

                <div className="relative flex items-center">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (showInlineError) setShowInlineError(false);
                    }}
                    placeholder="Masukkan kata sandi akun kerja"
                    className={`w-full ${theme.controlHeightClass} ${theme.radiusClass} bg-white pl-4 pr-28 ${theme.bodyTextClass} ${theme.bodyColor} ${
                      showInlineError
                        ? 'border-2 border-[#B3261E] bg-[#FDF2F2]/40'
                        : theme.inputBorder
                    } ${theme.inputFocusClass} transition-shadow`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'
                    }
                    className={`${theme.focusClass} absolute right-1.5 inline-flex items-center gap-1.5 min-h-[40px] px-3 ${theme.radiusSmClass} text-sm font-semibold ${theme.headingColor} hover:bg-black/[0.05] cursor-pointer transition-colors`}
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Tutup</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Lihat</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Checkbox: "Ingat saya di perangkat ini selama shift" (Touch target min 48px) */}
              <div className="pt-1">
                <label
                  htmlFor="remember-shift"
                  className="inline-flex min-h-[48px] items-center gap-3 cursor-pointer select-none py-1"
                >
                  <span className="relative flex items-center justify-center">
                    <input
                      id="remember-shift"
                      type="checkbox"
                      checked={rememberShift}
                      onChange={(e) => setRememberShift(e.target.checked)}
                      className="peer sr-only"
                    />
                    <span
                      className={`h-6 w-6 ${theme.radiusSmClass} flex items-center justify-center border-2 transition-colors ${
                        rememberShift
                          ? `${theme.primaryBtnBg} border-transparent text-white`
                          : `bg-white ${theme.inputBorder} text-transparent`
                      }`}
                    >
                      <Check className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                    </span>
                  </span>
                  <span className={`${theme.bodyTextClass} ${theme.bodyColor} font-medium`}>
                    Ingat saya di perangkat ini selama shift
                  </span>
                </label>
              </div>

              {/* Tombol "Masuk" full-width */}
              <div className="pt-1">
                <ZooButton theme={theme} type="submit" variant="primary" fullWidth>
                  Masuk
                </ZooButton>
              </div>
            </form>

            {/* Teks kecil di bawah: "Butuh akses baru? Hubungi admin sistem" */}
            <div className="mt-6 pt-5 border-t border-black/10 text-center">
              <p className={`text-sm ${theme.mutedColor}`}>
                Butuh akses baru?{' '}
                <button
                  type="button"
                  onClick={() => setActiveDialog('admin')}
                  className={`${theme.focusClass} inline-flex min-h-[44px] items-center px-1 font-semibold ${theme.headingColor} underline underline-offset-4 cursor-pointer`}
                >
                  Hubungi admin sistem
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Dialog Lupa Kata Sandi / Hubungi Admin Sistem */}
      {activeDialog && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div
            className={`w-full max-w-md ${theme.cardBg} ${theme.cardBorder} ${theme.radiusClass} p-6 shadow-xl`}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                {activeDialog === 'forgot' ? (
                  <KeyRound className={`h-5 w-5 ${theme.headingColor}`} />
                ) : (
                  <HelpCircle className={`h-5 w-5 ${theme.headingColor}`} />
                )}
                <h3 className={`text-lg font-bold ${theme.headingColor}`}>
                  {activeDialog === 'forgot'
                    ? 'Permintaan Reset Kata Sandi'
                    : 'Hubungi Admin Sistem BSD Zoo'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDialog(null)}
                aria-label="Tutup dialog"
                className={`${theme.focusClass} h-10 w-10 inline-flex items-center justify-center ${theme.radiusSmClass} hover:bg-black/5 cursor-pointer`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {activeDialog === 'forgot' ? (
              <div className="space-y-4">
                <p className={`${theme.bodyTextClass} ${theme.bodyColor}`}>
                  Masukkan NIP atau email kerja Anda. Admin IT Operasional akan
                  mengirimkan kode otorisasi sementara untuk shift aktif.
                </p>
                <ZooInput
                  theme={theme}
                  id="reset-nip-input"
                  label="NIP atau email kerja"
                  value={resetNipInput}
                  mono
                  onChange={(e) => setResetNipInput(e.target.value)}
                />
                {resetSubmitted && (
                  <div className="pt-1">
                    <StatusBadge
                      theme={theme}
                      variant="success"
                      label="Permintaan terkirim ke meja bantuan IT (Tiket #RST-409)"
                    />
                  </div>
                )}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <ZooButton
                    theme={theme}
                    type="button"
                    variant="outline"
                    onClick={() => setActiveDialog(null)}
                  >
                    Tutup
                  </ZooButton>
                  <ZooButton
                    theme={theme}
                    type="button"
                    variant="primary"
                    onClick={() => setResetSubmitted(true)}
                  >
                    Kirim Permintaan
                  </ZooButton>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className={`${theme.bodyTextClass} ${theme.bodyColor}`}>
                  Pembuatan akun kerja baru bagi staf Registrar, Kurator, Keeper,
                  Ahli Nutrisi, dan Dokter Hewan dilakukan melalui surat tugas
                  Kepala Divisi Konservasi.
                </p>
                <div
                  className={`p-4 ${theme.radiusSmClass} bg-black/[0.03] border border-black/10 space-y-2 text-sm`}
                >
                  <div className="flex justify-between">
                    <span className={theme.mutedColor}>Ekstensi Radio / Telepon:</span>
                    <span className="font-mono font-semibold">Ext. 104 (IT Ops)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.mutedColor}>Ruang Operasional:</span>
                    <span className="font-semibold">Gedung Manajemen Lt. 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.mutedColor}>Jam Layanan Shift:</span>
                    <span className="font-mono font-semibold">05.30 – 21.00 WIB</span>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <ZooButton
                    theme={theme}
                    type="button"
                    variant="primary"
                    onClick={() => setActiveDialog(null)}
                  >
                    Mengerti
                  </ZooButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
