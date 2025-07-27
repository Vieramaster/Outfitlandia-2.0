export const LoaderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={60} height={60} viewBox="0 0 50 50" {...props}>
    <circle cx={25} cy={25} r={15} fill="none" stroke="#e2414c" strokeWidth={2}>
      <animate
        attributeName="r"
        values="15;20;15"
        dur="4s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.6;0.2;0.6"
        dur="4s"
        repeatCount="indefinite"
      />
    </circle>
    <circle
      cx={25}
      cy={25}
      r={15}
      fill="none"
      stroke="#e2414c"
      strokeWidth={1}
      opacity={0.3}
    >
      <animate
        attributeName="r"
        values="15;25;15"
        dur="4s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
