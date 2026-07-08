import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useTenants } from '../contexts/TenantContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { AppHeader } from '../components/AppHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

export const AddTenant = () => {
  const navigate = useNavigate();
  const { addTenant, tenants } = useTenants();
  const nextTenantNumber = tenants.length + 1;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    maritalStatus: 'single' as 'single' | 'married' | 'divorced' | 'widowed',
    roomNumber: '',
    location: '',
    monthlyRent: '20000',
    dueAmount: '',
    paymentStatus: 'partial' as 'paid' | 'partial' | 'due',
    entryDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.roomNumber || !formData.monthlyRent) {
      toast.error('Please fill in all required fields');
      return;
    }

    addTenant({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      maritalStatus: formData.maritalStatus,
      roomNumber: formData.roomNumber,
      location: formData.location,
      monthlyRent: parseFloat(formData.monthlyRent),
      dueAmount: parseFloat(formData.dueAmount) || 0,
      paymentStatus: formData.paymentStatus,
      entryDate: formData.entryDate,
      notes: formData.notes,
    });

    toast.success('Tenant added successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      <main className="app-container motion-page py-6 md:py-8">
        <div className="mb-6 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="-ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <p className="text-sm font-medium text-blue-700">Tenant Registry</p>
            <h1 className="text-2xl font-bold text-gray-950 md:text-3xl">Add New Tenant</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-4">Personal Information</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={`e.g., Tenant#${nextTenantNumber}`}
                  className="mt-1.5 bg-gray-50 border-gray-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g., +880 1612-345678"
                  className="mt-1.5 bg-gray-50 border-gray-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g., tenant@example.com"
                  className="mt-1.5 bg-gray-50 border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="maritalStatus" className="text-gray-700">
                  Marital Status
                </Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value: 'single' | 'married' | 'divorced' | 'widowed') =>
                    setFormData({ ...formData, maritalStatus: value })
                  }
                >
                  <SelectTrigger className="mt-1.5 bg-gray-50 border-gray-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="entryDate" className="text-gray-700">
                  Entry Date
                </Label>
                <Input
                  id="entryDate"
                  type="date"
                  value={formData.entryDate}
                  onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
                  className="mt-1.5 bg-gray-50 border-gray-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-4">Flat & Payment Details</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="roomNumber" className="text-gray-700">
                  Room/Flat Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="roomNumber"
                  type="text"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  placeholder="e.g., A-101, Flat 205"
                  className="mt-1.5 bg-gray-50 border-gray-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-gray-700">
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Mirpur, Dhaka"
                  className="mt-1.5 bg-gray-50 border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="monthlyRent" className="text-gray-700">
                  Monthly Rent (BDT) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  step="0.01"
                  value={formData.monthlyRent}
                  onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                  placeholder="20000"
                  className="mt-1.5 bg-gray-50 border-gray-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="dueAmount" className="text-gray-700">
                  Due Amount (BDT)
                </Label>
                <Input
                  id="dueAmount"
                  type="number"
                  step="0.01"
                  value={formData.dueAmount}
                  onChange={(e) => setFormData({ ...formData, dueAmount: e.target.value })}
                  placeholder="0.00"
                  className="mt-1.5 bg-gray-50 border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="paymentStatus" className="text-gray-700">
                  Payment Status
                </Label>
                <Select
                  value={formData.paymentStatus}
                  onValueChange={(value: 'paid' | 'partial' | 'due') =>
                    setFormData({ ...formData, paymentStatus: value })
                  }
                >
                  <SelectTrigger className="mt-1.5 bg-gray-50 border-gray-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="due">Due</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-4">Additional Notes</h2>
            
            <div>
              <Label htmlFor="notes" className="text-gray-700">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional information about the tenant..."
                className="mt-1.5 bg-gray-50 border-gray-200 rounded-xl min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2 md:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1 rounded-xl border-gray-300 md:flex-none md:min-w-32"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl md:flex-none md:min-w-40"
            >
              Add Tenant
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};
