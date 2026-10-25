const BASE_URL = 'http://www.ies-azarquiel.es/paco/apigafas';

export const IMG_MARCAS = `${BASE_URL}/img/marcas/`;
export const IMG_GAFAS = `${BASE_URL}/img/gafas/`;

// Devuelve el array de marcas
export async function getMarcas() {
  const respuesta = await fetch(`${BASE_URL}/marcas`);
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
  }
  const datos = await respuesta.json();
  return datos.marcas;
}

// Devuelve el array de gafas de una marca
export async function getGafasByMarca(idmarca) {
  const respuesta = await fetch(`${BASE_URL}/marca/${idmarca}/gafas`);
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
  }
  const datos = await respuesta.json();
  return datos.gafas;
}
