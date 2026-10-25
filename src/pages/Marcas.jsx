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
      .finally(() => setCargando(true));
  }, []);
  // Control de situaciones sin datos
  // Aun no han llegado
  if (cargando) return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-2" role="status">
        <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
        <span>Cargando marcas...</span>
      </div>
    </div>
  );
  // Hay error
  if (error) return <div className="container py-4"><p className="alert alert-danger">Error: {error}</p></div>;
  // Llego un array de datos
  if (marcas.length === 0) return <div className="container py-4"><p>No hay marcas disponibles.</p></div>;
  
  // Situación con datos => mostrarlos
  return (
    <main className="container py-4">
      <h2 className="mb-4">Marcas</h2>
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
