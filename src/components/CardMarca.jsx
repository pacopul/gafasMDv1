import { Link } from 'react-router-dom';
import { IMG_MARCAS } from '../service/api';

export default function CardMarca({ marca }) {
  return (
    // Se envía la marca en el state para recogerla en el detalle
    <Link
      to={`/marca/${marca.id}/gafas`}
      state={{ marca }}
      className="card h-100 text-center text-decoration-none text-dark shadow-sm"
    >
      <img
        src={IMG_MARCAS + marca.imagen}
        alt={marca.nombre}
        className="card-img-top p-3"
      />
      <div className="card-body">
        <h5 className="card-title">{marca.nombre}</h5>
      </div>
    </Link>
  );
}
