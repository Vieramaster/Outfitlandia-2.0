export const FogDayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    style={{ marginBottom: "0.5rem" }}
    {...props}
  >
    <defs>
      <symbol id="c" viewBox="0 0 193 193">
        <circle
          cx={96.5}
          cy={96.5}
          r={40}
          fill="none"
          stroke="#e2414c"
          strokeMiterlimit={10}
          strokeWidth={9}
        />
        <path
          fill="none"
          stroke="#e2414c"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={9}
          d="M96.5 29.9V4.5m0 184v-25.4m47.1-113.7 18-18M31.4 161.6l18-18m0-94.2-18-18m130.2 130.2-18-18M4.5 96.5h25.4m158.6 0h-25.4"
        >
          <animateTransform
            additive="sum"
            attributeName="transform"
            dur="6s"
            repeatCount="indefinite"
            type="rotate"
            values="0 96.5 96.5; 45 96.5 96.5"
          />
        </path>
      </symbol>
      <symbol id="d" viewBox="0 0 359 231">
        <path
          fill="none"
          stroke="#e2e8f0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={15}
          d="M295.5 223.5a56 56 0 000-112l-2.5.1a83.9 83.9 0 00-153-64.2 56 56 0 00-84.6 48.1 56.6 56.6 0 00.8 9 60 60 0 0011.2 119"
        />
      </symbol>
      <symbol id="b" viewBox="0 0 435.5 371.5">
        <g clipPath="url(#a)">
          <use
            xlinkHref="#c"
            width={193}
            height={193}
            transform="translate(69.5 110.5)"
          />
        </g>
        <use
          xlinkHref="#d"
          width={359}
          height={231}
          transform="translate(76.5 140.5)"
        />
      </symbol>
      <symbol id="e" overflow="visible" viewBox="0 0 258 66">
        <path
          fill="none"
          stroke="#e2e8f0"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={18}
          d="M9 57h240"
        >
          <animateTransform
            additive="sum"
            attributeName="transform"
            dur="6s"
            repeatCount="indefinite"
            type="translate"
            values="-24 0; 24 0; -24 0"
          />
        </path>
        <path
          fill="none"
          stroke="#e2e8f0"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={18}
          d="M9 9h240"
        >
          <animateTransform
            additive="sum"
            attributeName="transform"
            dur="6s"
            repeatCount="indefinite"
            type="translate"
            values="24 0; -24 0; 24 0"
          />
        </path>
      </symbol>
      <clipPath id="a">
        <path
          fill="none"
          d="M288 148a83.8 83.8 0 00-71.4 40 56 56 0 00-84.6 48 56.6 56.6 0 00.8 9A60 60 0 0084 304H0V0h288Z"
        />
      </clipPath>
    </defs>
    <use xlinkHref="#b" width={435.5} height={371.5} />
    <use
      xlinkHref="#e"
      width={258}
      height={66}
      transform="translate(127 405)"
    />
  </svg>
);
