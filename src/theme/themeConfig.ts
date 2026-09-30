export type ThemeId = 'warm' | 'earthy' | 'modern';
export type ViewportMode = 'desktop' | 'tablet';
export type ScreenId = 'login' | 'registration' | 'keeper';

export interface ThemeTokens {
  id: ThemeId;
  name: string;
  subtitle: string;
  fontClass: string;
  focusClass: string;
  inputFocusClass: string;
  radiusClass: string;
  radiusSmClass: string;
  bodyTextClass: string;
  labelTextClass: string;
  controlHeightClass: string;
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  headingColor: string;
  bodyColor: string;
  mutedColor: string;
  primaryBtnBg: string;
  primaryBtnText: string;
  primaryBtnHover: string;
  secondaryBtnBg: string;
  secondaryBtnText: string;
  secondaryBtnBorder: string;
  secondaryBtnHover: string;
  accentBg: string;
  accentText: string;
  sidebarBg: string;
  sidebarText: string;
  sidebarMuted: string;
  sidebarBorder: string;
  sidebarActiveBg: string;
  sidebarActiveText: string;
  sidebarHoverBg: string;
  inputBorder: string;
  errorColor: string;
  errorBg: string;
  errorBorder: string;
  infoColor: string;
  infoBg: string;
  infoBorder: string;
  successColor: string;
  successBg: string;
  successBorder: string;
  warningColor: string;
  warningBg: string;
  warningBorder: string;
}

