import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Phone, Mail, Heart, MapPin, DoorOpen, Calendar, FileText, Edit2, Trash2 } from 'lucide-react';
import { useTenants } from '../contexts/TenantContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { AppHeader } from '../components/AppHeader';
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

  const getMaritalStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = () => {
    deleteTenant(tenant.id);
    toast.success('Tenant deleted successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      <main className="app-container motion-page py-6 md:py-8">
        <section className="mb-6">
          <div className="mb-4 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="-ml-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <p className="text-sm font-medium text-blue-700">Tenant Profile</p>
              <h1 className="text-2xl font-bold text-gray-950 md:text-3xl">Tenant Details</h1>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-950 md:text-3xl">{tenant.name}</h2>
                <p className="text-gray-500 text-sm mt-1 md:text-base">Room {tenant.roomNumber}</p>
              </div>
              <Badge className={`${getStatusColor(tenant.paymentStatus)} border w-fit`}>
                {getStatusText(tenant.paymentStatus)}
              </Badge>
            </div>
          </div>
        </section>

        <section className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
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

              {tenant.email && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{tenant.email}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Marital Status</p>
                  <p className="text-sm font-medium text-gray-900">
                    {getMaritalStatusText(tenant.maritalStatus)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 md:row-span-2">
            <h3 className="font-semibold text-gray-900 mb-4">Flat & Payment Details</h3>

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

              {tenant.location && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900">{tenant.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600">৳</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Monthly Rent</p>
                  <p className="text-sm font-medium text-gray-900">BDT {tenant.monthlyRent.toFixed(2)}</p>
                </div>
              </div>

              {tenant.dueAmount > 0 && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-red-600">৳</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-red-600">Due Amount</p>
                    <p className="text-sm font-semibold text-red-700">BDT {tenant.dueAmount.toFixed(2)}</p>
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

          {tenant.notes && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold text-gray-900">Notes</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{tenant.notes}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2 md:col-span-2 md:justify-end">
            <Button
              onClick={() => navigate(`/edit/${tenant.id}`)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl md:flex-none md:min-w-40"
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
        </section>
      </main>
    </div>
  );
};
