'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Package,
  ShoppingBag,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Truck,
  MessageSquare,
  AlertTriangle,
  RefreshCw,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { Product, Order, OrderStatus, CategorySlug } from '@/types';

const ADMIN_PASSCODE = 'manlyaura2026';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // New Product Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'fragrance' as CategorySlug,
    price: '',
    compareAtPrice: '',
    description: '',
    details: '',
    imageUrl: '',
    stock: '25',
    featured: false,
    badge: 'New Arrival'
  });

  // Tracking update state
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  // Check auth session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('ma_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, orderRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders')
      ]);
      const prodData = await prodRes.json();
      const orderData = await orderRes.json();
      setProducts(Array.isArray(prodData) ? prodData : []);
      setOrders(Array.isArray(orderData) ? orderData : []);
    } catch (e) {
      console.error('Failed to fetch admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('ma_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ma_admin_auth');
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          price: Number(newProduct.price),
          compareAtPrice: newProduct.compareAtPrice ? Number(newProduct.compareAtPrice) : undefined,
          description: newProduct.description,
          details: newProduct.details ? newProduct.details.split('\n') : [],
          images: [newProduct.imageUrl || 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80'],
          stock: Number(newProduct.stock) || 10,
          featured: newProduct.featured,
          badge: newProduct.badge || undefined
        })
      });

      if (res.ok) {
        setShowAddModal(false);
        setNewProduct({
          name: '',
          category: 'fragrance',
          price: '',
          compareAtPrice: '',
          description: '',
          details: '',
          imageUrl: '',
          stock: '25',
          featured: false,
          badge: 'New Arrival'
        });
        fetchData();
      }
    } catch (err) {
      alert('Failed to create product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (e) {
      alert('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: status })
      });
      if (res.ok) {
        setOrders(prev =>
          prev.map(o => (o.id === orderId ? { ...o, orderStatus: status } : o))
        );
      }
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const handleSaveTracking = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber: trackingInput })
      });
      if (res.ok) {
        setOrders(prev =>
          prev.map(o => (o.id === orderId ? { ...o, trackingNumber: trackingInput, orderStatus: 'shipped' } : o))
        );
        setEditingOrderId(null);
        setTrackingInput('');
      }
    } catch (e) {
      alert('Failed to update tracking');
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="bg-black text-white min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-neutral-950 border border-neutral-800 p-8 max-w-sm w-full space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 flex items-center justify-center mx-auto text-white">
              <Lock size={20} />
            </div>
            <h1 className="text-sm uppercase tracking-widest font-mono font-bold">
              MANLY AURA ADMIN
            </h1>
            <p className="text-[11px] text-neutral-500 font-mono">
              Enter master passcode to access the operations console.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-400 mb-1">
                Passcode (Default: manlyaura2026)
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter passcode"
                className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-[11px] text-red-400 font-mono">
                Incorrect passcode. Try `manlyaura2026`.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition"
            >
              Authenticate &rarr;
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'confirmed');
  const lowStockProducts = products.filter(p => p.stock <= 5);

  return (
    <div className="bg-black text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Navigation Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-950 border border-neutral-800 p-5">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black uppercase tracking-widest font-mono">
              MANLY AURA OPS
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-[10px] font-mono text-emerald-400">
              LIVE
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition"
            >
              <span>View Storefront</span>
              <ExternalLink size={13} />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-neutral-900 font-mono text-xs uppercase tracking-wider space-x-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 font-semibold transition ${
              activeTab === 'overview'
                ? 'border-b-2 border-white text-white'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-b-2 border-white text-white'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span>Orders ({orders.length})</span>
            {pendingOrders.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 font-semibold transition ${
              activeTab === 'products'
                ? 'border-b-2 border-white text-white'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Products ({products.length})
          </button>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Collected Revenue</span>
                  <TrendingUp size={16} className="text-emerald-400" />
                </div>
                <p className="text-2xl font-bold font-mono text-white">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-neutral-500 font-mono">
                  From verified Razorpay payments
                </p>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Total Orders</span>
                  <ShoppingBag size={16} className="text-white" />
                </div>
                <p className="text-2xl font-bold font-mono text-white">{orders.length}</p>
                <p className="text-[10px] text-amber-400 font-mono">
                  {pendingOrders.length} requiring fulfillment
                </p>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Catalog SKUs</span>
                  <Package size={16} className="text-white" />
                </div>
                <p className="text-2xl font-bold font-mono text-white">{products.length}</p>
                <p className="text-[10px] text-neutral-500 font-mono">
                  Active across 4 categories
                </p>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Low Stock SKUs</span>
                  <AlertTriangle size={16} className="text-red-400" />
                </div>
                <p className="text-2xl font-bold font-mono text-white">{lowStockProducts.length}</p>
                <p className="text-[10px] text-neutral-500 font-mono">
                  Stock ≤ 5 units
                </p>
              </div>

            </div>

            {/* Quick Actions & Pending Orders list */}
            <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-white font-bold">
                Recent Customer Orders
              </h3>
              {orders.length === 0 ? (
                <p className="text-xs font-mono text-neutral-500 py-6 text-center">
                  No orders placed yet. Place a test order from the storefront!
                </p>
              ) : (
                <div className="divide-y divide-neutral-900 overflow-x-auto">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="py-3 flex items-center justify-between gap-4 text-xs font-mono min-w-[600px]">
                      <div>
                        <span className="font-bold text-white">{order.id}</span>
                        <span className="text-neutral-500 ml-2">by {order.customer.fullName}</span>
                      </div>
                      <span className="text-neutral-400">{order.customer.city}, {order.customer.state}</span>
                      <span className="text-white font-bold">₹{order.total.toLocaleString('en-IN')}</span>
                      <span className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                        order.paymentStatus === 'paid' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                      }`}>
                        {order.paymentMethod === 'razorpay' ? 'Razorpay' : 'COD'} ({order.paymentStatus})
                      </span>
                      <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-white text-[10px] uppercase">
                        {order.orderStatus}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-mono uppercase tracking-widest font-bold">
                Customer Orders Fulfillment ({orders.length})
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="bg-neutral-950 border border-neutral-800 p-12 text-center text-xs font-mono text-neutral-500">
                No orders registered. Test checkout on www.manlyaura.com to generate orders.
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => {
                  const customerWhatsApp = `https://wa.me/91${order.customer.phone}?text=${encodeURIComponent(
                    `Hello ${order.customer.fullName}, MANLY AURA team here regarding your Order #${order.id}.`
                  )}`;

                  return (
                    <div key={order.id} className="bg-neutral-950 border border-neutral-800 p-6 space-y-6">
                      
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-900 pb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-base font-bold font-mono text-white">{order.id}</span>
                            <span className={`px-2 py-0.5 text-[10px] uppercase font-mono font-bold ${
                              order.paymentStatus === 'paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                            }`}>
                              {order.paymentMethod === 'razorpay' ? 'Online Paid' : 'Cash on Delivery'}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-neutral-500 mt-1">
                            Ordered: {new Date(order.createdAt).toLocaleString('en-IN')}
                          </p>
                        </div>

                        {/* Status Updater */}
                        <div className="flex items-center gap-3 flex-wrap">
                          <label className="text-xs font-mono text-neutral-400">Order Status:</label>
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="bg-black border border-neutral-700 text-xs font-mono text-white py-1.5 px-3 focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          <a
                            href={customerWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-950 border border-emerald-800 text-emerald-400 hover:bg-emerald-900 text-xs font-mono flex items-center gap-1.5 transition"
                            title="Message customer on WhatsApp"
                          >
                            <MessageSquare size={13} />
                            <span>WhatsApp Customer</span>
                          </a>
                        </div>
                      </div>

                      {/* Customer & Address Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono text-neutral-300">
                        <div className="p-4 bg-black border border-neutral-900 space-y-1">
                          <span className="text-[10px] uppercase text-neutral-500 block mb-1">Customer Info</span>
                          <p className="font-bold text-white">{order.customer.fullName}</p>
                          <p>Phone: +91 {order.customer.phone}</p>
                          <p>Email: {order.customer.email}</p>
                        </div>

                        <div className="p-4 bg-black border border-neutral-900 space-y-1">
                          <span className="text-[10px] uppercase text-neutral-500 block mb-1">Shipping Destination</span>
                          <p>{order.customer.addressLine1}</p>
                          {order.customer.landmark && <p>Landmark: {order.customer.landmark}</p>}
                          <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
                          {order.customer.notes && <p className="text-neutral-500 italic mt-1">&ldquo;{order.customer.notes}&rdquo;</p>}
                        </div>
                      </div>

                      {/* Purchased Items */}
                      <div className="space-y-3">
                        <span className="text-[10px] uppercase font-mono text-neutral-500 block">Ordered Items</span>
                        <div className="divide-y divide-neutral-900">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-2 flex items-center justify-between text-xs font-mono">
                              <div className="flex items-center gap-3">
                                <img src={item.image} alt={item.productName} className="w-10 h-12 object-cover bg-neutral-900 border border-neutral-800" />
                                <div>
                                  <span className="text-white font-medium">{item.productName}</span>
                                  <span className="text-neutral-500 ml-2">× {item.quantity}</span>
                                </div>
                              </div>
                              <span className="text-white font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Logistics Tracking Number */}
                      <div className="pt-2 border-t border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="text-xs font-mono">
                          <span className="text-neutral-500 mr-2">Waybill / Tracking:</span>
                          {order.trackingNumber ? (
                            <span className="text-emerald-400 font-bold">{order.trackingNumber}</span>
                          ) : (
                            <span className="text-neutral-500">Not assigned</span>
                          )}
                        </div>

                        {editingOrderId === order.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="e.g. DELHIVERY123456"
                              value={trackingInput}
                              onChange={(e) => setTrackingInput(e.target.value)}
                              className="bg-black border border-neutral-700 px-3 py-1 text-xs font-mono text-white focus:outline-none"
                            />
                            <button
                              onClick={() => handleSaveTracking(order.id)}
                              className="px-3 py-1 bg-white text-black font-mono text-xs uppercase font-bold"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingOrderId(null)}
                              className="px-2 py-1 text-neutral-400 text-xs font-mono"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingOrderId(order.id);
                              setTrackingInput(order.trackingNumber || '');
                            }}
                            className="text-xs font-mono text-neutral-400 hover:text-white underline"
                          >
                            {order.trackingNumber ? 'Edit AWB' : '+ Assign Courier AWB'}
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 3. PRODUCTS MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-mono uppercase tracking-widest font-bold">
                Catalog Inventory ({products.length})
              </h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 transition flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 divide-y divide-neutral-900 overflow-x-auto">
              {products.map((product) => (
                <div key={product.id} className="p-4 flex items-center justify-between gap-4 text-xs font-mono min-w-[700px]">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-14 object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">{product.category} • SKU: {product.sku}</span>
                      <h4 className="font-bold text-white text-sm">{product.name}</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div>
                      <span className="text-[10px] text-neutral-500 block">Price</span>
                      <span className="text-white font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-neutral-500 block">Inventory</span>
                      <span className={product.stock <= 5 ? 'text-red-400 font-bold' : 'text-neutral-300'}>
                        {product.stock} in stock
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-neutral-500 block">Status</span>
                      <span className="text-emerald-400">Active</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        target="_blank"
                        className="p-1.5 text-neutral-400 hover:text-white"
                        title="View on site"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-400"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
              <h3 className="text-xs uppercase font-mono tracking-widest text-white font-bold">
                Add New Product to MANLY AURA
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-neutral-400 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. OBSIDIAN OUD Parfum (100ml)"
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as CategorySlug })}
                    className="w-full bg-black border border-neutral-800 px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="fragrance">Fragrance</option>
                    <option value="accessories">Accessories</option>
                    <option value="gadgets">Gadgets</option>
                    <option value="fashion">Fashion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Initial Stock *</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full bg-black border border-neutral-800 px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="1899"
                    className="w-full bg-black border border-neutral-800 px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Compare-At MRP (₹)</label>
                  <input
                    type="number"
                    value={newProduct.compareAtPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, compareAtPrice: e.target.value })}
                    placeholder="2499"
                    className="w-full bg-black border border-neutral-800 px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Artisanal blend of spicy top notes and deep woods..."
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Specifications (1 per line)</label>
                <textarea
                  rows={3}
                  value={newProduct.details}
                  onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value })}
                  placeholder="Top Notes: Bergamot&#10;Heart Notes: Amber&#10;Base: Smoked Oud"
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newProduct.featured}
                  onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                  className="bg-black border-neutral-800"
                />
                <label htmlFor="featured" className="text-white cursor-pointer">
                  Feature on Homepage
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black uppercase font-bold hover:bg-neutral-200 transition"
              >
                Create Product &rarr;
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
