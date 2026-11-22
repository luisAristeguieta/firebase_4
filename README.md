# 📦 Taller Práctico 3 — Operaciones CREATE y READ con React, TypeScript y Cloud Firestore

> Actividad académica que implementa un sistema de inventario de productos conectado a **Cloud Firestore**, practicando las operaciones de escritura (`addDoc`) y lectura (`getDocs`) en una aplicación React + TypeScript + Vite.

## 🎯 Objetivo

Comprender el flujo de datos unidireccional entre componentes React y una base de datos NoSQL en la nube (Firestore), aplicando:

- **CREATE:** Capturar datos del formulario y persistirlos como documentos en una colección de Firestore.
- **READ:** Consultar la colección al montar el componente y renderizar la lista en la UI.

## 📐 Diagrama de Flujo

```
┌──────────────────────────────────────────────────────────────────────┐
│                        FLUJO CREATE                                 │
│                                                                     │
│  ProductoForm ──► crearProducto() ──► addDoc() ──► Firestore 🔥     │
│  (formulario)     (servicio)          (SDK)        (colección:       │
│                                                     "productos")    │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                         FLUJO READ                                  │
│                                                                     │
│  Firestore 🔥  ──► getDocs() ──► obtenerProductos() ──► ProductoLista│
│  (colección:       (SDK)         (servicio)              (tabla UI)  │
│   "productos")                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## 📁 Estructura del Proyecto

```
taller3-firebase-read/
├── Entregable/
│   ├── bd firestore.PNG           # Captura de la consola Firestore
│   └── Vista General.PNG          # Captura de la interfaz de la app
├── public/
│   └── image.png                  # Favicon personalizado
├── src/
│   ├── components/
│   │   ├── ProductoForm.tsx       # Formulario CREATE
│   │   ├── ProductoForm.css
│   │   ├── ProductoLista.tsx      # Lista READ
│   │   └── ProductoLista.css
│   ├── services/
│   │   └── productoService.ts     # Lógica Firestore (addDoc / getDocs)
│   ├── firebase.ts                # Inicialización de Firebase
│   ├── App.tsx                    # Componente raíz
│   ├── App.css
│   ├── index.css                  # Tokens de diseño y reset global
│   └── main.tsx                   # Entry point React
├── .env                           # Variables de entorno (no versionado)
├── DESIGN.md                      # Sistema de diseño visual (Craft Docs)
├── index.html                     # HTML con Google Fonts y favicon
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Tecnologías

| Tecnología | Versión | Rol |
|------------|---------|-----|
| React | 19.x | Librería de UI |
| TypeScript | 6.x | Tipado estático |
| Vite | 8.x | Bundler y dev server |
| Firebase | 13.x | Backend (Firestore) |

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone <https://github.com/luisAristeguieta/firebase_3>
cd taller3-firebase-read
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las credenciales de tu proyecto Firebase:

```env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
VITE_FIREBASE_APP_ID=tu-app-id
```

> **Nota:** El archivo `src/firebase.ts` actualmente usa las credenciales directamente. Para usar variables de entorno, actualiza la configuración usando `import.meta.env.VITE_FIREBASE_*`.

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### 5. Build de producción

```bash
npm run build
```

## 📸 Entregables

| Captura | Descripción |
|---------|-------------|
| ![Vista General](Entregable/Vista%20General.PNG) | Interfaz completa de la aplicación con el formulario de registro y la tabla de productos. |
| ![Base de Datos Firestore](Entregable/bd%20firestore.PNG) | Consola de Cloud Firestore mostrando la colección `productos` con los documentos registrados. |

## 📋 Componentes Principales

### `ProductoForm`
Formulario controlado con estados `nombre`, `precio` y `stock`. Al enviar, llama a `crearProducto()` del servicio, que ejecuta `addDoc()` para crear un documento en la colección `"productos"` de Firestore.

### `ProductoLista`
Al montarse (`useEffect`), llama a `obtenerProductos()` del servicio, que ejecuta `getDocs()` para obtener todos los documentos. Muestra la información en una tabla con columnas **Producto**, **Precio** y **Stock** (con badge de disponibilidad).

### `productoService.ts`
Capa de servicio que encapsula las operaciones de Firestore:
- `crearProducto(nombre, precio, stock)` → `addDoc()`
- `obtenerProductos()` → `getDocs()`
