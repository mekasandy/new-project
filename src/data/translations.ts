export type Language = 'ID' | 'EN';
export type ViewMode = 'desktop' | 'field';

export interface StaffAccount {
  id: string;
  email: string;
  name: string;
  role: {
    ID: string;
    EN: string;
  };
  sector: {
    ID: string;
    EN: string;
  };
  pin: string;
  password: string;
}

export const DEMO_ACCOUNTS: StaffAccount[] = [
  {
    id: 'KPR-204',
    email: 'budi.santoso@faunatrack.id',
    name: 'Budi Santoso',
    role: {
      ID: 'Keeper Senior Satwa',
      EN: 'Senior Wildlife Keeper',
    },
    sector: {
      ID: 'Sektor A · Mamalia Besar & Savana',
      EN: 'Sector A · Large Mammals & Savanna',
    },
    pin: '2409',
    password: 'keeper2026',
  },
  {
    id: 'VET-108',
    email: 'drh.sari@faunatrack.id',
    name: 'drh. Sari Wulandari',
    role: {
      ID: 'Dokter Hewan Klinik',
      EN: 'Clinical Veterinarian',
    },
    sector: {
      ID: 'Klinik Karantina & Nutrisi',
      EN: 'Quarantine & Nutrition Clinic',
    },
    pin: '1080',
    password: 'vet2026',
  },
];

