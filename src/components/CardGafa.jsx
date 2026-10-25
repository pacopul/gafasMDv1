import { IMG_GAFAS } from '../service/api';

export default function CardGafa({ gafa }) {
  return (
    <div className="card h-100 text-center shadow-sm">
      <img
        src={IMG_GAFAS + gafa.imagen}
        alt={gafa.nombre}
        className="card-img-top p-3"
      />
      <div className="card-body">
        <h5 className="card-title">{gafa.nombre}</h5>
        <p className="card-text fw-bold">{gafa.precio} €</p>
      </div>
    </div>
  );
}
