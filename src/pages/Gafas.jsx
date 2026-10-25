import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import CardGafa from '../components/CardGafa';
import { getGafasByMarca } from '../service/api';

export default function Gafas() {
  const { idmarca } = useParams();
  // La marca llega desde la pantalla master 
  // (puede ser undefined si se entra por URL directa)
  const { state } = useLocation();
  const marca = state?.marca;

  const [gafas, setGafas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // La diferencia de esta Gafas con la anterior Marcas
  // es que en este caso si cambiamos de idmarca 
  // se vuelve a ejecutar el efecto para obtener las 
  // nuevas gafas.
  // Eso lo hemos conseguido poniendo [idmarca]
  // en el array de dependencias del useEffect
  
  useEffect(() => {
    setCargando(true);
    getGafasByMarca(idmarca)
      .then((data) => {
        setGafas(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [idmarca]);

  if (cargando) return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-2" role="status">
        <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
        <span>Cargando gafas...</span>
      </div>
    </div>
  );
  if (error) return <div className="container py-4"><p className="alert alert-danger">Error: {error}</p></div>;
  if (gafas.length === 0) return <div className="container py-4"><p>No hay gafas disponibles para esta marca.</p></div>;

  return (
    <main className="container py-4">
      <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">
        ← Volver a marcas
      </Link>
      <h2 className="mb-4">Gafas {marca ? marca.nombre : `de la marca ${idmarca}`}</h2>
      <div className="row g-3 justify-content-center">
        {gafas.map((gafa) => (
          <div key={gafa.id} className="col-6 col-md-4 col-lg-3">
            <CardGafa gafa={gafa} />
          </div>
        ))}
      </div>
    </main>
  );
}
