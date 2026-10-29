# Gafas MD

Aplicación de catálogo de gafas construida con React y Vite. Tiene dos pantallas: un listado de marcas y una vista de detalle que muestra las gafas de la marca seleccionada. El proyecto es un ejemplo de aplicación maestro-detalle, navegación con React Router DOM y carga de datos desde una API.

## Tecnologías

- React para construir la interfaz mediante componentes.
- Vite para iniciar el servidor de desarrollo y generar la compilación.
- React Router DOM para definir rutas y navegar sin recargar el documento.
- Bootstrap 5 para la cuadrícula, tarjetas, alertas, botones y spinners.
- `fetch` para consultar la API.

## Requisitos e inicio

Se necesita Node.js y npm. Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación. Los otros comandos disponibles son:

## Estructura del proyecto

```text
gafasMD/
├── index.html                 # Documento HTML inicial y nodo root de React
├── package.json               # Dependencias y comandos npm
├── vite.config.js             # Configuración de Vite y plugin de React
├── eslint.config.js           # Configuración de ESLint
├── public/                    # Archivos públicos, como favicon.svg e icons.svg
└── src/
    ├── main.jsx               # Punto de entrada: estilos y montaje de React
    ├── App.jsx                # Definición del router y las rutas
    ├── assets/                # Logo, banner e imágenes importadas por componentes
    ├── components/
    │   ├── RootLayout.jsx     # Estructura compartida con cabecera, Outlet y pie
    │   ├── Header.jsx         # Logo e imagen de cabecera
    │   ├── Footer.jsx         # Pie compartido
    │   ├── CardMarca.jsx      # Tarjeta y enlace de cada marca
    │   └── CardGafa.jsx       # Tarjeta de cada gafa
    ├── pages/
    │   ├── Marcas.jsx         # Carga y muestra todas las marcas
    │   └── Gafas.jsx          # Carga y muestra gafas de una marca
    └── service/
        └── api.js             # URL base y funciones para consultar la API
```

## Rutas y React Router DOM

En `App.jsx` se configura el enrutador con `createBrowserRouter` y se activa con `<RouterProvider>`. El router tiene una ruta padre, cuyo elemento es `RootLayout`, y dos rutas hijas:

| Ruta | Página | Función |
| --- | --- | --- |
| `/` | `Marcas` | Muestra la lista de marcas. |
| `/marca/:idmarca/gafas` | `Gafas` | Muestra las gafas de la marca identificada en la URL. |

`:idmarca` es un parámetro dinámico. Por ejemplo, en `/marca/3/gafas`, el valor del parámetro es `3`.

`RootLayout` mantiene las partes comunes de la página en este orden: `Header`, `<Outlet />` y `Footer`. `<Outlet />` es el espacio que React Router rellena con la página hija de la ruta activa. En `/` se muestra `Marcas`; en `/marca/3/gafas` se muestra `Gafas`. La cabecera y el pie permanecen mientras cambia el contenido central.

`CardMarca` usa `<Link>` para navegar al detalle sin recargar todo el documento. Además de construir la URL con el identificador de la marca, envía el objeto de marca mediante `state={{ marca }}`. La página `Gafas` recupera ese dato con `useLocation`. Si alguien abre directamente la URL, puede no existir ese estado; por eso el título de la página también puede mostrar el identificador obtenido de la URL.

## Hooks utilizados

En este proyecto se utilizan dos hooks de React: `useState` y `useEffect`. También se usan `useParams` y `useLocation`, que son hooks de React Router DOM, no de React.

### `useState`: datos que cambian

`useState` guarda un valor entre renderizados. Devuelve el valor actual y una función para actualizarlo. Al llamar a esa función, React guarda el nuevo valor y vuelve a renderizar el componente para mostrarlo.

En `Marcas` y `Gafas` se declaran tres estados cada una:

| Estado | Valor inicial | Uso |
| --- | --- | --- |
| `marcas` / `gafas` | `[]` | Guarda el array que devuelve la API. Luego se recorre con `.map()` para crear una tarjeta por elemento. |
| `cargando` | `true` | Indica que la petición está en curso. Mientras sea `true`, se muestra el spinner de Bootstrap. |
| `error` | `null` | Guarda el mensaje si falla la petición. Si conserva el valor `null`, no hay un error registrado. |

Cuando llega la respuesta, `setMarcas(data)` o `setGafas(data)` actualiza el array correspondiente. `setCargando(false)` indica que la petición ya terminó. Si hay un fallo, `setError(e.message)` guarda el mensaje que se presenta en pantalla.

