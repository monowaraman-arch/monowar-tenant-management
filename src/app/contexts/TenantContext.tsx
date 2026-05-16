import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  roomNumber: string;
  monthlyRent: number;
  dueAmount: number;
  paymentStatus: 'paid' | 'partial' | 'due';
  entryDate: string;
  notes: string;
}

interface TenantContextType {
  tenants: Tenant[];
  addTenant: (tenant: Omit<Tenant, 'id'>) => void;
  updateTenant: (id: string, tenant: Omit<Tenant, 'id'>) => void;
  deleteTenant: (id: string) => void;
  getTenant: (id: string) => Tenant | undefined;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const useTenants = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenants must be used within a TenantProvider');
  }
  return context;
};

export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      roomNumber: 'A-101',
      monthlyRent: 1200,
      dueAmount: 0,
      paymentStatus: 'paid',
      entryDate: '2024-01-15',
      notes: 'Excellent tenant, always pays on time.',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+1 (555) 234-5678',
      roomNumber: 'B-205',
      monthlyRent: 1500,
      dueAmount: 1500,
      paymentStatus: 'partial',
      entryDate: '2023-11-20',
      notes: 'Payment due in 5 days.',
    },
    {
      id: '3',
      name: 'Michael Davis',
      phone: '+1 (555) 345-6789',
      roomNumber: 'C-303',
      monthlyRent: 1350,
      dueAmount: 2700,
      paymentStatus: 'due',
      entryDate: '2023-08-10',
      notes: 'Payment overdue by 15 days. Follow up needed.',
    },
    {
      id: '4',
      name: 'Emily Wilson',
      phone: '+1 (555) 456-7890',
      roomNumber: 'A-102',
      monthlyRent: 1100,
      dueAmount: 0,
      paymentStatus: 'paid',
      entryDate: '2024-03-01',
      notes: 'New tenant, recently moved in.',
    },
  ]);

  const addTenant = (tenant: Omit<Tenant, 'id'>) => {
    const newTenant: Tenant = {
      ...tenant,
      id: Date.now().toString(),
    };
    setTenants([...tenants, newTenant]);
  };

  const updateTenant = (id: string, tenant: Omit<Tenant, 'id'>) => {
    setTenants(tenants.map((t) => (t.id === id ? { ...tenant, id } : t)));
  };

  const deleteTenant = (id: string) => {
    setTenants(tenants.filter((t) => t.id !== id));
  };

  const getTenant = (id: string) => {
    return tenants.find((t) => t.id === id);
  };

  return (
    <TenantContext.Provider
      value={{ tenants, addTenant, updateTenant, deleteTenant, getTenant }}
    >
      {children}
    </TenantContext.Provider>
  );
};