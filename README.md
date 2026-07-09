# MalpisaTraslados

Aplicación web para gestionar traslados de productos entre sucursales. Permite iniciar movimientos, confirmar recepciones, consultar historial y administrar accesos de empleados según el rol del usuario.

## Funcionalidades

- Inicio de sesión con Firebase Authentication.
- Registro de traslados entre sucursales.
- Confirmación de recepciones pendientes por tienda.
- Historial de traslados confirmados con filtros.
- Alta de empleados desde una vista exclusiva para administradores.
- Persistencia en Firestore en tiempo real.

## Stack

- React 19
- Vite 8
- React Router DOM 7
- Firebase Authentication
- Cloud Firestore
- Tailwind CSS 4
- ESLint

## Estructura principal

- `src/pages`: vistas principales del sistema.
- `src/components`: componentes reutilizables de UI y layout.
- `src/services`: acceso a datos y operaciones sobre Firebase.
- `src/hooks`: lógica compartida y estado derivado.
- `src/context`: contexto global de autenticación.
- `src/utils`: utilidades de fechas, filtros y agrupación.
- `src/config/firebase.js`: inicialización de Firebase con variables de entorno.

## Flujo del sistema

1. El usuario inicia sesión.
2. El sistema consulta su perfil en la colección `usuarios`.
3. Se registra un traslado con origen, destino y productos.
4. La sucursal destino visualiza los traslados pendientes.
5. Al confirmar la recepción, el traslado cambia a `confirmado`.
6. Los traslados confirmados quedan disponibles en el historial.

## Instalación

```bash
npm install
npm run dev
```

La app se ejecuta por defecto en `http://localhost:5173`.

## Configuración de entorno

La configuración de Firebase ya no está hardcodeada. El proyecto usa variables de entorno de Vite a través de `import.meta.env`.

1. Crea un archivo `.env.local` en la raíz del proyecto.
2. Agrega las variables con prefijo `VITE_`.
3. Reinicia el servidor de desarrollo si ya estaba corriendo.

Variables esperadas:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Notas importantes:

- Usa `.env.example` como plantilla compartible del proyecto.
- No subas `.env` ni `.env.local` al repositorio.
- En despliegue, estas variables deben configurarse también en la plataforma de hosting.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Firebase

La inicialización está centralizada en `src/config/firebase.js` y consume `import.meta.env` para construir `firebaseConfig`.

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

- El historial de traslados confirmados puede requerir índices en Firestore según los filtros usados.
- El proyecto utiliza datos en tiempo real mediante `onSnapshot`.
- Si cambias la configuración de Firebase, asegúrate de mantener sincronizados `.env.example`, `.env.local` y la plataforma de despliegue.