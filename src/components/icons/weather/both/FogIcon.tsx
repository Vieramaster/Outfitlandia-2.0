export const FogIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <path
      fill="none"
      stroke="#e2e8f0"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={18}
      d="M136 200h240"
    >
      <animateTransform
        additive="sum"
        attributeName="transform"
        dur="6s"
        repeatCount="indefinite"
        type="translate"
        values="-48 0; 48 0; -48 0"
      />
    </path>
    <path
      fill="none"
      stroke="#e2e8f0"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={18}
      d="M136 256h240"
    >
      <animateTransform
        additive="sum"
        attributeName="transform"
        begin="-1.5s"
        dur="6s"
        repeatCount="indefinite"
        type="translate"
        values="-48 0; 48 0; -48 0"
      />
    </path>
    <path
      fill="none"
      stroke="#e2e8f0"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={18}
      d="M136 312h240"
    >
      <animateTransform
        additive="sum"
        attributeName="transform"
        dur="6s"
        repeatCount="indefinite"
        type="translate"
        values="48 0; -48 0; 48 0"
      />
    </path>
  </svg>
);
