import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Info,
  ShieldAlert,
} from 'lucide-react';
import { ThemeTokens } from '../../theme/themeConfig';

/**
 * Logo resmi "BSD Zoo" untuk sistem internal Zoo Management System BSD
 */
export function BsdZooLogo({
  theme,
  surface = 'light',
  size = 'md',
}: {
  theme: ThemeTokens;
  surface?: 'light' | 'sidebar' | 'brand-panel';
  size?: 'sm' | 'md' | 'lg';
}) {
  const isDarkSurface =
    (surface === 'sidebar' && theme.id !== 'modern') ||
    (surface === 'brand-panel' && theme.id !== 'modern');

  const emblemBg =
    theme.id === 'earthy'
      ? isDarkSurface
        ? '#91AC67'
        : '#6E3511'
      : isDarkSurface
      ? '#FFB823'
      : '#2D4F2B';

  const emblemFg =
    theme.id === 'earthy'
      ? isDarkSurface
        ? '#3D1C05'
        : '#FCECD8'
      : isDarkSurface
      ? '#2D4F2B'
      : '#FFF1CA';

  const titleColor = isDarkSurface
    ? theme.id === 'earthy'
      ? 'text-[#FCECD8]'
      : 'text-[#FFF1CA]'
    : theme.headingColor;

  const subColor = isDarkSurface
    ? theme.id === 'earthy'
      ? 'text-[#FCECD8]/80'
      : 'text-[#FFF1CA]/80'
    : theme.mutedColor;

  const boxSize =
    size === 'lg' ? 'h-12 w-12' : size === 'sm' ? 'h-9 w-9' : 'h-10 w-10';

  return (
    <div className="inline-flex items-center gap-3 select-none">
      <div
        className={`${boxSize} ${theme.radiusSmClass} flex items-center justify-center shrink-0 font-bold`}
        style={{ backgroundColor: emblemBg, color: emblemFg }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-6 w-6 fill-none stroke-current"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Daun konservasi & jejak satwa minimalis */}
          <path d="M7 24C7 15 13 8 24 7C23 18 16 24 7 24Z" />
          <path d="M7 24L16 15" />
          <circle cx="21" cy="21" r="2.2" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <div className="leading-tight">
        <div
          className={`font-bold tracking-tight ${titleColor} ${
            size === 'lg' ? 'text-xl' : 'text-[17px]'
          }`}
        >
          BSD Zoo
        </div>
        <div className={`text-xs font-medium ${subColor}`}>
          Zoo Management System
        </div>
      </div>
    </div>
  );
}

/**
 * Badge Status — WAJIB selalu ikon + label teks, jangan hanya warna.
 */
export type StatusVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'iucn-cr'
  | 'iucn-en'
  | 'iucn-vu';

export function StatusBadge({
  theme,
  variant,
  label,
  icon,
  size = 'md',
}: {
  theme: ThemeTokens;
  variant: StatusVariant;
  label: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md';
}) {
  let styleClasses = '';
  let defaultIcon: React.ReactNode = null;

  switch (variant) {
    case 'success':
      styleClasses = `${theme.successBg} ${theme.successColor} border ${theme.successBorder}`;
      defaultIcon = <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />;
      break;
    case 'warning':
      styleClasses = `${theme.warningBg} ${theme.warningColor} border ${theme.warningBorder}`;
      defaultIcon = <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />;
      break;
    case 'error':
    case 'iucn-cr':
      styleClasses = `${theme.errorBg} ${theme.errorColor} border ${theme.errorBorder}`;
      defaultIcon =
        variant === 'iucn-cr' ? (
          <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
        ) : (
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        );
      break;
    case 'iucn-en':
      styleClasses = 'bg-[#FFF3E0] text-[#8C3D00] border border-[#D97706]';
      defaultIcon = <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />;
      break;
    case 'iucn-vu':
      styleClasses = `${theme.warningBg} ${theme.warningColor} border ${theme.warningBorder}`;
      defaultIcon = <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />;
      break;
    case 'info':
      styleClasses = `${theme.infoBg} ${theme.infoColor} border ${theme.infoBorder}`;
      defaultIcon = <Info className="h-4 w-4 shrink-0" aria-hidden="true" />;
      break;
    default:
      styleClasses = `bg-[#F1F3EF] ${theme.bodyColor} border ${
        theme.id === 'earthy' ? 'border-[#6E3511]/40' : 'border-[#708A58]/40'
      }`;
      defaultIcon = <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />;
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${theme.radiusSmClass} font-semibold whitespace-nowrap ${
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      } ${styleClasses}`}
    >
      {icon ?? defaultIcon}
      <span>{label}</span>
    </span>
  );
}

/**
 * Input Field dengan Label di atas input (bukan placeholder saja) & state fokus jelas
 */
export function ZooInput({
  theme,
  id,
  label,
  helperText,
  optionalText,
  mono = false,
  error,
  rightElement,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  theme: ThemeTokens;
  id: string;
  label: string;
  helperText?: string;
  optionalText?: string;
  mono?: boolean;
  error?: boolean;
  rightElement?: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1.5">
        <label htmlFor={id} className={`block ${theme.labelTextClass} ${theme.headingColor}`}>
          {label}
        </label>
        {optionalText && (
          <span className={`text-sm font-normal ${theme.mutedColor}`}>
            {optionalText}
          </span>
        )}
      </div>
      <div className="relative flex items-center">
        <input
          id={id}
          {...props}
          className={`w-full ${theme.controlHeightClass} ${theme.radiusClass} bg-white px-4 ${
            rightElement ? 'pr-24' : ''
          } ${theme.bodyTextClass} ${theme.bodyColor} ${
            mono ? 'font-mono tabular-nums' : ''
          } ${
            error
              ? 'border-2 border-[#B3261E] bg-[#FDF2F2]/40'
              : theme.inputBorder
          } ${theme.inputFocusClass} placeholder:text-[#6E7A6C] transition-shadow`}
        />
        {rightElement && (
          <div className="absolute right-1.5 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {helperText && (
        <p className={`mt-1.5 text-sm ${theme.mutedColor}`}>{helperText}</p>
      )}
    </div>
  );
}

/**
 * Dropdown Select dengan Label di atas input & state fokus jelas
 */
export function ZooSelect({
  theme,
  id,
  label,
  options,
  helperText,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  theme: ThemeTokens;
  id: string;
  label: string;
  options: { value: string; label: string }[];
  helperText?: string;
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`block mb-1.5 ${theme.labelTextClass} ${theme.headingColor}`}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          {...props}
          className={`w-full appearance-none ${theme.controlHeightClass} ${theme.radiusClass} bg-white pl-4 pr-10 ${theme.bodyTextClass} ${theme.bodyColor} ${theme.inputBorder} ${theme.inputFocusClass} cursor-pointer transition-shadow`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 ${theme.headingColor}`}
          aria-hidden="true"
        />
      </div>
      {helperText && (
        <p className={`mt-1.5 text-sm ${theme.mutedColor}`}>{helperText}</p>
      )}
    </div>
  );
}

/**
 * Tombol Konsisten (touch target minimal 48px di Tema 1 & 3, 52px di Tema 2)
 */
export function ZooButton({
  theme,
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme: ThemeTokens;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}) {
  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses = `${theme.primaryBtnBg} ${theme.primaryBtnText} ${theme.primaryBtnHover} disabled:opacity-45 disabled:pointer-events-none`;
  } else if (variant === 'secondary') {
    variantClasses = `${theme.secondaryBtnBg} ${theme.secondaryBtnText} ${theme.secondaryBtnBorder} ${theme.secondaryBtnHover} disabled:opacity-45 disabled:pointer-events-none`;
  } else {
    variantClasses = `bg-white ${theme.headingColor} ${theme.inputBorder} hover:bg-black/[0.03] disabled:opacity-45 disabled:pointer-events-none`;
  }

  return (
    <button
      {...props}
      className={`${theme.focusClass} inline-flex items-center justify-center gap-2 ${theme.controlHeightClass} ${theme.radiusClass} px-5 ${theme.bodyTextClass} font-semibold transition-colors cursor-pointer whitespace-nowrap ${
        fullWidth ? 'w-full' : ''
      } ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}
