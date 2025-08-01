import { NavLink } from 'react-router-dom';
import research from '../../assets/research.ico';
import './header.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-context';
import classes from 'classnames';
import { ChangeThemeIcon } from './ui/change-theme-icon';

const navigation = [
  { name: 'Library', href: '/' },
  { name: 'About Us', href: '/about' },
];

export const Header = () => {
  const { themeStyle } = useContext(ThemeContext);
  return (
    <div
      className={classes(
        'header',
        themeStyle == 'light' ? 'bg-gray-200' : 'bg-gray-900'
      )}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Open Library" src={research} className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classes(
                        isActive
                          ? `${themeStyle == 'light' ? 'active__theme-light' : 'active__theme-dark'}`
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <ChangeThemeIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
