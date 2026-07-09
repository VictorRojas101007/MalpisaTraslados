# MalpisaTraslados

Aplicación web para gestionar traslados de productos entre sucursales. Permite iniciar movimientos, confirmar recepciones, consultar historial y administrar accesos de empleados según el rol del usuario.

## Funcionalidades

- Inicio de sesión con Firebase Authentication.
- Creación de traslados entre sucursales.
- Confirmación de traslados pendientes por tienda.
- Historial de traslados confirmados con filtros por fecha, origen y destino.
- Alta de empleados desde una vista restringida para administradores.
- Persistencia en Firestore en tiempo real.

## Stack

- React 19
- Vite 8
- React Router DOM 7
- Firebase Auth
- Cloud Firestore
- Tailwind CSS 4
- ESLint

## Estructura principal

- `src/pages`: pantallas principales como login, dashboard, historial, pendientes y alta de empleados.
- `src/components`: componentes de layout, formularios, tarjetas y UI reutilizable.
- `src/services`: acceso a Firebase para usuarios y traslados.
- `src/hooks`: lógica de consulta y estado derivado.
- `src/context`: contexto global de autenticación.
- `src/utils`: formateo de fechas y agrupación de resultados.
- `src/config/firebase.js`: inicialización de Firebase.

## Flujo del sistema

1. El usuario inicia sesión.
2. El sistema carga su perfil desde la colección `usuarios`.
3. Se puede registrar un nuevo traslado indicando origen, destino y productos.
4. La sucursal destino visualiza los traslados pendientes.
5. Al confirmar la recepción, el traslado pasa a estado `confirmado`.
6. Los traslados confirmados aparecen en el historial filtrable.

## Instalación

```bash
npm install
npm run dev
```

La app se ejecuta por defecto en `http://localhost:5173`.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Firebase

Actualmente la configuración de Firebase está definida en `src/config/firebase.js`.

Colecciones utilizadas:

- `usuarios`: perfil del empleado, tienda asignada y rol.
- `traslados`: movimientos entre sucursales, estado, fechas y usuarios involucrados.

## Rutas principales

- `/login`: acceso al sistema.
- `/`: creación de nuevo traslado.
- `/dashboard`: panel principal.
- `/traslados-pendientes`: confirmación de recepciones.
- `/historial-traslados`: consulta histórica.
- `/register`: alta de empleados.

## Roles

- `admin`: puede dar de alta empleados y eliminar traslados desde el historial.
- `empleado`: puede operar traslados según su sucursal asignada.

## Notas

- El historial consulta traslados confirmados y puede requerir índices en Firestore según los filtros usados.
- El proyecto usa datos en tiempo real mediante `onSnapshot`.
- Si se quiere mejorar la seguridad, conviene mover las credenciales de Firebase a variables de entorno.
