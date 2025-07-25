type Props = {
  className?: string;
};

export default ({ className }: Props) => {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`loading-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <rect x="3" y="3" width="54" height="54" rx="27" strokeWidth="6" className="spinner-base" />
      <path
        d="M0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30C60 46.5685 46.5685 60 30 60C28.3431 60 27 58.6569 27 57C27 55.3431 28.3431 54 30 54C43.2548 54 54 43.2548 54 30C54 16.7452 43.2548 6 30 6C16.7452 6 6 16.7452 6 30C6 31.6569 4.65685 33 3 33C1.34315 33 0 31.6569 0 30Z"
        fill="#FFFFFF"
        className="spinner-body rotate1"
      />
      <g className="rotate2">
        <path
          d="M30 0C13.4315 0 0 13.4315 0 30C0 31.6569 1.34315 33 3 33C4.65685 33 6 31.6569 6 30C6 16.7452 16.7452 6 30 6C31.6569 6 33 4.65685 33 3C33 1.34315 31.6569 0 30 0Z"
          fill="#FFFFFF"
          className="spinner-effect-top"
        />
        <path
          d="M30 60C46.5685 60 60 46.5685 60 30C60 28.3431 58.6569 27 57 27C55.3431 27 54 28.3431 54 30C54 43.2548 43.2548 54 30 54C28.3431 54 27 55.3431 27 57C27 58.6569 28.3431 60 30 60Z"
          fill="#FFFFFF"
          className="spinner-effect-bottom"
        />
      </g>
    </svg>
  );
};