export const TRANSLATIONS = {
  ID: {
    brandTagline: 'Sistem Manajemen Satwa Kebun Binatang',
    brandFunctionSentence:
      'Catat observasi harian, jadwal pakan, dan rekam medis satwa secara terpadu dari kandang hingga klinik.',
    brandFooterMeta: 'Operasional Kandang · Nutrisi · Rekam Medis Veteriner',
    cardTitle: 'Masuk ke FaunaTrack',
    cardSubtitle: 'Gunakan akun staf kebun binatang Anda',
    staffIdLabel: 'ID Staf atau Email',
    staffIdPlaceholder: 'Contoh: KPR-204 atau nama@faunatrack.id',
    passwordLabel: 'Kata Sandi',
    passwordPlaceholder: 'Masukkan kata sandi Anda',
    showPassword: 'Tampilkan',
    hidePassword: 'Sembunyikan',
    rememberMe: 'Ingat saya',
    forgotPassword: 'Lupa kata sandi?',
    loginButton: 'Masuk',
    loggingIn: 'Memverifikasi...',
    errorInvalidCredentials:
      'ID atau kata sandi salah. Periksa kembali ID Staf (mis. KPR-204) atau kata sandi Anda.',
    errorEmptyFields:
      'ID Staf/Email dan kata sandi wajib diisi sebelum masuk.',
    needHelpPrefix: 'Butuh bantuan?',
    contactAdminLink: 'Hubungi admin sistem',
    quickAccessLabel: 'Masuk cepat keeper lapangan',
    pinOptionLabel: 'PIN Lapangan',
    biometricOptionLabel: 'Biometrik',
    fieldModeBadge: 'MODE LAPANGAN · KONTRAS TINGGI',
    viewSwitcherLabel: 'Tampilan',
    viewDesktop: 'Desktop',
    viewFieldMobile: 'Mobile / Lapangan',
    demoHelperLabel: 'Simulasi Cepat:',
    demoFillValid: 'Isi Akun Staf',
    demoTriggerError: 'Tes Pesan Error',
    // Modals
    pinModalTitle: 'Masuk Cepat dengan PIN',
    pinModalDesc: 'Masukkan 4 digit PIN perangkat lapangan Anda (Demo: 2409)',
    pinClear: 'Hapus',
    pinSubmit: 'Masuk dengan PIN',
    pinError: 'PIN tidak dikenali. Gunakan PIN demo 2409 atau 1080.',
    pinFillDemo: 'Isi PIN 2409',
    bioModalTitle: 'Verifikasi Biometrik Perangkat',
    bioModalDesc: 'Tempelkan jari pada sensor perangkat lapangan atau gunakan kunci sandi perangkat.',
    bioScanning: 'Memindai sidik jari staf...',
    bioScanButton: 'Pindai Sidik Jari Sekarang',
    bioSuccess: 'Identitas terverifikasi: KPR-204 (Budi Santoso)',
    forgotModalTitle: 'Atur Ulang Kata Sandi Staf',
    forgotModalDesc:
      'Masukkan ID Staf atau email kebun binatang Anda. Kode pemulihan sementara akan dikirim ke supervisor shift dan email terdaftar.',
    forgotSendButton: 'Kirim Permintaan Reset',
    forgotSuccessTitle: 'Permintaan Terkirim',
    forgotSuccessDesc:
      'Permintaan reset telah diteruskan ke Pos Komando ZOO OPS. Hubungi Supervisor Shift jika Anda sedang bertugas di kandang.',
    adminModalTitle: 'Bantuan Admin Sistem ZOO OPS',
    adminModalDesc:
      'Jika Anda mengalami kendala akses di lapangan atau pergantian perangkat tablet kandang, hubungi saluran operasional berikut:',
    adminRadioLabel: 'Radio VHF Lapangan',
    adminRadioValue: 'CH-04 (Pos Komando Ops)',
    adminExtLabel: 'Ekstensi Telepon Internal',
    adminExtValue: 'Ext. 109 · IT & Sistem Satwa',
    adminLocationLabel: 'Meja Bantuan Fisik',
    adminLocationValue: 'Gedung Administrasi Lantai 1, Ruang Server',
    closeModal: 'Tutup',
  },
  EN: {
    brandTagline: 'Zoo Wildlife Management System',
    brandFunctionSentence:
      'Record daily observations, feeding schedules, and veterinary medical records seamlessly from enclosure to clinic.',
    brandFooterMeta: 'Enclosure Ops · Nutrition · Veterinary Records',
    cardTitle: 'Sign in to FaunaTrack',
    cardSubtitle: 'Use your zoo staff account',
    staffIdLabel: 'Staff ID or Email',
    staffIdPlaceholder: 'e.g. KPR-204 or name@faunatrack.id',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    showPassword: 'Show',
    hidePassword: 'Hide',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    loginButton: 'Sign In',
    loggingIn: 'Verifying...',
    errorInvalidCredentials:
      'Invalid ID or password. Please verify your Staff ID (e.g. KPR-204) and password.',
    errorEmptyFields:
      'Both Staff ID/Email and password are required to sign in.',
    needHelpPrefix: 'Need help?',
    contactAdminLink: 'Contact system admin',
    quickAccessLabel: 'Field keeper quick sign-in',
    pinOptionLabel: 'Field PIN',
    biometricOptionLabel: 'Biometric',
    fieldModeBadge: 'FIELD MODE · HIGH CONTRAST',
    viewSwitcherLabel: 'Layout',
    viewDesktop: 'Desktop',
    viewFieldMobile: 'Mobile / Field',
    demoHelperLabel: 'Quick Test:',
    demoFillValid: 'Fill Staff Account',
    demoTriggerError: 'Test Error State',
    // Modals
    pinModalTitle: 'Quick Sign-In with PIN',
    pinModalDesc: 'Enter your 4-digit field device PIN (Demo: 2409)',
    pinClear: 'Clear',
    pinSubmit: 'Sign In with PIN',
    pinError: 'Unrecognized PIN. Use demo PIN 2409 or 1080.',
    pinFillDemo: 'Fill PIN 2409',
    bioModalTitle: 'Device Biometric Verification',
    bioModalDesc: 'Place your finger on the field tablet sensor or confirm device passkey.',
    bioScanning: 'Scanning staff fingerprint...',
    bioScanButton: 'Scan Fingerprint Now',
    bioSuccess: 'Identity verified: KPR-204 (Budi Santoso)',
    forgotModalTitle: 'Reset Staff Password',
    forgotModalDesc:
      'Enter your Staff ID or zoo email address. A temporary recovery code will be sent to your shift supervisor and registered email.',
    forgotSendButton: 'Send Reset Request',
    forgotSuccessTitle: 'Request Submitted',
    forgotSuccessDesc:
      'Your reset request has been routed to the ZOO OPS Command Post. Contact your Shift Supervisor if you are currently on enclosure duty.',
    adminModalTitle: 'ZOO OPS System Admin Support',
    adminModalDesc:
      'If you experience field access issues or enclosure tablet handoffs, reach out via the following operational channels:',
    adminRadioLabel: 'Field VHF Radio',
    adminRadioValue: 'CH-04 (Ops Command Post)',
    adminExtLabel: 'Internal Phone Extension',
    adminExtValue: 'Ext. 109 · Wildlife IT Support',
    adminLocationLabel: 'On-Site Helpdesk',
    adminLocationValue: 'Admin Building Fl. 1, Operations Room',
    closeModal: 'Close',
  },
} as const;
