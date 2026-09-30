import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Delete,
  Fingerprint,
  KeyRound,
  PhoneCall,
  Radio,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  DEMO_ACCOUNTS,
  Language,
  StaffAccount,
  TRANSLATIONS,
} from '../data/translations';

interface ModalProps {
  lang: Language;
  onClose: () => void;
  onSuccessLogin?: (account: StaffAccount, method: 'pin' | 'biometric') => void;
}

export const PinLoginModal: React.FC<ModalProps> = ({
  lang,
  onClose,
  onSuccessLogin,
}) => {
  const t = TRANSLATIONS[lang];
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleDigit = (digit: string) => {
    setError('');
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 4) {
        verifyPin(nextPin);
      }
    }
  };

  const verifyPin = (candidate: string) => {
    const matched = DEMO_ACCOUNTS.find((acc) => acc.pin === candidate);
    if (matched && onSuccessLogin) {
      onSuccessLogin(matched, 'pin');
    } else {
      setError(t.pinError);
    }
  };

  const handleBackspace = () => {
    setError('');
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setError('');
    setPin('');
  };

  const handleFillDemo = () => {
    setError('');
    setPin('2409');
    const matched = DEMO_ACCOUNTS[0];
    if (onSuccessLogin) {
      onSuccessLogin(matched, 'pin');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D351B]/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pin-modal-title"
    >
      <div className="w-full max-w-[400px] rounded-[8px] border border-[#2D4F2B] bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#2D4F2B]/15 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#2D4F2B] text-[#FFB823]">
              <KeyRound className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="pin-modal-title"
                className="text-lg font-bold text-[#2D4F2B]"
              >
                {t.pinModalTitle}
              </h2>
              <span className="font-mono text-xs font-medium text-[#708A58]">
                ZOO OPS · TERMINAL LAPANGAN
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-zoo flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#2D4F2B]/20 text-[#2D4F2B] hover:bg-[#FFF1CA]"
            aria-label={t.closeModal}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-[16px] leading-relaxed text-[#1D351B]">
          {t.pinModalDesc}
        </p>

        {/* 4-Digit Monospace PIN Display */}
        <div className="my-5 flex justify-center gap-3">
          {[0, 1, 2, 3].map((idx) => {
            const char = pin[idx];
            const isActive = pin.length === idx;
            return (
              <div
                key={idx}
                className={`flex h-14 w-14 items-center justify-center rounded-[8px] border-2 font-mono text-2xl font-bold transition-colors ${
                  char
                    ? 'border-[#2D4F2B] bg-[#FFF1CA] text-[#2D4F2B]'
                    : isActive
                    ? 'border-[#FFB823] bg-white text-[#2D4F2B]'
                    : 'border-[#708A58]/40 bg-white text-[#708A58]'
                }`}
              >
                {char ? '●' : ''}
              </div>
            );
          })}
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-2.5 rounded-[8px] border border-[#DC2626] bg-[#FEF2F2] p-3 text-[#991B1B]"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#DC2626]" />
            <span className="text-[15px] font-medium leading-snug">{error}</span>
          </div>
        )}

        {/* High-Contrast Tactile Keypad (52px+ targets for outdoor use) */}
        <div className="grid grid-cols-3 gap-2.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="focus-zoo flex h-[54px] items-center justify-center rounded-[8px] border border-[#2D4F2B]/30 bg-[#FFF1CA]/50 font-mono text-xl font-bold text-[#2D4F2B] hover:bg-[#FFB823] hover:border-[#2D4F2B] active:scale-[0.98] transition-all"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="focus-zoo flex h-[54px] items-center justify-center rounded-[8px] border border-[#2D4F2B]/30 bg-white text-sm font-semibold text-[#2D4F2B] hover:bg-[#FFF1CA]"
          >
            {t.pinClear}
          </button>
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="focus-zoo flex h-[54px] items-center justify-center rounded-[8px] border border-[#2D4F2B]/30 bg-[#FFF1CA]/50 font-mono text-xl font-bold text-[#2D4F2B] hover:bg-[#FFB823] hover:border-[#2D4F2B] active:scale-[0.98] transition-all"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            aria-label="Backspace"
            className="focus-zoo flex h-[54px] items-center justify-center rounded-[8px] border border-[#2D4F2B]/30 bg-white text-[#2D4F2B] hover:bg-[#FFF1CA]"
          >
            <Delete className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#2D4F2B]/15 pt-4">
          <button
            type="button"
            onClick={handleFillDemo}
            className="focus-zoo h-12 flex-1 rounded-[8px] bg-[#FFB823] px-4 text-[16px] font-semibold text-[#2D4F2B] hover:bg-[#f0a810] transition-colors whitespace-nowrap"
          >
            {t.pinFillDemo}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="focus-zoo h-12 rounded-[8px] border border-[#2D4F2B]/30 px-4 text-[16px] font-medium text-[#2D4F2B] hover:bg-[#FFF1CA] transition-colors whitespace-nowrap"
          >
            {t.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};

export const BiometricLoginModal: React.FC<ModalProps> = ({
  lang,
  onClose,
  onSuccessLogin,
}) => {
  const t = TRANSLATIONS[lang];
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verified'>('idle');

  const triggerScan = () => {
    setStatus('scanning');
    setTimeout(() => {
      setStatus('verified');
      setTimeout(() => {
        if (onSuccessLogin) {
          onSuccessLogin(DEMO_ACCOUNTS[0], 'biometric');
        }
      }, 500);
    }, 650);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D351B]/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bio-modal-title"
    >
      <div className="w-full max-w-[400px] rounded-[8px] border border-[#2D4F2B] bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#2D4F2B]/15 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#2D4F2B] text-[#FFB823]">
              <Fingerprint className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="bio-modal-title"
                className="text-lg font-bold text-[#2D4F2B]"
              >
                {t.bioModalTitle}
              </h2>
              <span className="font-mono text-xs font-medium text-[#708A58]">
                ID PERANGKAT: TAB-SAVANA-04
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-zoo flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#2D4F2B]/20 text-[#2D4F2B] hover:bg-[#FFF1CA]"
            aria-label={t.closeModal}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-[16px] leading-relaxed text-[#1D351B]">
          {t.bioModalDesc}
        </p>

        <div className="my-6 flex flex-col items-center justify-center rounded-[8px] border border-[#708A58]/40 bg-[#FFF1CA]/60 p-6 text-center">
          <button
            type="button"
            onClick={triggerScan}
            disabled={status !== 'idle'}
            className={`focus-zoo flex h-24 w-24 items-center justify-center rounded-full border-2 transition-all ${
              status === 'verified'
                ? 'border-[#2D4F2B] bg-[#2D4F2B] text-[#FFB823]'
                : status === 'scanning'
                ? 'border-[#FFB823] bg-[#FFF1CA] text-[#2D4F2B] animate-pulse'
                : 'border-[#2D4F2B] bg-white text-[#2D4F2B] hover:bg-[#FFB823]'
            }`}
            aria-label={t.bioScanButton}
          >
            {status === 'verified' ? (
              <ShieldCheck className="h-12 w-12" />
            ) : (
              <Fingerprint className="h-12 w-12" />
            )}
          </button>

          <p className="mt-4 font-mono text-sm font-semibold text-[#2D4F2B]">
            {status === 'verified'
              ? t.bioSuccess
              : status === 'scanning'
              ? t.bioScanning
              : 'KPR-204 · Budi Santoso'}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={triggerScan}
            disabled={status !== 'idle'}
            className="focus-zoo flex h-[52px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#2D4F2B] px-4 text-[17px] font-semibold text-white hover:bg-[#223D20] disabled:opacity-60 transition-colors"
          >
            <Fingerprint className="h-5 w-5 text-[#FFB823]" />
            <span>
              {status === 'scanning' ? t.bioScanning : t.bioScanButton}
            </span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="focus-zoo flex h-12 w-full items-center justify-center rounded-[8px] border border-[#2D4F2B]/30 bg-white text-[16px] font-medium text-[#2D4F2B] hover:bg-[#FFF1CA] transition-colors"
          >
            {t.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordModal: React.FC<ModalProps> = ({
  lang,
  onClose,
}) => {
  const t = TRANSLATIONS[lang];
  const [staffInput, setStaffInput] = useState('KPR-204');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (staffInput.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D351B]/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-modal-title"
    >
      <div className="w-full max-w-[440px] rounded-[8px] border border-[#2D4F2B] bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#2D4F2B]/15 pb-4">
          <h2
            id="forgot-modal-title"
            className="text-lg font-bold text-[#2D4F2B]"
          >
            {t.forgotModalTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="focus-zoo flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#2D4F2B]/20 text-[#2D4F2B] hover:bg-[#FFF1CA]"
            aria-label={t.closeModal}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="mt-5">
            <div className="flex items-start gap-3 rounded-[8px] border border-[#708A58] bg-[#FFF1CA]/70 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2D4F2B]" />
              <div>
                <h3 className="text-[16px] font-bold text-[#2D4F2B]">
                  {t.forgotSuccessTitle}
                </h3>
                <p className="mt-1 text-[15px] leading-relaxed text-[#1D351B]">
                  {t.forgotSuccessDesc}
                </p>
                <p className="mt-2 font-mono text-xs font-semibold text-[#2D4F2B]">
                  REF: RST-{staffInput.toUpperCase()}-0926
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="focus-zoo mt-5 flex h-12 w-full items-center justify-center rounded-[8px] bg-[#2D4F2B] text-[16px] font-semibold text-white hover:bg-[#223D20]"
            >
              {t.closeModal}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <p className="text-[16px] leading-relaxed text-[#1D351B]">
              {t.forgotModalDesc}
            </p>
            <div>
              <label
                htmlFor="reset-staff-id"
                className="block text-[16px] font-semibold text-[#2D4F2B] mb-2"
              >
                {t.staffIdLabel}
              </label>
              <input
                id="reset-staff-id"
                type="text"
                value={staffInput}
                onChange={(e) => setStaffInput(e.target.value)}
                placeholder={t.staffIdPlaceholder}
                required
                className="input-focus-zoo h-12 w-full rounded-[8px] border border-[#708A58] bg-white px-3.5 font-mono text-[16px] text-[#1D351B]"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="focus-zoo h-12 rounded-[8px] border border-[#2D4F2B]/30 px-4 text-[16px] font-medium text-[#2D4F2B] hover:bg-[#FFF1CA]"
              >
                {t.closeModal}
              </button>
              <button
                type="submit"
                className="focus-zoo h-12 rounded-[8px] bg-[#2D4F2B] px-5 text-[16px] font-semibold text-white hover:bg-[#223D20]"
              >
                {t.forgotSendButton}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export const AdminHelpModal: React.FC<ModalProps> = ({ lang, onClose }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D351B]/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div className="w-full max-w-[460px] rounded-[8px] border border-[#2D4F2B] bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#2D4F2B]/15 pb-4">
          <div>
            <h2
              id="admin-modal-title"
              className="text-lg font-bold text-[#2D4F2B]"
            >
              {t.adminModalTitle}
            </h2>
            <span className="font-mono text-xs font-medium text-[#708A58]">
              FAUNATRACK · ZOO OPS SUPPORT
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-zoo flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#2D4F2B]/20 text-[#2D4F2B] hover:bg-[#FFF1CA]"
            aria-label={t.closeModal}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-[16px] leading-relaxed text-[#1D351B]">
          {t.adminModalDesc}
        </p>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 rounded-[8px] border border-[#708A58]/40 bg-[#FFF1CA]/50 p-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#2D4F2B] text-[#FFB823]">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-[#1D351B]/80">
                {t.adminRadioLabel}
              </div>
              <div className="font-mono text-[16px] font-bold text-[#2D4F2B]">
                {t.adminRadioValue}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-[8px] border border-[#708A58]/40 bg-[#FFF1CA]/50 p-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#2D4F2B] text-[#FFB823]">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-[#1D351B]/80">
                {t.adminExtLabel}
              </div>
              <div className="font-mono text-[16px] font-bold text-[#2D4F2B]">
                {t.adminExtValue}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[8px] border border-[#2D4F2B]/15 bg-white p-3 text-sm text-[#1D351B]">
          <span className="font-semibold text-[#2D4F2B]">
            {t.adminLocationLabel}:
          </span>{' '}
          {t.adminLocationValue}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="focus-zoo mt-5 flex h-12 w-full items-center justify-center rounded-[8px] bg-[#2D4F2B] text-[16px] font-semibold text-white hover:bg-[#223D20] transition-colors"
        >
          {t.closeModal}
        </button>
      </div>
    </div>
  );
};
