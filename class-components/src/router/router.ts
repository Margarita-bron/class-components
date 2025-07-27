import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/ErrorPage';
import AboutUs from '../pages/AboutUsPage';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/about',
    Component: AboutUs,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
