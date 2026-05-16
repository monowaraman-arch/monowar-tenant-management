import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Phone, Mail, DoorOpen, DollarSign, Calendar, FileText, Edit2, Trash2 } from 'lucide-react';
import { useTenants } from '../contexts/TenantContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
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

export const TenantDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTenant, deleteTenant } = useTenants();

  const tenant = getTenant(id || '');

  if (!tenant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Tenant not found</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleDelete = () => {
    deleteTenant(tenant.id);
    toast.success('Tenant deleted successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10 -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Tenant Details</h1>
          </div>
          
          {/* Tenant Name Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{tenant.name}</h2>
                <p className="text-blue-100 text-sm mt-1">Room {tenant.roomNumber}</p>
              </div>
              <Badge className={`${getStatusColor(tenant.paymentStatus)} border`}>
                {getStatusText(tenant.paymentStatus)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="text-sm font-medium text-gray-900">{tenant.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Room & Payment Details */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Room & Payment Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <DoorOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Room/Flat Number</p>
                <p className="text-sm font-medium text-gray-900">{tenant.roomNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Monthly Rent</p>
                <p className="text-sm font-medium text-gray-900">৳{tenant.monthlyRent.toFixed(2)}</p>
              </div>
            </div>

            {tenant.dueAmount > 0 && (
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-red-600">Due Amount</p>
                  <p className="text-sm font-semibold text-red-700">৳{tenant.dueAmount.toFixed(2)}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Entry Date</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(tenant.entryDate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {tenant.notes && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <h3 className="font-semibold text-gray-900">Notes</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{tenant.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={() => navigate(`/edit/${tenant.id}`)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Tenant
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Tenant</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {tenant.name}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};