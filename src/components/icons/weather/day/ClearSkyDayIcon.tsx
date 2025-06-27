export const ClearSkyDayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <defs>
      <symbol id="a" viewBox="0 0 375 375">
        <circle
          cx={187.5}
          cy={187.5}
          r={84}
          fill="none"
          stroke="#e2414c"
          strokeMiterlimit={10}
          strokeWidth={15}
        />
        <path
          fill="none"
          stroke="#e2414c"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={15}
          d="M187.5 57.2V7.5m0 360v-49.7m92.2-222.5 35-35M60.3 314.7l35.1-35.1m0-184.4-35-35m254.5 254.5-35.1-35.1M57.2 187.5H7.5m360 0h-49.7"
        >
          <animateTransform
            additive="sum"
            attributeName="transform"
            dur="6s"
            repeatCount="indefinite"
            type="rotate"
            values="0 187.5 187.5; 45 187.5 187.5"
          />
        </path>
      </symbol>
    </defs>
    <use
      xlinkHref="#a"
      width={375}
      height={375}
      transform="translate(68.5 68.5)"
    />
  </svg>
);
