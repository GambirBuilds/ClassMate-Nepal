import { Users, LayoutDashboard, CheckSquare, History, FileBarChart, School, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'students', label: 'Students', icon: <Users size={20} /> },
    { id: 'attendance', label: 'Attendance', icon: <CheckSquare size={20} /> },
    { id: 'history', label: 'History', icon: <History size={20} /> },
    { id: 'report', label: 'Reports', icon: <FileBarChart size={20} /> },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <School size={20} className="text-blue-400" />
          <h2 className="text-lg font-bold">ClassMate Nepal</h2>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Desktop + Mobile Drawer */}
      <aside className={`${isOpen ? 'block' : 'hidden'} md:flex absolute md:relative z-10 w-full md:w-64 h-full md:h-auto bg-slate-900 text-white flex-col transition-all`}>
        <div className="p-6 hidden md:flex items-center gap-3 border-b border-slate-800">
          <div className="bg-blue-600 p-2 rounded-lg">
            <School size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">ClassMate</h2>
            <p className="text-xs text-blue-300 font-medium">Nepal</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800 mt-auto">
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-400 mb-1">Academic Year</p>
            <p className="text-sm font-semibold text-slate-200">2082/2083 BS</p>
          </div>
        </div>
      </aside>
    </>
  );
}
