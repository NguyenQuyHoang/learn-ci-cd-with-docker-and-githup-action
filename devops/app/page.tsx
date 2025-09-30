"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const data01 = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Books", value: 300 },
];
const data02 = [
  { name: "In Stock", value: 200 },
  { name: "Low Stock", value: 500 },
  { name: "Out of Stock", value: 100 },
];
const data03 = [
  { name: "High Price", value: 250 },
  { name: "Medium Price", value: 350 },
  { name: "Low Price", value: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const products = [
    { 
      id: 1, 
      name: "iPhone 15 Pro", 
      price: "$999", 
      stock: 25, 
      category: "Electronics",
      description: "Latest iPhone with advanced camera system",
      status: "active",
      dateAdded: "2024-01-15",
      rating: 4.8
    },
    { 
      id: 2, 
      name: "MacBook Air M3", 
      price: "$1199", 
      stock: 12, 
      category: "Electronics",
      description: "Ultra-thin laptop with M3 chip",
      status: "active",
      dateAdded: "2024-01-10",
      rating: 4.9
    },
    { 
      id: 3, 
      name: "Nike Air Max", 
      price: "$120", 
      stock: 45, 
      category: "Clothing",
      description: "Comfortable running shoes",
      status: "active",
      dateAdded: "2024-01-08",
      rating: 4.6
    },
    { 
      id: 4, 
      name: "Samsung Galaxy S24", 
      price: "$799", 
      stock: 8, 
      category: "Electronics",
      description: "Android flagship smartphone",
      status: "low-stock",
      dateAdded: "2024-01-12",
      rating: 4.7
    },
    { 
      id: 5, 
      name: "Adidas T-Shirt", 
      price: "$35", 
      stock: 0, 
      category: "Clothing",
      description: "Premium cotton t-shirt",
      status: "out-of-stock",
      dateAdded: "2024-01-05",
      rating: 4.3
    },
    { 
      id: 6, 
      name: "The Great Gatsby", 
      price: "$12", 
      stock: 30, 
      category: "Books",
      description: "Classic American novel",
      status: "active",
      dateAdded: "2024-01-03",
      rating: 4.5
    },
    { 
      id: 7, 
      name: "Sony WH-1000XM5", 
      price: "$399", 
      stock: 15, 
      category: "Electronics",
      description: "Noise-cancelling headphones",
      status: "active",
      dateAdded: "2024-01-14",
      rating: 4.8
    },
    { 
      id: 8, 
      name: "Levi's Jeans", 
      price: "$89", 
      stock: 22, 
      category: "Clothing",
      description: "Classic denim jeans",
      status: "active",
      dateAdded: "2024-01-07",
      rating: 4.4
    },
    { 
      id: 9, 
      name: "Dune", 
      price: "$16", 
      stock: 18, 
      category: "Books",
      description: "Science fiction masterpiece",
      status: "active",
      dateAdded: "2024-01-09",
      rating: 4.7
    },
    { 
      id: 10, 
      name: "iPad Pro 12.9", 
      price: "$1099", 
      stock: 5, 
      category: "Electronics",
      description: "Professional tablet with M2 chip",
      status: "low-stock",
      dateAdded: "2024-01-11",
      rating: 4.9
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium",
      "low-stock": "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium",
      "out-of-stock": "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
    };
    return statusClasses[status as keyof typeof statusClasses] || statusClasses.active;
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium";
    if (stock < 10) return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium";
    return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium";
  };

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "all" || product.category === filterCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
        case "stock":
          return b.stock - a.stock;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow p-4 flex justify-between">
        <div className="font-bold text-lg">My Dashboard</div>
        <div className="space-x-4">
          <a href="#" className="text-gray-600 hover:text-black">Home</a>
          <a href="#" className="text-gray-600 hover:text-black">Products</a>
          <a href="#" className="text-gray-600 hover:text-black">Services</a>
        </div>
      </nav>

      {/* Layout */}
      <div className="grid grid-cols-4 gap-4 p-4">
        {/* Left Column */}
        <div className="col-span-3 space-y-6">
          {/* Products Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header with Search and Filters */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Products Management</h2>
                  <p className="text-blue-100">Manage your product inventory efficiently</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:outline-none"
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 rounded-lg border-0 text-gray-900 focus:ring-2 focus:ring-white/20 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg border-0 text-gray-900 focus:ring-2 focus:ring-white/20 focus:outline-none"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="stock">Sort by Stock</option>
                    <option value="rating">Sort by Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date Added</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                              {product.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{product.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockBadge(product.stock)}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(product.status)}`}>
                          {product.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(product.dateAdded).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> products
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Add Product
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-3 gap-4">
            {[data01, data02, data03].map((data, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {data.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: "Quản lý sản phẩm", desc: "Theo dõi và quản lý danh mục." },
              { title: "Thêm sản phẩm", desc: "Thêm sản phẩm mới dễ dàng." },
              { title: "Theo dõi tiến độ", desc: "Xem báo cáo và thống kê." },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Sidebar</h2>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Orders</a></li>
              <li><a href="#">Reports</a></li>
              <li><a href="#">Settings</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
