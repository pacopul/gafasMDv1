import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Marcas from './pages/Marcas';
import Gafas from './pages/Gafas';
import RootLayout from './components/RootLayout';
const router = createBrowserRouter([
 {
   path: '/',
   element: <RootLayout />,
   children: [
     {
       path: '/',
       element: <Marcas />,
     },
     {
      path: '/marca/:idmarca/gafas',
      element: <Gafas />,
     },
   ],
 },
]);
export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
