
'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, User, Bed, Stethoscope, Calendar, Menu, Search, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState('Month');
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8)); // September 2024

  const revenueData = [
    { month: 'Jan', patients: 320 },
    { month: 'Feb', patients: 450 },
    { month: 'Mar', patients: 620 },
    { month: 'Apr', patients: 580 },
    { month: 'May', patients: 750 },
    { month: 'Jun', patients: 680 },
  ];

  const treatments = [
    { id: 1, treatment: 'Cardiology', patient: 'Priya Sharma', patientId: '#HPT001', doctor: 'Dr. Rajesh K.', amount: '₹15,200', status: 'Completed', image: '❤️' },
    { id: 2, treatment: 'Orthopedics', patient: 'Amit Kumar', patientId: '#HPT002', doctor: 'Dr. Neha Singh', amount: '₹22,500', status: 'Completed', image: '🦴' },
    { id: 3, treatment: 'Neurology', patient: 'Rohit Verma', patientId: '#HPT003', doctor: 'Dr. Anil Gupta', amount: '₹18,750', status: 'Pending', image: '🧠' },
    { id: 4, treatment: 'Pediatrics', patient: 'Anjali R.', patientId: '#HPT004', doctor: 'Dr. Priya M.', amount: '₹12,800', status: 'Completed', image: '👶' },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-10">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">MUFT MADAD</h1>
          </div>

          <nav className="space-y-2">
            {[
              { icon: <Calendar className="w-5 h-5" />, label: 'Dashboard', active: true },
              { icon: <Users className="w-5 h-5" />, label: 'Doctors' },
              { icon: <User className="w-5 h-5" />, label: 'Patients' },
              { icon: <Bed className="w-5 h-5" />, label: 'Beds' },
              { icon: <Stethoscope className="w-5 h-5" />, label: 'Departments' },
              { icon: <Users className="w-5 h-5" />, label: 'Staff' },
            ].map((item, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? 'bg-linear-to-r from-blue-600 to-emerald-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
            <span className="w-5 h-5">⚙️</span>
            <span className="font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
            <span className="w-5 h-5">📞</span>
            <span className="font-medium">Support</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
            <span className="w-5 h-5">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Hospital Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients, doctors..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-all">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">DR</div>
          </div>
        </div>

        {/* Time Period Tabs */}
        <div className="flex gap-2 mb-6">
          {['Day', 'Week', 'Month', 'Year'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                activeTab === tab
                  ? 'bg-linear-to-r from-blue-600 to-emerald-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 bg-white px-4 py-2 rounded-xl border shadow-sm">
            <span className="text-sm text-gray-600">📅 {monthName}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-linear-to-br from-blue-600 to-emerald-500 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-sm font-medium text-blue-100 mb-2">Total Patients</h3>
            <p className="text-3xl font-bold mb-2">2,847</p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-green-300">12.5%</span>
              <span className="text-blue-100">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Active Doctors</h3>
            <p className="text-3xl font-bold text-gray-800 mb-2">127</p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">8%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Available Beds</h3>
            <p className="text-3xl font-bold text-gray-800 mb-2">245</p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingDown className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500">-3%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Today's Revenue</h3>
            <p className="text-3xl font-bold text-gray-800 mb-2">₹4.2L</p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">15.2%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Patient Admissions Chart */}
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Monthly Patient Admissions</h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <span className="text-gray-600">↗️</span>
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="patients" fill="url(#patientlinear)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearlinear id="patientlinear" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearlinear>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
                <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-blue-500" />
              </button>
              <h3 className="font-bold text-gray-800">{monthName}</h3>
              <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
                <ChevronRight className="w-5 h-5 text-gray-600 hover:text-blue-500" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs text-gray-500 text-center font-medium">
                  {day.slice(0, 3)}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all cursor-pointer ${
                    day === 19
                      ? 'bg-linear-to-br from-blue-600 to-emerald-500 text-white font-bold shadow-lg'
                      : day
                      ? 'hover:bg-blue-50 text-gray-700 hover:text-blue-600 hover:shadow-md border hover:border-blue-200'
                      : 'text-gray-200'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-bold text-gray-800 mb-2">Bed Occupancy</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">6.2%</span>
                  <span className="text-gray-500">from last month</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">78%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Treatments Table */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Treatments</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <span className="text-gray-600">🔄</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <span className="text-gray-600">↗️</span>
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Treatment</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Doctor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((treatment) => (
                <tr key={treatment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-emerald-100 rounded-xl flex items-center justify-center text-2xl shadow-md">
                        {treatment.image}
                      </div>
                      <span className="font-medium text-gray-800">{treatment.treatment}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700 font-medium">{treatment.patient}</td>
                  <td className="py-4 px-4 text-gray-600">{treatment.doctor}</td>
                  <td className="py-4 px-4 font-bold text-gray-800">{treatment.amount}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                        treatment.status === 'Completed'
                          ? 'bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-md'
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}
                    >
                      {treatment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
