import { Phone, DoorOpen } from 'lucide-react';
import { Tenant } from '../contexts/TenantContext';
import { Badge } from './ui/badge';

interface TenantCardProps {
  tenant: Tenant;
  onClick: () => void;
}

export const TenantCard = ({ tenant, onClick }: TenantCardProps) => {
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
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer md:p-5"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate md:text-lg">{tenant.name}</h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{tenant.phone}</span>
          </div>
        </div>
        <Badge className={`${getStatusColor(tenant.paymentStatus)} border font-medium flex-shrink-0`}>
          {getStatusText(tenant.paymentStatus)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2 text-sm min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <DoorOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 font-medium">Room/Flat</p>
            <p className="font-semibold text-gray-900 truncate">{tenant.roomNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm min-w-0">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold leading-none text-green-600">৳</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 font-medium">Rent</p>
            <p className="font-semibold text-gray-900 truncate">BDT {tenant.monthlyRent}</p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-gray-600 font-medium">Due Amount:</span>
          <span className={`font-bold text-sm ${tenant.dueAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
            BDT {tenant.dueAmount}
          </span>
        </div>
      </div>
    </button>
  );
};
