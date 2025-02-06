const SidebarIcon = ({ size = 24, strokeWidth = 1.5, className = '', ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    className={`${className}`}
    width={size}
    height={size}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 4.5l-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
  </svg>
);

export default SidebarIcon;
