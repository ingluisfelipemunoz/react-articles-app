# Articles App

Aplicación web para gestión de artículos construida con React, TypeScript y Vite.

## 📋 Tabla de Contenidos

- [Decisiones Técnicas de Arquitectura](#decisiones-técnicas-de-arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [Compilación](#compilación)
- [Testing](#testing)
- [Tecnologías](#tecnologías)

## 🏗️ Decisiones Técnicas de Arquitectura

### Arquitectura por Features (Vertial Feature Slice)

El proyecto sigue una arquitectura modular basada en **features** (características), donde cada feature es un módulo autocontenido con su propia lógica de negocio, UI y adaptadores.

**Estructura de cada feature:**
```
features/
  └── [feature-name]/
      ├── domain/          # Tipos y reglas de negocio (puro, sin dependencias)
      ├── application/     # Casos de uso y hooks (lógica de aplicación)
      ├── adapters/        # Adaptadores externos
      │   ├── http/        # Servicios HTTP
      │   ├── storage/     # Persistencia local
      │   └── ui/          # Componentes y páginas
      └── store/           # Estado global específico del feature (Redux slices)
```

**Ventajas:**
- **Escalabilidad**: Fácil agregar nuevas features sin afectar existentes
- **Mantenibilidad**: Código organizado y fácil de encontrar
- **Testabilidad**: Cada feature puede probarse independientemente
- **Separación de responsabilidades**: Capas claras (domain, application, adapters)

### Gestión de Estado

**Redux Toolkit** para estado global:
- Estado de UI (tema, favoritos, rating, etc.)
- Estado de autenticación
- Favoritos y ratings (persistencia local)

**React Query (TanStack Query)** para estado del servidor:
- Caché automático de datos
- Gestión de loading/error states
- Invalidación y refetching inteligente
- Optimistic updates

**Razón**: Separación clara entre estado de UI (Redux) y estado de servidor (React Query), aprovechando las fortalezas de cada librería.

### Routing

**React Router v7** con rutas declarativas y protección de rutas mediante `RequireAuth` HOC.

### Validación y Formularios

- **React Hook Form**: Manejo eficiente de formularios
- **Zod**: Validación de esquemas con TypeScript
- **@hookform/resolvers**: Integración entre React Hook Form y Zod

### Estilos

**Tailwind CSS v4** con configuración mediante Vite plugin:
- Utilidades CSS-first
- Diseño responsive
- Dark mode mediante sistema de temas

### Mocking en Desarrollo

**MSW (Mock Service Worker)** para simular APIs en desarrollo:
- Intercepta requests HTTP
- Permite desarrollo sin backend
- Mismo código de mocking para tests E2E

### Testing

- **Jest + Testing Library**: Tests unitarios y de integración
- **Cypress**: Tests end-to-end
- **MSW**: Mocking en tests

## 📁 Estructura del Proyecto

```
articles-app/
├── src/
│   ├── app/                    # Configuración global (store, providers, hooks)
│   ├── features/               # Features de la aplicación
│   │   ├── articles/           # Feature de artículos
│   │   │   ├── domain/        # Tipos y reglas de negocio
│   │   │   ├── application/    # Hooks y casos de uso
│   │   │   ├── adapters/      # Adaptadores (http, storage, ui)
│   │   │   └── store/         # Redux slices
│   │   └── auth/              # Feature de autenticación
│   ├── routes/                 # Configuración de rutas
│   ├── shared/                 # Componentes y utilidades compartidas
│   ├── mocks/                  # Handlers y datos de MSW
│   └── tests/                  # Configuración de tests
├── cypress/                    # Tests E2E
├── infrastructure/             # AWS CDK para deployment
└── public/                     # Assets estáticos
```

## 🚀 Guía de Desarrollo

### Prerrequisitos

- **Node.js** >= 18.x
- **npm** >= 9.x

### Instalación

```bash
# Instalar dependencias
npm install
```

### Modo Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

**Características del modo desarrollo:**
- Hot Module Replacement (HMR) activo
- MSW activado para mockear APIs
- DevTools de Redux habilitadas
- Source maps para debugging

## 📦 Compilación

### Build de Producción

```bash
# Compilar la aplicación
npm run build
```

Este comando:
1. Verifica tipos TypeScript (`tsc -b`)
2. Compila y optimiza con Vite
3. Genera los archivos en `dist/`

### Preview del Build

```bash
# Previsualizar el build de producción localmente
npm run preview
```

## 🧪 Testing

### Tests Unitarios e Integración (Jest)

```bash
# Ejecutar todos los tests
npm test

# Modo watch (re-ejecuta al cambiar archivos)
npm run test:watch
```

**Configuración:**
- Entorno: `jsdom` (simula navegador)
- Setup: `src/tests/setupTests.ts`
- Patterns: `**/?(*.)+(spec|test).[tj]s?(x)`

**Ejemplo de test:**
```typescript
import { render, screen } from '@testing-library/react';
import { ArticleCard } from './ArticleCard';

describe('ArticleCard', () => {
  it('should render article title', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('Article Title')).toBeInTheDocument();
  });
});
```

### Tests End-to-End (Cypress)

#### Abrir Cypress UI

```bash
# Abrir la interfaz gráfica de Cypress
npm run cypress:open
```

**Nota importante**: Asegúrate de tener el servidor de desarrollo corriendo (`npm run dev`) antes de ejecutar los tests E2E.

**Desde la UI de Cypress:**
1. Selecciona el tipo de test (E2E Testing)
2. Elige el navegador (Chrome, Edge, Firefox)
3. Selecciona el test que deseas ejecutar

#### Ejecutar Tests E2E en Headless

```bash
# Ejecutar todos los tests E2E en modo headless
npm run cypress:run
```

**Tests E2E disponibles:**
- `create_and_rate.cy.ts`: Creación de artículos y sistema de ratings
- `error_404_500.cy.ts`: Manejo de errores
- `theme_toggle.cy.ts`: Toggle de tema claro/oscuro

**Configuración:**
- Base URL: `http://localhost:5173`
- Specs: `cypress/e2e/**/*.cy.{js,ts}`
- Support: `cypress/support/e2e.ts`

### MSW en Tests

Los tests utilizan MSW para mockear las APIs. Los handlers están en `src/mocks/handlers.ts` y se configuran automáticamente en el setup de tests.

## 🛠️ Tecnologías

### Core
- **React 19.1**: Librería UI
- **TypeScript 5.9**: Tipado estático
- **Vite 7.1**: Build tool y dev server

### Estado y Datos
- **Redux Toolkit 2.9**: Estado global
- **React Query 5.90**: Estado del servidor y caché
- **Axios 1.13**: Cliente HTTP

### UI y Estilos
- **Tailwind CSS 4.1**: Framework CSS
- **React Router 7.9**: Routing

### Formularios y Validación
- **React Hook Form 7.65**: Gestión de formularios
- **Zod 4.1**: Validación de esquemas

### Testing
- **Jest 30.2**: Testing framework
- **Testing Library 16.3**: Utilidades de testing
- **Cypress 15.5**: Testing E2E
- **MSW 2.11**: Mocking de APIs

### Desarrollo
- **ESLint 9.38**: Linter
- **Prettier 3.6**: Formateo de código
- **TypeScript ESLint 8.46**: Reglas TypeScript

### Infraestructura
- **AWS CDK**: Infraestructura como código (ver `infrastructure/README.md`)

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
npm run format       # Formatear código con Prettier
npm test             # Ejecutar tests Jest
npm run test:watch   # Jest en modo watch
npm run cypress:open # Abrir Cypress UI
npm run cypress:run  # Ejecutar Cypress en headless
```

## 🔧 Configuración Adicional

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto para variables de entorno:

```env
VITE_API_URL=http://localhost:3000/api
```

### MSW Worker

El service worker de MSW se genera automáticamente en `public/mockServiceWorker.js`. Si necesitas regenerarlo:

```bash
npx msw init public/ --save
```

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev)
- [React Query Docs](https://tanstack.com/query/latest)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Vite Docs](https://vite.dev)
- [Cypress Docs](https://docs.cypress.io)
- [MSW Docs](https://mswjs.io)
