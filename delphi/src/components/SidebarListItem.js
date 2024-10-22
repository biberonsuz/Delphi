const SidebarListItem = ({ icon: Icon, label, href, highlight, size = 24, strokeWidth = 1.5 }) => {
    return (
      <li>
        <a href={href} className={`flex items-center gap-2 text-sm rounded-lg p-2 whitespace-nowrap overflow-hidden ${highlight ? 'bg-gray-200' : ''}`}>
          <span className="py-1 px-1 rounded-3xl bg-gray-200 hover:bg-gray-300">
            <Icon size={size} strokeWidth={strokeWidth} />
          </span>
          {label}
        </a>
      </li>
    );
  };
  export default SidebarListItem;
  