export const THEMES: Record<ThemeId, ThemeTokens> = {
  warm: {
    id: 'warm',
    name: 'Tema 1 — Warm Utility',
    subtitle: 'IBM Plex Sans · Sudut 8px · Hangat & Ramah',
    fontClass: 'theme-font-warm',
    focusClass: 'focus-warm',
    inputFocusClass: 'input-focus-warm',
    radiusClass: 'rounded-[8px]',
    radiusSmClass: 'rounded-[6px]',
    bodyTextClass: 'text-[16px] leading-[1.55]',
    labelTextClass: 'text-[16px] font-semibold',
    controlHeightClass: 'min-h-[48px]',
    pageBg: 'bg-[#FFF1CA]',
    cardBg: 'bg-white',
    cardBorder: 'border border-[#708A58]/50',
    cardShadow: '',
    headingColor: 'text-[#2D4F2B]',
    bodyColor: 'text-[#1E331D]',
    mutedColor: 'text-[#4A6148]',
    primaryBtnBg: 'bg-[#2D4F2B]',
    primaryBtnText: 'text-white',
    primaryBtnHover: 'hover:bg-[#223D20]',
    secondaryBtnBg: 'bg-[#FFB823]',
    secondaryBtnText: 'text-[#2D4F2B]',
    secondaryBtnBorder: 'border border-[#E09F15]',
    secondaryBtnHover: 'hover:bg-[#F3AC16]',
    accentBg: 'bg-[#FFB823]',
    accentText: 'text-[#2D4F2B]',
    sidebarBg: 'bg-[#2D4F2B]',
    sidebarText: 'text-[#FFF1CA]',
    sidebarMuted: 'text-[#FFF1CA]/75',
    sidebarBorder: 'border-[#708A58]/40',
    sidebarActiveBg: 'bg-[#FFB823]',
    sidebarActiveText: 'text-[#2D4F2B] font-semibold',
    sidebarHoverBg: 'hover:bg-[#385E35]',
    inputBorder: 'border border-[#708A58]',
    errorColor: 'text-[#B3261E]',
    errorBg: 'bg-[#FDF2F2]',
    errorBorder: 'border-[#B3261E]',
    infoColor: 'text-[#1F5FA8]',
    infoBg: 'bg-[#EFF6FF]',
    infoBorder: 'border-[#1F5FA8]/40',
    successColor: 'text-[#2D4F2B]',
    successBg: 'bg-[#ECF4EB]',
    successBorder: 'border-[#708A58]',
    warningColor: 'text-[#7A4F00]',
    warningBg: 'bg-[#FFF8E6]',
    warningBorder: 'border-[#FFB823]',
  },
  earthy: {
    id: 'earthy',
    name: 'Tema 2 — Earthy Field',
    subtitle: 'Source Sans 3 (17–18px) · Tinggi 52px · Kontras Lapangan',
    fontClass: 'theme-font-earthy',
    focusClass: 'focus-earthy',
    inputFocusClass: 'input-focus-earthy',
    radiusClass: 'rounded-[10px]',
    radiusSmClass: 'rounded-[8px]',
    bodyTextClass: 'text-[17.5px] leading-[1.55]',
    labelTextClass: 'text-[17.5px] font-bold',
    controlHeightClass: 'min-h-[52px]',
    pageBg: 'bg-[#FCECD8]',
    cardBg: 'bg-white',
    cardBorder: 'border border-[#6E3511]/45',
    cardShadow: '',
    headingColor: 'text-[#6E3511]',
    bodyColor: 'text-[#2B180A]',
    mutedColor: 'text-[#5C3A21]',
    primaryBtnBg: 'bg-[#597928]',
    primaryBtnText: 'text-white',
    primaryBtnHover: 'hover:bg-[#48631F]',
    secondaryBtnBg: 'bg-[#91AC67]',
    secondaryBtnText: 'text-[#3D1C05]',
    secondaryBtnBorder: 'border border-[#6E3511]/40',
    secondaryBtnHover: 'hover:bg-[#829E58]',
    accentBg: 'bg-[#91AC67]',
    accentText: 'text-[#3D1C05]',
    sidebarBg: 'bg-[#6E3511]',
    sidebarText: 'text-[#FCECD8]',
    sidebarMuted: 'text-[#FCECD8]/80',
    sidebarBorder: 'border-[#8C4B22]',
    sidebarActiveBg: 'bg-[#91AC67]',
    sidebarActiveText: 'text-[#2B1405] font-bold',
    sidebarHoverBg: 'hover:bg-[#582A0D]',
    inputBorder: 'border border-[#6E3511]/70',
    errorColor: 'text-[#B3261E]',
    errorBg: 'bg-[#FDF2F2]',
    errorBorder: 'border-[#B3261E]',
    infoColor: 'text-[#1F5FA8]',
    infoBg: 'bg-[#EFF6FF]',
    infoBorder: 'border-[#1F5FA8]/50',
    successColor: 'text-[#3F571B]',
    successBg: 'bg-[#EEF4E5]',
    successBorder: 'border-[#597928]',
    warningColor: 'text-[#6E3511]',
    warningBg: 'bg-[#FCECD8]',
    warningBorder: 'border-[#6E3511]/60',
  },
  modern: {
    id: 'modern',
    name: 'Tema 3 — Clean Modern',
    subtitle: 'Inter · Sudut 12px · Minimalis & Ruang Lega',
    fontClass: 'theme-font-modern',
    focusClass: 'focus-modern',
    inputFocusClass: 'input-focus-modern',
    radiusClass: 'rounded-[12px]',
    radiusSmClass: 'rounded-[8px]',
    bodyTextClass: 'text-[16px] leading-[1.6]',
    labelTextClass: 'text-[16px] font-medium',
    controlHeightClass: 'min-h-[48px]',
    pageBg: 'bg-[#F7F8F5]',
    cardBg: 'bg-white',
    cardBorder: 'border border-[#E4E8E0]',
    cardShadow: 'shadow-[0_1px_3px_rgba(31,42,30,0.04)]',
    headingColor: 'text-[#1F2A1E]',
    bodyColor: 'text-[#1F2A1E]',
    mutedColor: 'text-[#526050]',
    primaryBtnBg: 'bg-[#2D4F2B]',
    primaryBtnText: 'text-white',
    primaryBtnHover: 'hover:bg-[#233E21]',
    secondaryBtnBg: 'bg-[#F2F5F0]',
    secondaryBtnText: 'text-[#2D4F2B]',
    secondaryBtnBorder: 'border border-[#E4E8E0]',
    secondaryBtnHover: 'hover:bg-[#E6ECE3]',
    accentBg: 'bg-[#FFB823]',
    accentText: 'text-[#1F2A1E]',
    sidebarBg: 'bg-white',
    sidebarText: 'text-[#1F2A1E]',
    sidebarMuted: 'text-[#5A6858]',
    sidebarBorder: 'border-[#E4E8E0]',
    sidebarActiveBg: 'bg-[#E6EFE5]',
    sidebarActiveText: 'text-[#2D4F2B] font-semibold',
    sidebarHoverBg: 'hover:bg-[#F7F8F5]',
    inputBorder: 'border border-[#D5DDD0]',
    errorColor: 'text-[#B3261E]',
    errorBg: 'bg-[#FEF2F2]',
    errorBorder: 'border-[#B3261E]',
    infoColor: 'text-[#1F5FA8]',
    infoBg: 'bg-[#F0F6FF]',
    infoBorder: 'border-[#1F5FA8]/30',
    successColor: 'text-[#2D4F2B]',
    successBg: 'bg-[#EBF3EA]',
    successBorder: 'border-[#708A58]/50',
    warningColor: 'text-[#784E00]',
    warningBg: 'bg-[#FFF9EB]',
    warningBorder: 'border-[#FFB823]',
  },
};

