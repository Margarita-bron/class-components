'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from 'classnames';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const combinedClassName = classes(
    'rounded-md px-3 py-2 text-sm font-medium',
    {
      'bg-activeThemeLight dark:bg-activeThemeDark': isActive,
      'text-gray-300 hover:bg-gray-700 hover:text-white': !isActive,
    }
  );

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
}
