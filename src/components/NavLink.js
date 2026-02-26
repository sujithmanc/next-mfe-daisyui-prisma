'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function NavLink({ href, children }) {
  const path = usePathname();
  
  // Check if the current path starts with the href (for active state)
  const isActive = path.startsWith(href);

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 
        ${isActive 
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
}
