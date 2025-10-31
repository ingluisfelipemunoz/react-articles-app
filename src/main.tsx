import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppProviders } from './app/providers.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router';

async function enableMocking() {
  if(import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser.ts");
    return worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js"
      },
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router}/>
    </AppProviders>
  </StrictMode>,
)
});
