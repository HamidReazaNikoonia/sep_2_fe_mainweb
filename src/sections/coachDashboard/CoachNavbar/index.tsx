import useAuth from '@/hooks/useAuth';
import { BookText, Settings, User } from 'lucide-react'; // Using Lucide icons
import Link from 'next/link';

const navLinkItems = [
  {
    title: 'لیست سطح ها',
    link: '/coach-dashboard',
    icon: <BookText size={18} />,
  },
  {
    title: 'پروفایل',
    link: '',
    icon: <User size={18} />,
  },
  {
    title: 'تنظیمات',
    link: '',
    icon: <Settings size={18} />,
  },
];

export default function CoachNavbar() {
  const { user } = useAuth();

  return (
    <nav className="flex flex-col items-center justify-between space-y-2 border-b bg-white px-6 py-4 text-xs shadow-sm md:flex-row md:space-y-0">
      {/* Left Section - Access Levels */}
      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-medium text-gray-700">
            <span className="text-gray-500">سطح مربی:</span>
            <span>{(user?.access_level && user.access_level !== 'none') ? user.access_level : '---'}</span>
          </div>

          {user?.access_level_request && user.access_level_request !== 'none' && (
            <div className="flex items-center gap-2 border-l-2 pl-4 font-medium text-green-600">
              <span className="text-gray-500">سطح درخواستی:</span>
              <span>{user.access_level_request}</span>
            </div>
          )}
        </div>
      )}

      {/* Right Section - Navigation Links */}
      <div className="flex items-center gap-2">
        {navLinkItems.map(item => (
          <Link
            key={item.title}
            href={item.link}
            className="flex items-center gap-1 rounded-lg p-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <span>{item.title}</span>
            {item.icon}
          </Link>
        ))}
      </div>
    </nav>
  );
}
