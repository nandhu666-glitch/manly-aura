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
  ExternalLink,
  Tag,
  Save,
  X
} from 'lucide-react';
import { Product, Order, OrderStatus, CategorySlug } from '@/types';

const ADMIN_PASSCODE = 'NEWventure@444';

const emptyProduct = {
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
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'offers'>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Add / Edit Product state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState(emptyProduct);

  // Inline edit states for products list
  const [inlineEditId, setInlineEditId] = useState<string | null>(null);
  const [inlinePrice, setInlinePrice] = useState('');
  const [inlineStock, setInlineStock] = useState('');

  // Tracking update state
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  // Offers / Promo state (stored in localStorage for persistence across restarts)
  const [promoEnabled, setPromoEnabled] = useState(true);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('999');
  const [shippingFee, setShippingFee] = useState('79');
  const [announcementText, setAnnouncementText] = useState('🔥 BUY 3 GET 1 FREE — Mix & Match Any Products');
  const [offersSaved, setOffersSaved] = useState(false);

  // Check auth session
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem('ma_admin_auth') || localStorage.getItem('ma_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (e) {}
  }, []);

  // Load saved offers settings
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ma_offers_settings');
      if (saved) {
        const s = JSON.parse(saved);
        if (s.promoEnabled !== undefined) setPromoEnabled(s.promoEnabled);
        if (s.freeShippingThreshold) setFreeShippingThreshold(s.freeShippingThreshold);
        if (s.shippingFee) setShippingFee(s.shippingFee);
        if (s.announcementText) setAnnouncementText(s.announcementText);
      }
    } catch (e) {}
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
    if (passwordInput.trim() === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setAuthError(false);
      try {
        sessionStorage.setItem('ma_admin_auth', 'true');
        localStorage.setItem('ma_admin_auth', 'true');
      } catch (e) {}
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('ma_admin_auth');
      localStorage.removeItem('ma_admin_auth');
    } catch (e) {}
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
        setNewProduct(emptyProduct);
        fetchData();
      }
    } catch (err) {
      alert('Failed to create product');
    }
  };

  const handleUpdateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        fetchData();
        setInlineEditId(null);
        setEditingProduct(null);
      }
    } catch (e) {
      alert('Failed to update product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) setProducts(prev => prev.filter(p => p.id !== id));
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
        setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, orderStatus: status } : o)));
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

  const handleSaveOffers = () => {
    try {
      localStorage.setItem('ma_offers_settings', JSON.stringify({
        promoEnabled,
        freeShippingThreshold,
        shippingFee,
        announcementText
      }));
      setOffersSaved(true);
      setTimeout(() => setOffersSaved(false), 3000);
    } catch (e) {
      alert('Failed to save settings');
    }
  };

  // ─── Metrics ────────────────────────────────────────────────
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'confirmed');
  const lowStockProducts = products.filter(p => p.stock <= 5);

  // ─── INPUT FIELD CLASSES ────────────────────────────────────
  const inputCls = 'w-full bg-black border border-neutral-800 px-3 py-2 text-white text-sm focus:outline-none focus:border-white rounded-none';
  const labelCls = 'block text-[10px] uppercase font-mono tracking-wider text-neutral-400 mb-1';

  // ─── LOGIN SCREEN ────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
        <div className="bg-neutral-950 border border-neutral-800 p-8 w-full max-w-sm space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 flex items-center justify-center mx-auto">
              <Lock size={20} />
            </div>
            <h1 className="text-sm uppercase tracking-widest font-mono font-bold">MANLY AURA ADMIN</h1>
            <p className="text-[11px] text-neutral-500 font-mono">Enter master passcode to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={labelCls}>Passcode</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className={inputCls}
                autoFocus
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                autoComplete="off"
              />
            </div>

            {authError && (
              <p className="text-[11px] text-red-400 font-mono">Incorrect passcode. Please try again.</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition"
            >
              Authenticate →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── ADMIN DASHBOARD ─────────────────────────────────────────
  return (
    <div className="bg-black text-white min-h-screen">

      {/* Top Nav Bar */}
      <div className="bg-neutral-950 border-b border-neutral-800 px-4 py-3 flex items-center justify-between gap-3 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black uppercase tracking-widest font-mono">MANLY AURA</span>
          <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-[10px] font-mono text-emerald-400">ADMIN</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <button onClick={fetchData} className="text-neutral-400 hover:text-white flex items-center gap-1" title="Refresh">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <Link href="/" target="_blank" className="text-neutral-400 hover:text-white flex items-center gap-1">
            <ExternalLink size={13} />
            <span className="hidden sm:inline">Store</span>
          </Link>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-300 flex items-center gap-1">
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Tab Bar */}
        <div className="flex border-b border-neutral-900 font-mono text-xs uppercase tracking-wider overflow-x-auto">
          {([
            { key: 'overview', label: 'Dashboard', icon: <TrendingUp size={12} /> },
            { key: 'orders', label: `Orders (${orders.length})`, icon: <ShoppingBag size={12} />, dot: pendingOrders.length > 0 },
            { key: 'products', label: `Products (${products.length})`, icon: <Package size={12} /> },
            { key: 'offers', label: 'Offers & Pricing', icon: <Tag size={12} /> },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 pr-4 sm:pr-6 font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-b-2 border-white text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tab.icon}
              {tab.label}
              {(tab as any).dot && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5" />}
            </button>
          ))}
        </div>

        {/* ── 1. OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Revenue Collected', value: `₹${totalRevenue.toLocaleString('en-IN')}`, sub: 'From verified payments', icon: <TrendingUp size={16} className="text-emerald-400" /> },
                { label: 'Total Orders', value: orders.length, sub: `${pendingOrders.length} pending`, icon: <ShoppingBag size={16} /> },
                { label: 'Catalog SKUs', value: products.length, sub: '4 categories', icon: <Package size={16} /> },
                { label: 'Low Stock', value: lowStockProducts.length, sub: 'Stock ≤ 5 units', icon: <AlertTriangle size={16} className="text-red-400" /> },
              ].map((m, i) => (
                <div key={i} className="bg-neutral-950 border border-neutral-800 p-4 space-y-1">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="text-[10px] font-mono uppercase tracking-wider">{m.label}</span>
                    {m.icon}
                  </div>
                  <p className="text-xl sm:text-2xl font-bold font-mono text-white">{m.value}</p>
                  <p className="text-[10px] text-neutral-500 font-mono">{m.sub}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-neutral-950 border border-neutral-800 p-5 space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-white font-bold">Recent Orders</h3>
              {orders.length === 0 ? (
                <p className="text-xs font-mono text-neutral-500 py-4 text-center">No orders yet. Share your store link!</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="bg-black border border-neutral-900 p-3 space-y-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-bold text-white font-mono text-xs">{order.id}</span>
                        <span className={`px-2 py-0.5 text-[10px] uppercase font-mono font-bold ${
                          order.paymentStatus === 'paid' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                        }`}>
                          {order.paymentMethod === 'razorpay' ? 'Online' : 'COD'} · {order.paymentStatus}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-400">
                        <span>{order.customer.fullName} · {order.customer.city}</span>
                        <span className="text-white font-bold">₹{order.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── 2. ORDERS TAB ── */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-sm font-mono uppercase tracking-widest font-bold">
              Orders Fulfillment ({orders.length})
            </h2>

            {orders.length === 0 ? (
              <div className="bg-neutral-950 border border-neutral-800 p-12 text-center text-xs font-mono text-neutral-500">
                No orders registered yet.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const customerWhatsApp = `https://wa.me/91${order.customer.phone}?text=${encodeURIComponent(
                    `Hello ${order.customer.fullName}, MANLY AURA team here regarding your Order #${order.id}.`
                  )}`;
                  return (
                    <div key={order.id} className="bg-neutral-950 border border-neutral-800 p-4 sm:p-6 space-y-4">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-900 pb-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold font-mono text-white">{order.id}</span>
                            <span className={`px-2 py-0.5 text-[10px] uppercase font-mono font-bold ${
                              order.paymentStatus === 'paid'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-amber-950 text-amber-400 border border-amber-800'
                            }`}>
                              {order.paymentMethod === 'razorpay' ? 'Online Paid' : 'Cash on Delivery'}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-neutral-500 mt-1">
                            {new Date(order.createdAt).toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="bg-black border border-neutral-700 text-xs font-mono text-white py-1.5 px-2 focus:outline-none"
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
                          >
                            <MessageSquare size={13} />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>

                      {/* Customer & Address */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-neutral-300">
                        <div className="p-3 bg-black border border-neutral-900 space-y-1">
                          <span className="text-[10px] uppercase text-neutral-500 block">Customer</span>
                          <p className="font-bold text-white">{order.customer.fullName}</p>
                          <p>📞 +91 {order.customer.phone}</p>
                          <p>✉ {order.customer.email}</p>
                        </div>
                        <div className="p-3 bg-black border border-neutral-900 space-y-1">
                          <span className="text-[10px] uppercase text-neutral-500 block">Ship To</span>
                          <p>{order.customer.addressLine1}</p>
                          {order.customer.landmark && <p>Landmark: {order.customer.landmark}</p>}
                          <p>{order.customer.city}, {order.customer.state} — {order.customer.pincode}</p>
                          {order.customer.notes && <p className="text-neutral-500 italic">"{order.customer.notes}"</p>}
                        </div>
                      </div>

                      {/* Items */}
                      <div>
                        <span className="text-[10px] uppercase font-mono text-neutral-500 block mb-2">Items Ordered</span>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 py-2 border-b border-neutral-900 last:border-0">
                              <img src={item.image} alt={item.productName} className="w-10 h-12 object-cover bg-neutral-900 border border-neutral-800 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <span className="text-white text-xs font-medium block truncate">{item.productName}</span>
                                <span className="text-neutral-500 text-[11px]">Qty: {item.quantity}</span>
                              </div>
                              <span className="text-white text-xs font-bold shrink-0">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                          <div className="flex justify-between text-xs font-mono pt-1">
                            <span className="text-neutral-400">Order Total</span>
                            <span className="text-white font-bold">₹{order.total.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tracking */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-neutral-900">
                        <div className="text-xs font-mono">
                          <span className="text-neutral-500 mr-2">Tracking / AWB:</span>
                          {order.trackingNumber ? (
                            <span className="text-emerald-400 font-bold">{order.trackingNumber}</span>
                          ) : (
                            <span className="text-neutral-600">Not assigned</span>
                          )}
                        </div>
                        {editingOrderId === order.id ? (
                          <div className="flex gap-2 w-full sm:w-auto">
                            <input
                              type="text"
                              placeholder="e.g. DELHIVERY123456"
                              value={trackingInput}
                              onChange={(e) => setTrackingInput(e.target.value)}
                              className="flex-1 bg-black border border-neutral-700 px-3 py-1.5 text-xs font-mono text-white focus:outline-none"
                            />
                            <button onClick={() => handleSaveTracking(order.id)} className="px-3 py-1.5 bg-white text-black font-mono text-xs uppercase font-bold">Save</button>
                            <button onClick={() => setEditingOrderId(null)} className="px-2 py-1.5 text-neutral-400 text-xs font-mono">✕</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setEditingOrderId(order.id); setTrackingInput(order.trackingNumber || ''); }}
                            className="text-xs font-mono text-neutral-400 hover:text-white underline"
                          >
                            {order.trackingNumber ? 'Edit AWB' : '+ Add Tracking'}
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

        {/* ── 3. PRODUCTS TAB ── */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="text-sm font-mono uppercase tracking-widest font-bold">
                Products ({products.length})
              </h2>
              <button
                onClick={() => { setShowAddModal(true); setNewProduct(emptyProduct); }}
                className="px-4 py-2 bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 transition flex items-center gap-1.5"
              >
                <Plus size={14} />
                Add Product
              </button>
            </div>

            {/* Product Cards — mobile friendly */}
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="bg-neutral-950 border border-neutral-800 p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-16 object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-neutral-500 uppercase font-mono">{product.category} · {product.sku}</span>
                      <h4 className="font-bold text-white text-sm leading-snug">{product.name}</h4>
                      {product.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono">{product.badge}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/products/${product.id}`} target="_blank" className="p-1.5 text-neutral-400 hover:text-white" title="View">
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setNewProduct({
                            name: product.name,
                            category: product.category,
                            price: String(product.price),
                            compareAtPrice: String(product.compareAtPrice || ''),
                            description: product.description,
                            details: (product.details || []).join('\n'),
                            imageUrl: product.images[0] || '',
                            stock: String(product.stock),
                            featured: product.featured,
                            badge: product.badge || ''
                          });
                          setShowAddModal(true);
                        }}
                        className="p-1.5 text-neutral-400 hover:text-white"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="p-1.5 text-neutral-400 hover:text-red-400" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Inline Price + Stock Edit */}
                  {inlineEditId === product.id ? (
                    <div className="flex flex-wrap gap-2 items-center bg-black border border-neutral-800 p-3">
                      <div className="flex-1 min-w-[120px]">
                        <label className={labelCls}>Selling Price (₹)</label>
                        <input
                          type="number"
                          value={inlinePrice}
                          onChange={e => setInlinePrice(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-700 px-2 py-1.5 text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex-1 min-w-[100px]">
                        <label className={labelCls}>Stock (units)</label>
                        <input
                          type="number"
                          value={inlineStock}
                          onChange={e => setInlineStock(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-700 px-2 py-1.5 text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex items-end gap-2 mt-auto">
                        <button
                          onClick={() => handleUpdateProduct(product.id, { price: Number(inlinePrice), stock: Number(inlineStock) })}
                          className="px-3 py-1.5 bg-white text-black font-mono text-xs uppercase font-bold flex items-center gap-1"
                        >
                          <Save size={12} /> Save
                        </button>
                        <button onClick={() => setInlineEditId(null)} className="px-2 py-1.5 text-neutral-400 hover:text-white">
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-neutral-500 block text-[10px]">Price</span>
                          <span className="text-white font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.compareAtPrice && (
                            <span className="text-neutral-500 line-through ml-1">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[10px]">Stock</span>
                          <span className={product.stock <= 5 ? 'text-red-400 font-bold' : 'text-neutral-300'}>
                            {product.stock} units
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[10px]">Featured</span>
                          <span className={product.featured ? 'text-emerald-400' : 'text-neutral-600'}>
                            {product.featured ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => { setInlineEditId(product.id); setInlinePrice(String(product.price)); setInlineStock(String(product.stock)); }}
                        className="px-3 py-1.5 border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 text-[11px] font-mono flex items-center gap-1"
                      >
                        <Edit size={11} /> Edit Price/Stock
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 4. OFFERS & PRICING TAB ── */}
        {activeTab === 'offers' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-sm font-mono uppercase tracking-widest font-bold">Offers & Pricing Settings</h2>

            <div className="bg-neutral-950 border border-neutral-800 p-5 space-y-5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold border-b border-neutral-900 pb-3">
                🎁 Buy 3 Get 1 Free Promo
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPromoEnabled(!promoEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${promoEnabled ? 'bg-white' : 'bg-neutral-700'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full transition-all ${promoEnabled ? 'left-7 bg-black' : 'left-1 bg-neutral-400'}`} />
                </button>
                <span className="text-sm font-mono text-white">
                  {promoEnabled ? '✅ Active — Buy 3 Get 1 Free is ON' : '❌ Disabled'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-mono">
                When enabled: customers buying 4+ items get the cheapest item FREE. This is calculated automatically at checkout.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-5 space-y-5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold border-b border-neutral-900 pb-3">
                🚚 Shipping Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Free Shipping Above (₹)</label>
                  <input
                    type="number"
                    value={freeShippingThreshold}
                    onChange={e => setFreeShippingThreshold(e.target.value)}
                    className={inputCls}
                    placeholder="999"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1 font-mono">Orders above this get free shipping</p>
                </div>
                <div>
                  <label className={labelCls}>Shipping Fee Below Threshold (₹)</label>
                  <input
                    type="number"
                    value={shippingFee}
                    onChange={e => setShippingFee(e.target.value)}
                    className={inputCls}
                    placeholder="79"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1 font-mono">Charged when order is below threshold</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-5 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold border-b border-neutral-900 pb-3">
                📢 Announcement Banner Text
              </h3>
              <div>
                <label className={labelCls}>Banner Message (shown at top of site)</label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={e => setAnnouncementText(e.target.value)}
                  className={inputCls}
                  placeholder="🔥 BUY 3 GET 1 FREE — Mix & Match Any Products"
                />
                <p className="text-[10px] text-neutral-500 mt-1 font-mono">Note: Requires code update to reflect on live site</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleSaveOffers}
                className="px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition flex items-center gap-2"
              >
                <Save size={14} /> Save Settings
              </button>
              {offersSaved && (
                <span className="text-emerald-400 font-mono text-xs flex items-center gap-1">
                  <CheckCircle size={14} /> Settings saved!
                </span>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ── ADD / EDIT PRODUCT MODAL ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-neutral-950 border border-neutral-800 w-full sm:max-w-lg p-5 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-900 pb-3 sticky top-0 bg-neutral-950 z-10">
              <h3 className="text-xs uppercase font-mono tracking-widest text-white font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => { setShowAddModal(false); setEditingProduct(null); }} className="text-neutral-400 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={editingProduct
                ? async (e) => { e.preventDefault(); await handleUpdateProduct(editingProduct.id, {
                    name: newProduct.name,
                    category: newProduct.category,
                    price: Number(newProduct.price),
                    compareAtPrice: newProduct.compareAtPrice ? Number(newProduct.compareAtPrice) : undefined,
                    description: newProduct.description,
                    details: newProduct.details ? newProduct.details.split('\n') : [],
                    images: [newProduct.imageUrl || editingProduct.images[0]],
                    stock: Number(newProduct.stock),
                    featured: newProduct.featured,
                    badge: newProduct.badge || undefined
                  }); setShowAddModal(false); setEditingProduct(null); }
                : handleCreateProduct
              }
              className="space-y-4 text-xs font-mono"
            >
              <div>
                <label className={labelCls}>Product Name *</label>
                <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. OBSIDIAN OUD Parfum 100ml" className={inputCls} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Category *</label>
                  <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as CategorySlug})} className={inputCls}>
                    <option value="fragrance">Fragrance</option>
                    <option value="accessories">Accessories</option>
                    <option value="gadgets">Gadgets</option>
                    <option value="fashion">Fashion</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Stock (units) *</label>
                  <input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Selling Price (₹) *</label>
                  <input type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} placeholder="1899" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>MRP / Compare-At (₹)</label>
                  <input type="number" value={newProduct.compareAtPrice} onChange={e => setNewProduct({...newProduct, compareAtPrice: e.target.value})} placeholder="2499" className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Badge Label</label>
                <input type="text" value={newProduct.badge} onChange={e => setNewProduct({...newProduct, badge: e.target.value})} placeholder="New Arrival / Best Seller / Limited" className={inputCls} />
              </div>

              <div>
                <label className={labelCls}>Image URL</label>
                <input type="url" value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} placeholder="https://images.unsplash.com/..." className={inputCls} />
                {newProduct.imageUrl && (
                  <img src={newProduct.imageUrl} alt="preview" className="mt-2 w-20 h-24 object-cover border border-neutral-800" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
              </div>

              <div>
                <label className={labelCls}>Description</label>
                <textarea rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} placeholder="Artisanal blend of spicy top notes and deep woods..." className={inputCls} />
              </div>

              <div>
                <label className={labelCls}>Specifications (1 per line)</label>
                <textarea rows={3} value={newProduct.details} onChange={e => setNewProduct({...newProduct, details: e.target.value})} placeholder={"Top Notes: Bergamot\nHeart: Amber\nBase: Smoked Oud"} className={inputCls} />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={newProduct.featured} onChange={e => setNewProduct({...newProduct, featured: e.target.checked})} className="w-4 h-4 bg-black border-neutral-800" />
                <label htmlFor="featured" className="text-white cursor-pointer">Show on Homepage (Featured)</label>
              </div>

              <button type="submit" className="w-full py-3 bg-white text-black uppercase font-bold hover:bg-neutral-200 transition flex items-center justify-center gap-2">
                <Save size={14} />
                {editingProduct ? 'Update Product' : 'Create Product'} →
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
