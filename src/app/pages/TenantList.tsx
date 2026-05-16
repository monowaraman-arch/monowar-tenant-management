import { Plus, Users, DollarSign, AlertCircle, Search, Home, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTenants } from '../contexts/TenantContext';
import { TenantCard } from '../components/TenantCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
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
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 pt-6 pb-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Tenant Manager</h1>
          <p className="text-blue-100 text-sm">Manage your properties efficiently</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Tenants</p>
                <p className="text-xl font-bold text-gray-900">{totalTenants}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Monthly Rent</p>
                <p className="text-xl font-bold text-gray-900">৳{totalRent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Due</p>
                <p className="text-xl font-bold text-gray-900">৳{totalDue}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Due</p>
                <p className="text-xl font-bold text-gray-900">{dueCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200 rounded-xl"
          />
        </div>

        {/* Tenants List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">All Tenants</h2>
            <span className="text-sm text-gray-500">{filteredTenants.length} tenant(s)</span>
          </div>

          <div className="space-y-3">
            {filteredTenants.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center">
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
        </div>

        {/* Bottom padding for navigation */}
        <div className="h-20" />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-blue-600">
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => navigate('/add')}
            className="flex flex-col items-center gap-1 -mt-8"
          >
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Plus className="w-7 h-7 text-white" />
            </div>
          </button>
          
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Settings className="w-6 h-6" />
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};