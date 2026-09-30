/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ClipboardList,
  FilePlus2,
  LogIn,
  Monitor,
  Palette,
  Tablet,
} from 'lucide-react';
import { DailyKeeperScreen } from './screens/DailyKeeperScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import {
  ScreenId,
  THEMES,
  ThemeId,
  ViewportMode,
} from './theme/themeConfig';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('login');
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>('warm');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  const theme = THEMES[activeThemeId];

  const handleScreenSelect = (screen: ScreenId) => {
    setActiveScreen(screen);
  };

  return (
    <div className="min-h-screen w-full bg-[#161D15] text-white flex flex-col">
      {/* =====================================================================
          BAR KONTROL DESAIN SISTEM (Layar 1/2/3 · Tema 1/2/3 · Frame PC / Tablet 11")
          Seluruh teks antarmuka dalam Bahasa Indonesia, tanpa toggle bahasa.
         ===================================================================== */}
      <header
        aria-label="Navigasi Layar, Tema, dan Ukuran Frame"
        className="sticky top-0 z-40 w-full bg-[#1C261B] border-b border-white/15 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none"
      >
        {/* Kiri: Pilihan 3 Layar Utama */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono uppercase tracking-wider text-white/65 mr-1.5 hidden xl:inline">
            Layar:
          </span>

          <button
            type="button"
            onClick={() => handleScreenSelect('login')}
            className={`inline-flex items-center gap-2 h-10 px-3.5 rounded-[6px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeScreen === 'login'
                ? 'bg-[#FFB823] text-[#1F2A1E]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <LogIn className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>1. Login</span>
          </button>

          <button
            type="button"
            onClick={() => handleScreenSelect('registration')}
            className={`inline-flex items-center gap-2 h-10 px-3.5 rounded-[6px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeScreen === 'registration'
                ? 'bg-[#FFB823] text-[#1F2A1E]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FilePlus2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>2. Registrasi Satwa (Registrar)</span>
          </button>

          <button
            type="button"
            onClick={() => handleScreenSelect('keeper')}
            className={`inline-flex items-center gap-2 h-10 px-3.5 rounded-[6px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeScreen === 'keeper'
                ? 'bg-[#FFB823] text-[#1F2A1E]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ClipboardList className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>3. Daily Keeper (Tugas Harian)</span>
          </button>
        </div>

        {/* Tengah: Pilihan 3 Tema (Warm Utility, Earthy Field, Clean Modern) */}
        <div
          role="group"
          aria-label="Pilihan Tema Antarmuka"
          className="flex flex-wrap items-center gap-1.5"
        >
          <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-white/65 mr-1">
            <Palette className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden lg:inline">Tema:</span>
          </span>

          {(
            [
              {
                id: 'warm' as ThemeId,
                label: 'Tema 1: Warm Utility',
                swatch: '#FFF1CA',
                dot: '#2D4F2B',
              },
              {
                id: 'earthy' as ThemeId,
                label: 'Tema 2: Earthy Field',
                swatch: '#FCECD8',
                dot: '#6E3511',
              },
              {
                id: 'modern' as ThemeId,
                label: 'Tema 3: Clean Modern',
                swatch: '#F7F8F5',
                dot: '#1F2A1E',
              },
            ] as const
          ).map((tItem) => {
            const isSelected = activeThemeId === tItem.id;
            return (
              <button
                key={tItem.id}
                type="button"
                onClick={() => setActiveThemeId(tItem.id)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-2 h-10 px-3 rounded-[6px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#1F2A1E] ring-2 ring-[#FFB823]'
                    : 'bg-white/10 text-white/90 hover:bg-white/20'
                }`}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-black/30 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: tItem.swatch }}
                  aria-hidden="true"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: tItem.dot }}
                  />
                </span>
                <span>{tItem.label}</span>
              </button>
            );
          })}
        </div>

        {/* Kanan: Pilihan Ukuran Frame (PC 1920x1080 vs Tablet 11 inch Portrait 834x1194) */}
        <div
          role="group"
          aria-label="Pilihan Frame Layar"
          className="flex items-center gap-1.5"
        >
          <button
            type="button"
            onClick={() => setViewportMode('desktop')}
            aria-pressed={viewportMode === 'desktop'}
            className={`inline-flex items-center gap-1.5 h-10 px-3 rounded-[6px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              viewportMode === 'desktop'
                ? 'bg-[#708A58] text-white ring-2 ring-[#FFB823]'
                : 'bg-white/10 text-white/85 hover:bg-white/20'
            }`}
          >
            <Monitor className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>PC (1920×1080)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewportMode('tablet')}
            aria-pressed={viewportMode === 'tablet'}
            className={`inline-flex items-center gap-1.5 h-10 px-3 rounded-[6px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              viewportMode === 'tablet'
                ? 'bg-[#708A58] text-white ring-2 ring-[#FFB823]'
                : 'bg-white/10 text-white/85 hover:bg-white/20'
            }`}
          >
            <Tablet className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Tablet 11&quot; (834×1194)</span>
          </button>
        </div>
      </header>

      {/* =====================================================================
          SUB-BAR INFORMASI SPESIFIKASI TEMA & FRAME AKTIF
         ===================================================================== */}
      <div className="bg-[#232F22] border-b border-white/10 px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs text-white/80 font-mono">
        <div>
          <span>Aktif: </span>
          <strong className="text-[#FFB823]">{theme.name}</strong>
          <span> · {theme.subtitle}</span>
        </div>
        <div>
          {viewportMode === 'tablet' ? (
            <span>
              Mode Frame: <strong>Tablet 11 inch Portrait (834 × 1194 px)</strong> · Touch Target ≥ 48px/52px · Tanpa Bottom Nav
            </span>
          ) : (
            <span>
              Mode Frame: <strong>PC Desktop (1920 × 1080 px)</strong> · Layout Lebar Penuh
            </span>
          )}
        </div>
      </div>

      {/* =====================================================================
          KANVAS UTAMA APLIKASI (Menyesuaikan Frame PC 1920x1080 atau Tablet 834x1194)
         ===================================================================== */}
      <div
        className={`flex-1 w-full flex justify-center ${
          viewportMode === 'tablet' ? 'py-6 px-2 sm:px-6 overflow-x-auto' : ''
        }`}
      >
        <div
          className={
            viewportMode === 'tablet'
              ? 'w-[834px] min-w-[834px] max-w-[834px] min-h-[1194px] rounded-[18px] border-[6px] border-[#2C372B] shadow-2xl overflow-hidden bg-white'
              : 'w-full max-w-[1920px]'
          }
        >
          {activeScreen === 'login' && (
            <LoginScreen
              theme={theme}
              viewportMode={viewportMode}
              onNavigateScreen={handleScreenSelect}
            />
          )}

          {activeScreen === 'registration' && (
            <RegistrationScreen
              theme={theme}
              viewportMode={viewportMode}
              onNavigateScreen={handleScreenSelect}
            />
          )}

          {activeScreen === 'keeper' && (
            <DailyKeeperScreen
              theme={theme}
              viewportMode={viewportMode}
              onNavigateScreen={handleScreenSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}
