import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFoundPage';
import AboutUs from '../pages/AboutUsPage';
import App from '../App';
import MainPage from '../pages/MainPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: MainPage },
      {
        path: '/about',
        Component: AboutUs,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
