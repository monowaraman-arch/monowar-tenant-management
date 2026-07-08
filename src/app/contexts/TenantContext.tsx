import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  roomNumber: string;
  location: string;
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
      name: 'Tenant#1',
      phone: '+880 1712-345678',
      email: 'tenant1@example.com',
      maritalStatus: 'single',
      roomNumber: 'A-101',
      location: 'Mirpur, Dhaka',
      monthlyRent: 20000,
      dueAmount: 0,
      paymentStatus: 'paid',
      entryDate: '2024-01-15',
      notes: 'Sample tenant record.',
    },
    {
      id: '2',
      name: 'Tenant#2',
      phone: '+880 1812-345678',
      email: 'tenant2@example.com',
      maritalStatus: 'married',
      roomNumber: 'B-205',
      location: 'Uttara, Dhaka',
      monthlyRent: 20000,
      dueAmount: 10000,
      paymentStatus: 'partial',
      entryDate: '2023-11-20',
      notes: 'Sample tenant record with partial payment.',
    },
    {
      id: '3',
      name: 'Tenant#3',
      phone: '+880 1912-345678',
      email: 'tenant3@example.com',
      maritalStatus: 'single',
      roomNumber: 'C-303',
      location: 'Dhanmondi, Dhaka',
      monthlyRent: 20000,
      dueAmount: 20000,
      paymentStatus: 'due',
      entryDate: '2023-08-10',
      notes: 'Sample tenant record with due rent.',
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
