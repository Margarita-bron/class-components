import styles from './header.module.css';
import classes from 'classnames';
import { ChangeThemeIcon } from './ui/change-theme/change-theme-icon';
import Image from 'next/image';
import { NavLink } from './ui/nav-link';
import research from '../../app/[locale]/research.ico';
import LocaleSwitcher from './ui/locale-switcher/LocaleSwitcher';

const navigation = [
  { name: 'Library', href: '/' },
  { name: 'About Us', href: '/about' },
];

export const Header = () => {
  return (
    <div
      className={classes(
        styles.header,
        'bg-activeThemeLight dark:bg-activeThemeDark'
      )}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                alt="Open Library"
                src={research}
                className="h-8 w-auto"
                priority
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink key={item.name} href={item.href}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className={classes(styles.change)}>
              <LocaleSwitcher />
              <ChangeThemeIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
