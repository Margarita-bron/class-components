import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.ts';

export const App = () => {
  return <RouterProvider router={router} />;
};
