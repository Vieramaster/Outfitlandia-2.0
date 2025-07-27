export const WindIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <g transform="translate(85 139)">
      <path
        fill="none"
        stroke="#e2e8f0"
        strokeDasharray={148}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={18}
        d="M264.2 21.3A40 40 0 11293 89H9"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="15s"
          repeatCount="indefinite"
          values="0;2960"
        />
      </path>
      <path
        fill="none"
        stroke="#e2e8f0"
        strokeDasharray={110}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={18}
        d="M148.2 212.7A40 40 0 10177 145H9"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="15s"
          repeatCount="indefinite"
          values="0;1540"
        />
      </path>
    </g>
  </svg>
);
