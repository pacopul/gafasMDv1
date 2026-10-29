import { Link } from 'react-router-dom';
import headerImage from '../assets/header.jpg';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header>
      <nav className="navbar bg-white px-3 px-md-4 py-2">
        <Link to="/" className="navbar-brand d-inline-flex align-items-center gap-3 mb-0">
          <img src={logo} alt="Fashion Glasses" width="72" />
          <span className="fw-semibold">Gafas MD</span>
        </Link>
      </nav>
      <img
        src={headerImage}
        alt="Pareja de guapos"
        className="d-block w-100"
      />
    </header>
  );
}
