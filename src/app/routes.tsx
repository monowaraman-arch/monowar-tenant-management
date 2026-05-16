import { createBrowserRouter } from 'react-router';
import { TenantList } from './pages/TenantList';
import { AddTenant } from './pages/AddTenant';
import { TenantDetails } from './pages/TenantDetails';
import { EditTenant } from './pages/EditTenant';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: TenantList,
  },
  {
    path: '/add',
    Component: AddTenant,
  },
  {
    path: '/tenant/:id',
    Component: TenantDetails,
  },
  {
    path: '/edit/:id',
    Component: EditTenant,
  },
]);
