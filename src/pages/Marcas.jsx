import { useEffect, useState } from 'react';
import CardMarca from '../components/CardMarca';
import { getMarcas } from '../service/api';

export default function Marcas() {
  const [marcas, setMarcas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Al montar el componente se piden las marcas a la API
  useEffect(() => {
    getMarcas()
      .then((data) => {
        setMarcas(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);
  return (
    <main className="container py-4">
      <h2 className="mb-4">Marcas</h2>
      {cargando && (
        <div className="d-flex align-items-center gap-2" role="status">
          <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
          <span>Cargando marcas...</span>
        </div>
      )}
      {error && <p className="alert alert-danger">Error: {error}</p>}
      {marcas.length === 0 && (
        <p>No hay marcas disponibles.</p>
      )}

      <div className="row g-3 justify-content-center">
        {marcas.map((marca) => (
          <div key={marca.id} className="col-6 col-md-4 col-lg-3">
            <CardMarca marca={marca} />
          </div>
        ))}
      </div>
    </main>
  );
}
