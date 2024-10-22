import { useState } from 'react';
import SidebarListItem from './SidebarListItem';
import SettingsIcon from './icons/SettingsIcon';
import SidebarIcon from './icons/SidebarIcon';
import ProfileIcon from './icons/ProfileIcon';
import NewIcon from './icons/NewIcon';
import BookIcon from './icons/BookIcon';

const Sidebar = ({ selectedBook }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = (e) => {
    e.preventDefault()
    setIsCollapsed(!isCollapsed)
  };

  return (
    <div className={`flex flex-col bg-gray-100 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-2 flex justify-between">
        <a href="#" className="flex items-center gap-2 text-sm p-2">
          <span className="py-1 px-1 rounded-3xl bg-gray-200 hover:bg-gray-300">
            <NewIcon size={24} strokeWidth={1.5} />
          </span>
        </a>
        <a href="#" onClick={toggleSidebar} className="flex items-center gap-2 text-sm">
          <span className="py-1 px-1 rounded-3xl hover:bg-gray-300">
            <SidebarIcon className={`-translate-x-0.5 ${isCollapsed ? 'rotate-180' : ''}`} size={24} strokeWidth={1.6} />
          </span>
        </a>
      </div>
      <nav className="flex flex-col p-2 grow">
        <ul className="space-y-4 border-b border-gray-300 pb-4">
          <SidebarListItem
            icon={SettingsIcon}
            label={!isCollapsed && "Library"} // Hide label when collapsed
            href="#"
          />
          <SidebarListItem
            icon={ProfileIcon}
            label={!isCollapsed && "Profile"}
            href="#"
          />
          <SidebarListItem
            icon={SettingsIcon}
            label={!isCollapsed && "Settings"}
            href="#"
          />
        </ul>
        <ul className="space-y-4 grow pt-4">
          {selectedBook ? (
            <SidebarListItem
              icon={BookIcon}
              label={!isCollapsed && `${selectedBook.title} — ${selectedBook.author}`}
              href="#"
              highlight={true}
            />
          ) : (
            <SidebarListItem
              icon={BookIcon}
              label={!isCollapsed && "New Book"}
              href="#"
            />
          )}
        </ul>
        <div className="pt-4 bg-gray-100">
          {!isCollapsed && <p className="text-xs">&copy; 2024 Delphi Demo.</p>}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
