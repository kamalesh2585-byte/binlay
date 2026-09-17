'use client'

import { useState } from 'react'
import {
  BarChart3,
  ShoppingCart,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
} from 'lucide-react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showModal, setShowModal] = useState(false)

  // Mock data
  const stats = [
    { label: 'Total Products', value: '48', icon: ShoppingCart, color: 'forest' },
    { label: 'Total Orders', value: '1,234', icon: TrendingUp, color: 'sage' },
    { label: 'Total Customers', value: '5,678', icon: Users, color: 'forest' },
    { label: 'Total Revenue', value: '₹45,230', icon: BarChart3, color: 'sage' },
  ]

  const products = [
    { id: 1, name: 'Virgin Coconut Oil', price: '₹24.99', stock: 120, status: 'Active' },
    { id: 2, name: 'Coconut Water', price: '₹4.99', stock: 85, status: 'Active' },
    { id: 3, name: 'Coconut Milk', price: '₹3.99', stock: 45, status: 'Low Stock' },
  ]

  const orders = [
    { id: 'NC-001', customer: 'John Doe', total: '₹99.99', status: 'Delivered', date: '2024-09-10' },
    { id: 'NC-002', customer: 'Jane Smith', total: '₹149.99', status: 'Processing', date: '2024-09-09' },
    { id: 'NC-003', customer: 'Mike Johnson', total: '₹59.99', status: 'Pending', date: '2024-09-08' },
  ]

  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, spent: '₹250.00' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, spent: '₹180.00' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', orders: 2, spent: '₹120.00' },
  ]

  return (
    <div className="min-h-screen bg-coconut-light">
      {/* Header */}
      <header className="bg-white border-b border-sage-100 sticky top-0 z-40">
        <div className="container-custom py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-forest-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-sage-200">
          {['dashboard', 'products', 'orders', 'customers'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium whitespace-nowrap rounded-t-lg transition-colors ${
                activeTab === tab
                  ? 'bg-forest-600 text-white'
                  : 'text-gray-700 hover:text-forest-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                const bgColor = stat.color === 'forest' ? 'bg-forest-100' : 'bg-sage-100'
                const iconColor = stat.color === 'forest' ? 'text-forest-600' : 'text-sage-600'
                return (
                  <div
                    key={index}
                    className="card-base p-6 space-y-3 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
                      <Icon className={`${iconColor}`} size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-3xl font-bold text-forest-900">{stat.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card-base p-6">
                <h3 className="text-lg font-bold text-forest-900 mb-4">Sales Overview</h3>
                <div className="h-64 bg-sage-50 rounded-lg flex items-center justify-center text-gray-600">
                  Chart placeholder
                </div>
              </div>
              <div className="card-base p-6">
                <h3 className="text-lg font-bold text-forest-900 mb-4">Top Products</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between pb-3 border-b border-sage-100 last:border-0">
                      <span className="text-gray-700">Coconut Oil - Premium</span>
                      <span className="font-bold text-forest-600">₹2,450</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card-base p-6">
              <h3 className="text-lg font-bold text-forest-900 mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-sage-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Order ID</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Customer</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Total</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b border-sage-100 hover:bg-sage-50">
                        <td className="px-4 py-3 font-medium text-forest-600">{order.id}</td>
                        <td className="px-4 py-3">{order.customer}</td>
                        <td className="px-4 py-3 font-bold">{order.total}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'Delivered'
                              ? 'bg-forest-100 text-forest-700'
                              : order.status === 'Processing'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-forest-900">Products</h2>
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Add Product
              </button>
            </div>

            <div className="card-base p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-sage-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Product</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Stock</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-sage-100 hover:bg-sage-50">
                      <td className="px-4 py-3 font-medium">{product.name}</td>
                      <td className="px-4 py-3">{product.price}</td>
                      <td className="px-4 py-3">{product.stock} units</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === 'Active'
                            ? 'bg-forest-100 text-forest-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button className="p-2 hover:bg-sage-100 rounded-lg transition-colors">
                          <Eye size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-sage-100 rounded-lg transition-colors">
                          <Edit size={18} className="text-forest-600" />
                        </button>
                        <button className="p-2 hover:bg-sage-100 rounded-lg transition-colors">
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-forest-900">Orders</h2>
            <div className="card-base p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-sage-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Order ID</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Customer</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Total</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-sage-100 hover:bg-sage-50">
                      <td className="px-4 py-3 font-medium text-forest-600">{order.id}</td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3 font-bold">{order.total}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-forest-100 text-forest-700'
                            : order.status === 'Processing'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{order.date}</td>
                      <td className="px-4 py-3">
                        <button className="p-2 hover:bg-sage-100 rounded-lg transition-colors">
                          <Eye size={18} className="text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-forest-900">Customers</h2>
            <div className="card-base p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-sage-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Orders</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(customer => (
                    <tr key={customer.id} className="border-b border-sage-100 hover:bg-sage-50">
                      <td className="px-4 py-3 font-medium">{customer.name}</td>
                      <td className="px-4 py-3">{customer.email}</td>
                      <td className="px-4 py-3">{customer.orders}</td>
                      <td className="px-4 py-3 font-bold text-forest-600">{customer.spent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-slide-up">
            <h2 className="text-2xl font-bold text-forest-900 mb-6">Add New Product</h2>
            <div className="space-y-4 mb-6">
              <input type="text" placeholder="Product Name" className="" />
              <input type="number" placeholder="Price" className="" />
              <input type="number" placeholder="Stock" className="" />
              <textarea placeholder="Description" rows={3} className="resize-none"></textarea>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-grow btn-secondary"
              >
                Cancel
              </button>
              <button className="flex-grow btn-primary">Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
