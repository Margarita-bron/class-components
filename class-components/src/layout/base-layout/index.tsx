import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header/Header';
import './App.css';

export const BaseLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
