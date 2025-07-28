import React from 'react';
import Header from './components/header/Header';
import './assets/styles/index.ts';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
