import { Header } from '../../components/header/Header';
import './App.css';
import '../../index.css';
import { ThemeProvider, ThemeContext } from '../../context/theme-context';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import classes from 'classnames';

const Content = () => {
  const { themeStyle } = useContext(ThemeContext);

  return (
    <div
      className={classes(
        'page-container',
        themeStyle === 'light'
          ? 'body-container__theme-light'
          : 'body-container__theme-dark'
      )}
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export const BaseLayout = () => {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
};
