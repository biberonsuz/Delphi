const SidebarListItem = ({ icon: Icon, label, href, isSelected, size = 24, strokeWidth = 1.5, onClick }) => {
  return (
    <li>
      <a 
        href={href} 
        onClick={onClick}
        className={`flex items-center gap-2 text-sm rounded-lg p-2 whitespace-nowrap overflow-hidden cursor-pointer
          ${isSelected ? 'bg-gray-200' : 'text-gray-700 hover:bg-gray-200'}`}>
        <span className={`py-1 px-1 rounded-3xl ${isSelected ? 'bg-gray-200' : 'bg-gray-200'}`}>
          <Icon size={size} strokeWidth={strokeWidth} />
        </span>
        {label}
      </a>
    </li>
  );
}
export default SidebarListItem
