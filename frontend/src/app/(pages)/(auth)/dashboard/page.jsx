'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Stethoscope, Calendar, Search, Bell, ChevronLeft, ChevronRight, ClipboardList, Building2, Star, LogOut } from 'lucide-react';

import AdminDoctorForm    from '../add_doctors/page';
import AdminHospitalForm  from '../add_hospitals/page';
import TreatmentAdminForm from '../add_treatments/page';
import ReviewForm         from '../add_user_reviews/page';

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ activePage, setPage }) {
  const router = useRouter();

  const nav = [
    { icon: <Calendar className="w-5 h-5" />,     label: 'Dashboard',      key: 'dashboard' },
    { icon: <Users className="w-5 h-5" />,         label: 'Add Doctor',     key: 'add-doctor' },
    { icon: <Building2 className="w-5 h-5" />,     label: 'Add Hospital',   key: 'add-hospital' },
    { icon: <ClipboardList className="w-5 h-5" />, label: 'Add Treatment',  key: 'add-treatment' },
    { icon: <Star className="w-5 h-5" />,          label: 'Add Review',     key: 'add-review' },
  ];

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-10 flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2563eb,#10b981)' }}>
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold" style={{ background: 'linear-gradient(90deg,#2563eb,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            MUFT MADAD
          </h1>
        </div>

        <nav className="space-y-2">
          {nav.map((item) => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activePage === item.key ? 'text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={activePage === item.key ? { background: 'linear-gradient(90deg,#2563eb,#10b981)' } : {}}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Only Logout at bottom */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

// ─── Dashboard Home ───────────────────────────────────────────────────────────
function DashboardPage({ setPage }) {
  const [activeTab, setActiveTab] = useState('Month');
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8));

  const getDaysInMonth = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const quickActions = [
    { label: 'Add Doctor',    key: 'add-doctor',    icon: <Users className="w-5 h-5" />,         color: '#2563eb' },
    { label: 'Add Hospital',  key: 'add-hospital',  icon: <Building2 className="w-5 h-5" />,     color: '#10b981' },
    { label: 'Add Treatment', key: 'add-treatment', icon: <ClipboardList className="w-5 h-5" />, color: '#f97316' },
    { label: 'Add Review',    key: 'add-review',    icon: <Star className="w-5 h-5" />,           color: '#8b5cf6' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Hospital Dashboard</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Search patients, doctors..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-xl"><Bell className="w-6 h-6 text-gray-600" /></button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: 'linear-gradient(135deg,#3b82f6,#10b981)' }}>DR</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['Day', 'Week', 'Month', 'Year'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${activeTab === tab ? 'text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
            style={activeTab === tab ? { background: 'linear-gradient(90deg,#2563eb,#10b981)' } : {}}>
            {tab}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 bg-white px-4 py-2 rounded-xl border shadow-sm">
          <span className="text-sm text-gray-600">📅 {monthName}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Patients', value: '—', primary: true },
          { label: 'Active Doctors', value: '—' },
          { label: 'Available Beds', value: '—' },
          { label: "Today's Revenue", value: '—' },
        ].map((s, i) => (
          <div key={i} className={`rounded-2xl p-6 shadow-lg ${s.primary ? 'text-white' : 'bg-white border border-gray-100'}`}
            style={s.primary ? { background: 'linear-gradient(135deg,#2563eb,#10b981)' } : {}}>
            <h3 className={`text-sm font-medium mb-2 ${s.primary ? 'text-blue-100' : 'text-gray-600'}`}>{s.label}</h3>
            <p className={`text-3xl font-bold mb-1 ${s.primary ? 'text-white' : 'text-gray-300'}`}>{s.value}</p>
            <p className={`text-xs ${s.primary ? 'text-blue-200' : 'text-gray-400'}`}>No data yet</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button key={action.key} onClick={() => setPage(action.key)}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform" style={{ background: action.color }}>
                {action.icon}
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Patient Admissions</h3>
          <div className="flex flex-col items-center justify-center h-56 text-gray-400">
            <Stethoscope className="w-14 h-14 mb-3 opacity-10" />
            <p className="font-medium">No data available yet</p>
            <p className="text-sm mt-1">Add doctors & hospitals to see analytics</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
              <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-blue-500" />
            </button>
            <h3 className="font-bold text-gray-800 text-sm">{monthName}</h3>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
              <ChevronRight className="w-5 h-5 text-gray-600 hover:text-blue-500" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div key={d} className="text-xs text-gray-400 text-center font-medium">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => (
              <div key={idx} className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-all ${day ? 'hover:bg-blue-50 text-gray-700 border border-transparent hover:border-blue-100 cursor-pointer' : ''}`}>
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Treatments</h3>
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <ClipboardList className="w-14 h-14 mb-3 opacity-10" />
          <p className="font-medium">No treatments recorded yet</p>
          <button onClick={() => setPage('add-treatment')} className="mt-4 px-5 py-2 rounded-xl text-white text-sm font-medium shadow" style={{ background: 'linear-gradient(90deg,#2563eb,#10b981)' }}>
            + Add Treatment
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function HospitalDashboard() {
  const [page, setPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar activePage={page} setPage={setPage} />
      <div className="ml-64">
        {page === 'dashboard'     && <DashboardPage setPage={setPage} />}
        {page === 'add-doctor'    && <AdminDoctorForm />}
        {page === 'add-hospital'  && <AdminHospitalForm />}
        {page === 'add-treatment' && <TreatmentAdminForm />}
        {page === 'add-review'    && <ReviewForm />}
      </div>
    </div>
  );
}