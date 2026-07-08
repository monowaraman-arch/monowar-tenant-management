import { Plus, Users, AlertCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTenants } from '../contexts/TenantContext';
import { TenantCard } from '../components/TenantCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { AppHeader } from '../components/AppHeader';
import { useState } from 'react';

export const TenantList = () => {
  const navigate = useNavigate();
  const { tenants } = useTenants();
  const [searchQuery, setSearchQuery] = useState('');

  const totalTenants = tenants.length;
  const totalRent = tenants.reduce((sum, t) => sum + t.monthlyRent, 0);
  const totalDue = tenants.reduce((sum, t) => sum + t.dueAmount, 0);
  const dueCount = tenants.filter((t) => t.paymentStatus === 'due').length;

  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      <main className="app-container motion-page py-6 md:py-8">
        <section className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
              Tenant Manager
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-500 md:text-base">
              Manage tenants, rooms, rent collection, and outstanding dues from one organized workspace.
            </p>
          </div>

          <Button
            onClick={() => navigate('/add')}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 md:w-auto"
          >
            <Plus className="w-4 h-4" />
            Add Tenant
          </Button>
        </section>

        <section className="grid grid-cols-2 gap-3 mb-6 lg:grid-cols-4 md:gap-4">
          <div className="motion-card bg-white rounded-2xl p-4 shadow-sm border border-gray-100 md:p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center md:w-12 md:h-12">
                <Users className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Tenants</p>
                <p className="text-xl font-bold text-gray-900 md:text-2xl">{totalTenants}</p>
              </div>
            </div>
          </div>

          <div className="motion-card bg-white rounded-2xl p-4 shadow-sm border border-gray-100 md:p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center md:w-12 md:h-12">
                <span className="text-xl font-bold text-green-600 md:text-2xl">৳</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Monthly Rent</p>
                <p className="text-xl font-bold text-gray-900 md:text-2xl">BDT {totalRent}</p>
              </div>
            </div>
          </div>

          <div className="motion-card bg-white rounded-2xl p-4 shadow-sm border border-gray-100 md:p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center md:w-12 md:h-12">
                <AlertCircle className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Due</p>
                <p className="text-xl font-bold text-gray-900 md:text-2xl">BDT {totalDue}</p>
              </div>
            </div>
          </div>

          <div className="motion-card bg-white rounded-2xl p-4 shadow-sm border border-gray-100 md:p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center md:w-12 md:h-12">
                <AlertCircle className="w-5 h-5 text-orange-600 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Due Tenants</p>
                <p className="text-xl font-bold text-gray-900 md:text-2xl">{dueCount}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-5">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 md:text-2xl">All Tenants</h2>
              <p className="text-sm text-gray-500">{filteredTenants.length} tenant(s)</p>
            </div>

            <div className="relative md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 md:gap-4">
            {filteredTenants.length === 0 ? (
              <div className="rounded-2xl bg-gray-50 p-8 text-center md:col-span-2 xl:col-span-3">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No tenants found</p>
                <p className="text-sm text-gray-400 mt-1">
                  {searchQuery ? 'Try a different search term' : 'Add your first tenant to get started'}
                </p>
              </div>
            ) : (
              filteredTenants.map((tenant) => (
                <TenantCard
                  key={tenant.id}
                  tenant={tenant}
                  onClick={() => navigate(`/tenant/${tenant.id}`)}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
