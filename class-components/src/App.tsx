import React from 'react';
import Header from './components/header/Header';
import './assets/styles/index.ts';
import MainPage from './pages/MainPage.tsx';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <MainPage />
    </>
  );
};

export default App;
