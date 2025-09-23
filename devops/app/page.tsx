"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data01 = [
  { name: "A", value: 400 },
  { name: "B", value: 300 },
  { name: "C", value: 300 },
];
const data02 = [
  { name: "X", value: 200 },
  { name: "Y", value: 500 },
  { name: "Z", value: 100 },
];
const data03 = [
  { name: "M", value: 250 },
  { name: "N", value: 350 },
  { name: "O", value: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Home() {
  const products = [
    { id: 1, name: "Product A", price: "$100", stock: 20 },
    { id: 2, name: "Product B", price: "$200", stock: 15 },
    { id: 3, name: "Product C", price: "$300", stock: 10 },
  ];

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
          {/* Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{p.id}</td>
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.price}</td>
                    <td className="p-2">{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
