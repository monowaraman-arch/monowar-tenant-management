import { Search, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppHeader } from '../components/AppHeader';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useTenants } from '../contexts/TenantContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { toast } from 'sonner';

export const TenantDirectory = () => {
  const navigate = useNavigate();
  const { tenants, deleteTenant } = useTenants();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'partial':
        return 'bg-orange-500/10 text-orange-700 border-orange-200';
      case 'due':
        return 'bg-red-500/10 text-red-700 border-red-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'partial':
        return 'Partial';
      case 'due':
        return 'Due';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      <main className="app-container motion-page py-6 md:py-8">
        <section className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">Tenant Directory</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
              Tenants
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-500 md:text-base">
              Browse every tenant in a simple list. Click any row to open that tenant profile.
            </p>
          </div>

          <div className="relative md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tenant, room, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl border-gray-200 bg-white pl-10"
            />
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 md:grid">
            <span>Tenant</span>
            <span>Room</span>
            <span>Status</span>
            <span>Due</span>
            <span className="text-right">Action</span>
          </div>

          {filteredTenants.length === 0 ? (
            <div className="p-10 text-center">
              <Users className="mx-auto mb-3 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">No tenants found</p>
              <p className="mt-1 text-sm text-gray-400">Try a different search term.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredTenants.map((tenant) => (
                <div
                  key={tenant.id}
                  onClick={() => navigate(`/tenant/${tenant.id}`)}
                  className="grid cursor-pointer gap-4 px-5 py-4 transition-colors hover:bg-gray-50 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] md:items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-950">{tenant.name}</p>
                    <p className="mt-1 text-sm text-gray-500">{tenant.phone}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400 md:hidden">Room</p>
                    <p className="text-sm font-medium text-gray-900">{tenant.roomNumber}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400 md:hidden">Status</p>
                    <Badge className={`${getStatusColor(tenant.paymentStatus)} border font-medium`}>
                      {getStatusText(tenant.paymentStatus)}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400 md:hidden">Due</p>
                    <p className={`text-sm font-semibold ${tenant.dueAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      BDT {tenant.dueAmount}
                    </p>
                  </div>

                  <div className="flex justify-start md:justify-end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={(event) => event.stopPropagation()}
                          className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent onClick={(event) => event.stopPropagation()}>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Tenant</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {tenant.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              deleteTenant(tenant.id);
                              toast.success('Tenant deleted successfully');
                            }}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
