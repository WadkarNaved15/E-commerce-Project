'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, User, Package, Heart, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function AccountPageContent() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/getorders", { credentials: "include" });
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load your orders.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);
 
useEffect(() => {
  console.log("isAuthenticated",isAuthenticated)
  if (!isAuthenticated) {
    router.push('/login');
  }
}, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      logout(); // AuthContext handles everything
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Logout failed');
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'In Transit':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
        {/* Title */}
        <h1 className="text-4xl font-serif font-bold text-luxury-navy order-1">
          My Account
        </h1>

        {/* Add Product Button (Make this order-2 on small screens) */}
        {role === 'admin' && (
          <Link href="/admin/add-product">
            <button
              className="flex items-center justify-center space-x-2 bg-luxury-gold text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors w-full sm:w-auto order-2 sm:order-2"
            // Changed order-3 to order-2
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </Link>
        )}

        {/* Logout Button (Make this order-3 on small screens) */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors self-start sm:self-auto order-3 sm:order-3"
        // Changed order-2 to order-3
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      <Tabs defaultValue="orders" className="w-full">

        <TabsContent value="orders">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-serif font-bold text-luxury-navy mb-6">
                Order History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-luxury-gray">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Order #
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Items
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                        Total
                      </th>
                       <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">

                    {loadingOrders ? (
                      <tr>
                        <td colSpan={7} className="text-center py-6 text-gray-500">
                          Loading your orders...
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-6 text-gray-500">
                          No orders found.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-luxury-gray transition-colors cursor-pointer">
                          <td className="px-4 py-4 text-sm font-medium text-luxury-navy">#{order.id}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                order.status || "Processing"
                              )}`}
                            >
                              {order.status || "Processing"}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {order.items.length} item{order.items.length > 1 ? "s" : ""}
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-luxury-navy text-right">
                            ${order.totalAmount.toLocaleString()}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 text-right">{order.shippingName}</td>
                        </tr>
                      ))
                    )}

                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <AccountPageContent />
    </ProtectedRoute>
  );
}
