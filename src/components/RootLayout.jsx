import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
export default function RootLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