**“No hay datos” no es un cuarto estado.** Se comprueba en el propio array, después de comprobar que la carga terminó y que no hubo error: `marcas.length === 0` o `gafas.length === 0`. Ese orden evita mostrar el mensaje de lista vacía mientras la petición sigue en curso, cuando el array todavía está vacío porque aún no se ha recibido la respuesta.

### `useEffect`: efectos secundarios

`useEffect` permite ejecutar una operación que interactúa con algo externo al renderizado, como una petición HTTP. En estas páginas inicia la carga de datos y actualiza los estados cuando la promesa se resuelve o falla.

#### En `Marcas`: array de dependencias vacío

El efecto de `Marcas.jsx` termina con `[]`:

```jsx
useEffect(() => {
  getMarcas()
    .then((data) => {
      setMarcas(data);
    })
    .catch((e) => setError(e.message))
    .finally(() => setCargando(false));
}, []);
```

El array vacío significa que el efecto no depende de ningún valor cambiante del componente. La petición se inicia cuando se monta la página. **No hay una condición `if` que decida si cargar las marcas**: es el array vacío de dependencias el que indica que no se repita por cambios de estado o props. En desarrollo, `StrictMode` puede realizar una ejecución adicional de comprobación.

#### En `Gafas`: dependencia `idmarca`

El efecto de `Gafas.jsx` termina con `[idmarca]`:

```jsx
useEffect(() => {
  setCargando(true);
  getGafasByMarca(idmarca)
    .then((data) => {
      setGafas(data);
    })
    .catch((e) => setError(e.message))
    .finally(() => setCargando(false));
}, [idmarca]);
```

Aquí tampoco existe una condición `if`. `idmarca` es una dependencia del efecto: este se ejecuta al montar la página y vuelve a ejecutarse si cambia el identificador de marca. Así la petición corresponde siempre al `idmarca` actual.

La diferencia, por tanto, es `[]` en Marcas frente a `[idmarca]` en Gafas. En el primer caso no hay valores de la pantalla de los que dependa el efecto; en el segundo, sí depende del identificador.

### Hooks de React Router

- `useParams()` lee los parámetros dinámicos de la ruta. `Gafas` lo usa para obtener `idmarca` de `/marca/:idmarca/gafas`.
- `useLocation()` devuelve información de la ubicación actual. `Gafas` obtiene `state` y lee `state?.marca`, el objeto opcional enviado por `CardMarca`. El operador `?.` evita un error si `state` o `marca` no existen.

## Peticiones a la API

`src/service/api.js` centraliza la dirección base de la API y las funciones de acceso:

- `getMarcas()` solicita `GET /marcas` y devuelve `datos.marcas`.
- `getGafasByMarca(idmarca)` solicita `GET /marca/{idmarca}/gafas` y devuelve `datos.gafas`.

Las dos funciones son `async`. Usan `await` para esperar la respuesta de `fetch` y para convertirla a JSON. Antes de procesar el JSON comprueban `respuesta.ok`; si la respuesta HTTP indica un error, lanzan una excepción con un mensaje. En las páginas, `.catch()` recibe el fallo y guarda su mensaje en `error`. `.finally()` se ejecuta tanto si la petición tiene éxito como si falla, y pone `cargando` a `false`.

### Renderizado condicional en las páginas

`Marcas.jsx` y `Gafas.jsx` utilizan el operador lógico `&&` para mostrar contenido solo cuando se cumple una condición. En JSX, la forma `{condicion && (contenido)}` hace que React renderice `contenido` si la condición es verdadera. Por ejemplo, `{cargando && (...)}` muestra el spinner mientras se cargan los datos; también se usa para mostrar los errores y los mensajes cuando no hay marcas o gafas disponibles. Las tarjetas se generan recorriendo los arrays con `.map()`, y `key={marca.id}` y `key={gafa.id}` permiten a React identificar cada elemento de la lista.

## Componentes de interfaz

- `Header` muestra el logo y la imagen de cabecera importados desde `src/assets/`.
- `Footer` muestra el pie común de la aplicación.
- `CardMarca` presenta la imagen y el nombre de una marca. También contiene el enlace a sus gafas y pasa la marca en el estado de navegación.
- `CardGafa` presenta la imagen, el nombre y el precio de una gafa.
- `Marcas` y `Gafas` coordinan las peticiones, los estados de pantalla y el listado de tarjetas.

Las páginas usan clases de Bootstrap para contenedores, filas, columnas, tarjetas, alertas y spinners. Las rutas base `IMG_MARCAS` e `IMG_GAFAS`, exportadas desde `api.js`, se usan para construir las URL de las imágenes de marcas y gafas.
