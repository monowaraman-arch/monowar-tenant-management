import { RouterProvider } from 'react-router';
import { router } from './routes';
import { TenantProvider } from './contexts/TenantContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <TenantProvider>
      <RouterProvider router={router} />
      <Toaster />
    </TenantProvider>
  );
}
