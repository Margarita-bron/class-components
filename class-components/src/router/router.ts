import { createBrowserRouter } from 'react-router-dom';
import { AboutUsPage } from '../pages/about-us/AboutUsPage';
import { MainPage } from '../pages/main-page/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { BaseLayout } from '../layout/base-layout';
import { Paths } from './pathes';

export const router = createBrowserRouter([
  {
    path: Paths.ROOT,
    Component: BaseLayout,
    children: [
      { index: true, Component: MainPage },
      {
        path: Paths.ABOUT_US,
        Component: AboutUsPage,
      },
    ],
  },
  {
    path: Paths.OTHERS_ROOT,
    Component: NotFoundPage,
  },
]);
