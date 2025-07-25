import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/ErrorPage';
import AboutUs from '../pages/AboutUsPage';

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
