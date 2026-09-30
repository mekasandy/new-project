import React from 'react';

interface LogoProps {
  variant?: 'dark-panel' | 'light-canvas';
  size?: 'md' | 'lg';
}

export const FaunaTrackLogo: React.FC<LogoProps> = ({
  variant = 'dark-panel',
  size = 'md',
}) => {
  const isDarkPanel = variant === 'dark-panel';

  return (
    <div className="inline-flex items-center gap-3 select-none">
      {/* Flat emblem: stylized leaf + wildlife track */}
      <div
        className={`flex items-center justify-center rounded-[8px] border ${
          size === 'lg' ? 'w-12 h-12' : 'w-11 h-11'
        } ${
          isDarkPanel
            ? 'bg-[#223D20] border-[#708A58]/60'
            : 'bg-[#2D4F2B] border-[#2D4F2B]'
        }`}
        aria-hidden="true"
      >
        <svg
          width={size === 'lg' ? '28' : '24'}
          height={size === 'lg' ? '28' : '24'}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Botanical leaf silhouette */}
          <path
            d="M25.5 6.5C17.5 6.5 9 11.5 7.5 21.5C17.5 20 22.5 14.5 25.5 6.5Z"
            fill="#708A58"
          />
          <path
            d="M25.5 6.5C19 12 13.5 17.5 6.5 25.5"
            stroke="#FFF1CA"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Warm yellow accent node / wildlife tag marker */}
          <circle cx="21" cy="11" r="3" fill="#FFB823" />
          <path
            d="M11 14.5L14.5 18"
            stroke="#FFF1CA"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M15 10.5L18.5 14"
            stroke="#FFF1CA"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <span
            className={`font-bold tracking-tight leading-none ${
              size === 'lg' ? 'text-2xl' : 'text-[22px]'
            } ${isDarkPanel ? 'text-[#FFF1CA]' : 'text-[#2D4F2B]'}`}
          >
            FaunaTrack
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] bg-[#FFB823] text-[#2D4F2B] font-mono text-xs font-semibold tracking-wider uppercase">
            ZOO OPS
          </span>
        </div>
      </div>
    </div>
  );
};

export const FlatWildlifeIllustration: React.FC = () => {
  return (
    <div
      className="w-full max-w-[380px] my-auto py-4"
      role="img"
      aria-label="Ilustrasi flat daun tropis dan siluet satwa kebun binatang"
    >
      <svg
        viewBox="0 0 400 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto rounded-[8px]"
      >
        {/* Subtle framed botanical canvas inside dark green panel */}
        <rect
          x="4"
          y="4"
          width="392"
          height="282"
          rx="8"
          fill="#233F21"
          stroke="#708A58"
          strokeWidth="1"
          strokeOpacity="0.45"
        />

        {/* Calm horizon ground line */}
        <path
          d="M24 236H376"
          stroke="#708A58"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Warm sun / habitat dome disc */}
        <circle cx="296" cy="88" r="34" fill="#FFB823" fillOpacity="0.92" />

        {/* Background flat botanical fern leaf (Left) */}
        <path
          d="M44 236C44 166 82 110 138 86C134 148 98 198 44 236Z"
          fill="#708A58"
          fillOpacity="0.38"
        />
        <path
          d="M44 236C74 184 104 136 138 86"
          stroke="#708A58"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M78 182L60 168M96 152L76 138M114 122L96 110"
          stroke="#708A58"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Large flat tropical leaf (Right background) */}
        <path
          d="M348 236C354 176 324 128 274 112C272 166 302 212 348 236Z"
          fill="#708A58"
          fillOpacity="0.55"
        />
        <path
          d="M348 236C322 192 298 152 274 112"
          stroke="#FFF1CA"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />

        {/* Flat geometric wildlife silhouette: Sumatran Elephant in calm profile */}
        <g>
          {/* Body & back arch */}
          <path
            d="M126 168C126 132 156 112 198 112H224C254 112 274 132 274 164V236H246V194H158V236H130V182C127 177 126 172 126 168Z"
            fill="#708A58"
          />
          {/* Head & curved trunk */}
          <path
            d="M254 120C278 120 296 138 296 162V208C296 219 287 226 277 226C268 226 262 219 262 210V196H276V168C276 150 264 136 248 136V120H254Z"
            fill="#708A58"
          />
          {/* Ear (flat layered shape) */}
          <path
            d="M232 122H254C264 122 270 130 270 142C270 158 256 172 238 172H232V122Z"
            fill="#2D4F2B"
            stroke="#FFF1CA"
            strokeWidth="1.5"
          />
          {/* Cream tusk accent */}
          <path
            d="M276 178C288 182 298 180 306 172"
            stroke="#FFF1CA"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Eye dot */}
          <circle cx="276" cy="146" r="2.5" fill="#FFF1CA" />
          {/* Tail line */}
          <path
            d="M126 156L112 192"
            stroke="#708A58"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* Foreground botanical sprig (Bottom Left) */}
        <path
          d="M86 236C86 206 108 184 138 180C134 208 114 228 86 236Z"
          fill="#FFF1CA"
          fillOpacity="0.9"
        />
        <path
          d="M86 236L124 192"
          stroke="#2D4F2B"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Minimalist identification tag badge inside illustration (Zoo Ops context) */}
        <g transform="translate(28, 28)">
          <rect
            x="0"
            y="0"
            width="124"
            height="28"
            rx="6"
            fill="#2D4F2B"
            stroke="#708A58"
            strokeWidth="1"
          />
          <circle cx="14" cy="14" r="4" fill="#FFB823" />
          <text
            x="26"
            y="18"
            fill="#FFF1CA"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="11"
            fontWeight="500"
          >
            SEKTOR SATWA
          </text>
        </g>

        {/* Bottom subtle caption strip inside canvas */}
        <text
          x="28"
          y="262"
          fill="#FFF1CA"
          fillOpacity="0.75"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="11"
        >
          PEMANTAUAN KANDANG &amp; KESEHATAN HARIAN
        </text>
      </svg>
    </div>
  );
};