export interface TaxonomySpecies {
  id: string;
  kelompok: string;
  className: string;
  ordo: string;
  famili: string;
  scientificName: string;
  commonName: string;
  iucnCode: 'CR' | 'EN' | 'VU';
  iucnLabel: string;
  iucnNote: string;
}

export const MASTER_SPECIES: TaxonomySpecies[] = [
  {
    id: 'tiger-sumatra',
    kelompok: 'Vertebrata',
    className: 'Mammalia',
    ordo: 'Carnivora',
    famili: 'Felidae',
    scientificName: 'Panthera tigris sumatrae',
    commonName: 'Harimau Sumatera',
    iucnCode: 'CR',
    iucnLabel: 'Kritis (Critically Endangered — CR)',
    iucnNote: 'Satwa dilindungi prioritas utama (PP No. 7/1999 & Permen LHK P.106)',
  },
  {
    id: 'sun-bear',
    kelompok: 'Vertebrata',
    className: 'Mammalia',
    ordo: 'Carnivora',
    famili: 'Ursidae',
    scientificName: 'Helarctos malayanus',
    commonName: 'Beruang Madu',
    iucnCode: 'VU',
    iucnLabel: 'Rentan (Vulnerable — VU)',
    iucnNote: 'Satwa dilindungi — pengawasan nutrisi & pengayaan perilaku wajib',
  },
  {
    id: 'orangutan-sumatra',
    kelompok: 'Vertebrata',
    className: 'Mammalia',
    ordo: 'Primates',
    famili: 'Hominidae',
    scientificName: 'Pongo abelii',
    commonName: 'Orangutan Sumatera',
    iucnCode: 'CR',
    iucnLabel: 'Kritis (Critically Endangered — CR)',
    iucnNote: 'Satwa dilindungi — wajib lampiran SATS-DN & rekam genetik studbook',
  },
  {
    id: 'tapir-asia',
    kelompok: 'Vertebrata',
    className: 'Mammalia',
    ordo: 'Perissodactyla',
    famili: 'Tapiridae',
    scientificName: 'Tapirus indicus',
    commonName: 'Tapir Asia',
    iucnCode: 'EN',
    iucnLabel: 'Terancam Punah (Endangered — EN)',
    iucnNote: 'Satwa dilindungi — pemantauan bobot & adaptasi kandang basah',
  },
];
