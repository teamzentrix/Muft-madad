// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import {
//   Users, Stethoscope, Calendar, Search, Bell, ChevronLeft, ChevronRight,
//   ClipboardList, Building2, Star, LogOut, Trash2, Pencil, X, Check,
//   RefreshCw, AlertCircle, CheckCircle2, Eye, EyeOff, ChevronDown, ChevronUp,
//   Plus
// } from 'lucide-react';

// import AdminDoctorForm    from '../add_doctors/page';
// import AdminHospitalForm  from '../add_hospitals/page';
// import TreatmentAdminForm from '../add_treatments/page';
// import ReviewForm         from '../add_user_reviews/page';

// const API = 'http://localhost:4000/api';

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const grad = 'linear-gradient(90deg,#2563eb,#10b981)';
// const gradCard = 'linear-gradient(135deg,#2563eb,#10b981)';

// function Badge({ active }) {
//   return (
//     <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
//       {active ? 'Active' : 'Inactive'}
//     </span>
//   );
// }

// function ConfirmModal({ message, onConfirm, onCancel }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4">
//         <div className="flex flex-col items-center gap-4 text-center">
//           <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
//             <Trash2 className="w-7 h-7 text-red-500" />
//           </div>
//           <p className="text-gray-800 font-semibold text-lg">{message}</p>
//           <p className="text-gray-500 text-sm">This action cannot be undone.</p>
//           <div className="flex gap-3 w-full mt-2">
//             <button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50">Cancel</button>
//             <button onClick={onConfirm} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600">Delete</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Toast({ msg, type, onClose }) {
//   useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
//   return (
//     <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl text-white font-medium text-sm transition-all ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
//       {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
//       {msg}
//       <button onClick={onClose}><X className="w-4 h-4 ml-2" /></button>
//     </div>
//   );
// }

// // ─── Sidebar ──────────────────────────────────────────────────────────────────
// function Sidebar({ activePage, setPage }) {
//   const router = useRouter();

//   const nav = [
//     { icon: <Calendar className="w-5 h-5" />,     label: 'Dashboard',         key: 'dashboard' },
//     { divider: true, label: 'ADD NEW' },
//     { icon: <Users className="w-5 h-5" />,         label: 'Add Doctor',        key: 'add-doctor' },
//     { icon: <Building2 className="w-5 h-5" />,     label: 'Add Hospital',      key: 'add-hospital' },
//     { icon: <ClipboardList className="w-5 h-5" />, label: 'Add Treatment',     key: 'add-treatment' },
//     { icon: <Star className="w-5 h-5" />,          label: 'Add Review',        key: 'add-review' },
//     { divider: true, label: 'MANAGE' },
//     { icon: <Users className="w-5 h-5" />,         label: 'All Doctors',       key: 'list-doctors' },
//     { icon: <Building2 className="w-5 h-5" />,     label: 'All Hospitals',     key: 'list-hospitals' },
//     { icon: <ClipboardList className="w-5 h-5" />, label: 'All Treatments',    key: 'list-treatments' },
//     { icon: <Star className="w-5 h-5" />,          label: 'All Reviews',       key: 'list-reviews' },
//   ];

//   return (
//     <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-10 flex flex-col overflow-y-auto">
//       <div className="p-6 flex-1">
//         <div className="flex items-center gap-2 mb-8">
//           <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: gradCard }}>
//             <Stethoscope className="w-4 h-4 text-white" />
//           </div>
//           <h1 className="text-xl font-bold" style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//             MUFT MADAD
//           </h1>
//         </div>

//         <nav className="space-y-1">
//           {nav.map((item, idx) =>
//             item.divider ? (
//               <p key={idx} className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 pt-4 pb-1">{item.label}</p>
//             ) : (
//               <button key={item.key} onClick={() => setPage(item.key)}
//                 className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm ${activePage === item.key ? 'text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
//                 style={activePage === item.key ? { background: grad } : {}}>
//                 {item.icon}
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             )
//           )}
//         </nav>
//       </div>

//       <div className="p-6 border-t border-gray-100">
//         <button onClick={() => router.push('/login')}
//           className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
//           <LogOut className="w-5 h-5" />
//           <span className="font-medium">Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Dashboard Stats Page ──────────────────────────────────────────────────────
// function DashboardPage({ setPage }) {
//   const [stats, setStats] = useState({ doctors: 0, hospitals: 0, treatments: 0, reviews: 0 });
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('Month');
//   const [currentDate, setCurrentDate] = useState(new Date());

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [d, h, t, r] = await Promise.allSettled([
//           axios.get(`${API}/doctors`),
//           axios.get(`${API}/hospitals`),
//           axios.get(`${API}/admin/getAll`),
//           axios.get(`${API}/users/reviews`),
//         ]);
//         setStats({
//           doctors:    d.status === 'fulfilled' ? (d.value.data?.length ?? d.value.data?.data?.length ?? 0) : 0,
//           hospitals:  h.status === 'fulfilled' ? (h.value.data?.length ?? h.value.data?.data?.length ?? 0) : 0,
//           treatments: t.status === 'fulfilled' ? (t.value.data?.length ?? t.value.data?.data?.length ?? 0) : 0,
//           reviews:    r.status === 'fulfilled' ? (r.value.data?.length ?? r.value.data?.data?.length ?? 0) : 0,
//         });
//       } catch (e) { /* silent */ }
//       finally { setLoading(false); }
//     };
//     fetchStats();
//   }, []);

//   const { firstDay, daysInMonth } = (() => {
//     const m = currentDate.getMonth(), y = currentDate.getFullYear();
//     return { firstDay: new Date(y, m, 1).getDay(), daysInMonth: new Date(y, m + 1, 0).getDate() };
//   })();
//   const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//   const calendarDays = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

//   const statCards = [
//     { label: 'Total Doctors',    value: stats.doctors,    key: 'list-doctors',    primary: true },
//     { label: 'Total Hospitals',  value: stats.hospitals,  key: 'list-hospitals' },
//     { label: 'Total Treatments', value: stats.treatments, key: 'list-treatments' },
//     { label: 'Total Reviews',    value: stats.reviews,    key: 'list-reviews' },
//   ];

//   const quickActions = [
//     { label: 'Add Doctor',    key: 'add-doctor',    icon: <Users className="w-5 h-5" />,         color: '#2563eb' },
//     { label: 'Add Hospital',  key: 'add-hospital',  icon: <Building2 className="w-5 h-5" />,     color: '#10b981' },
//     { label: 'Add Treatment', key: 'add-treatment', icon: <ClipboardList className="w-5 h-5" />, color: '#f97316' },
//     { label: 'Add Review',    key: 'add-review',    icon: <Star className="w-5 h-5" />,           color: '#8b5cf6' },
//   ];

//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl font-bold text-gray-800">Hospital Dashboard</h2>
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
//           </div>
//           <button className="p-2 hover:bg-gray-100 rounded-xl"><Bell className="w-6 h-6 text-gray-600" /></button>
//           <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: gradCard }}>DR</div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 mb-6">
//         {['Day', 'Week', 'Month', 'Year'].map(tab => (
//           <button key={tab} onClick={() => setActiveTab(tab)}
//             className={`px-6 py-2 rounded-xl font-medium transition-all ${activeTab === tab ? 'text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200'}`}
//             style={activeTab === tab ? { background: grad } : {}}>
//             {tab}
//           </button>
//         ))}
//         <div className="ml-auto flex items-center gap-2 bg-white px-4 py-2 rounded-xl border shadow-sm">
//           <span className="text-sm text-gray-600">📅 {monthName}</span>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-4 gap-6 mb-8">
//         {statCards.map((s, i) => (
//           <button key={i} onClick={() => setPage(s.key)}
//             className={`rounded-2xl p-6 shadow-lg text-left transition-transform hover:scale-105 ${s.primary ? 'text-white' : 'bg-white border border-gray-100'}`}
//             style={s.primary ? { background: gradCard } : {}}>
//             <h3 className={`text-sm font-medium mb-2 ${s.primary ? 'text-blue-100' : 'text-gray-600'}`}>{s.label}</h3>
//             <p className={`text-4xl font-bold mb-1 ${s.primary ? 'text-white' : 'text-gray-800'}`}>
//               {loading ? '...' : s.value}
//             </p>
//             <p className={`text-xs ${s.primary ? 'text-blue-200' : 'text-gray-400'}`}>Click to view all</p>
//           </button>
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
//         <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-4 gap-4">
//           {quickActions.map(action => (
//             <button key={action.key} onClick={() => setPage(action.key)}
//               className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
//               <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform" style={{ background: action.color }}>
//                 {action.icon}
//               </div>
//               <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">{action.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-6">
//         {/* Chart placeholder */}
//         <div className="col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Overview</h3>
//           <div className="grid grid-cols-2 gap-4">
//             {statCards.map((s, i) => (
//               <div key={i} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: ['#2563eb','#10b981','#f97316','#8b5cf6'][i] }}>
//                   {[<Users className="w-5 h-5"/>, <Building2 className="w-5 h-5"/>, <ClipboardList className="w-5 h-5"/>, <Star className="w-5 h-5"/>][i]}
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-gray-800">{loading ? '...' : s.value}</p>
//                   <p className="text-xs text-gray-500">{s.label}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Calendar */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//           <div className="flex items-center justify-between mb-4">
//             <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
//               <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-blue-500" />
//             </button>
//             <h3 className="font-bold text-gray-800 text-sm">{monthName}</h3>
//             <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
//               <ChevronRight className="w-5 h-5 text-gray-600 hover:text-blue-500" />
//             </button>
//           </div>
//           <div className="grid grid-cols-7 gap-1 mb-2">
//             {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
//               <div key={d} className="text-xs text-gray-400 text-center font-medium">{d}</div>
//             ))}
//           </div>
//           <div className="grid grid-cols-7 gap-1">
//             {calendarDays.map((day, idx) => (
//               <div key={idx} className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-all ${
//                 day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()
//                   ? 'text-white font-bold' : day ? 'hover:bg-blue-50 text-gray-700 cursor-pointer' : ''
//               }`} style={day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? { background: grad } : {}}>
//                 {day}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Generic List Page ────────────────────────────────────────────────────────
// function ListPage({ title, fetchUrl, deleteUrl, idField, columns, renderRow, addKey, setPage }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [toast, setToast] = useState(null);

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(fetchUrl, { withCredentials: true });
//       const result = res.data?.data ?? res.data;
//       setData(Array.isArray(result) ? result : []);
//     } catch {
//       setToast({ msg: 'Failed to load data', type: 'error' });
//     } finally { setLoading(false); }
//   }, [fetchUrl]);

//   useEffect(() => { fetchData(); }, [fetchData]);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`${deleteUrl}/${deleteTarget[idField]}`, { withCredentials: true });
//       setToast({ msg: 'Deleted successfully!', type: 'success' });
//       setData(prev => prev.filter(d => d[idField] !== deleteTarget[idField]));
//     } catch {
//       setToast({ msg: 'Delete failed. Try again.', type: 'error' });
//     } finally { setDeleteTarget(null); }
//   };

//   const filtered = data.filter(item =>
//     columns.some(col => String(item[col.key] ?? '').toLowerCase().includes(search.toLowerCase()))
//   );

//   return (
//     <div className="p-8">
//       {deleteTarget && <ConfirmModal message={`Delete this ${title.slice(4)}?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
//       {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
//           <p className="text-gray-500 text-sm mt-1">{data.length} total records</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input value={search} onChange={e => setSearch(e.target.value)}
//               placeholder="Search..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 text-sm" />
//           </div>
//           <button onClick={fetchData} className="p-2 hover:bg-gray-100 rounded-xl" title="Refresh">
//             <RefreshCw className="w-5 h-5 text-gray-600" />
//           </button>
//           {addKey && (
//             <button onClick={() => setPage(addKey)}
//               className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium shadow"
//               style={{ background: grad }}>
//               <Plus className="w-4 h-4" /> Add New
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//         {loading ? (
//           <div className="flex items-center justify-center py-20 text-gray-400">
//             <RefreshCw className="w-6 h-6 animate-spin mr-3" /> Loading...
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//             <ClipboardList className="w-12 h-12 mb-3 opacity-20" />
//             <p className="font-medium">No records found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-200">
//                   <th className="text-left py-4 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
//                   {columns.map(col => (
//                     <th key={col.key} className="text-left py-4 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">{col.label}</th>
//                   ))}
//                   <th className="text-left py-4 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((item, idx) => (
//                   <tr key={item[idField] ?? idx} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
//                     <td className="py-4 px-5 text-sm text-gray-500">{idx + 1}</td>
//                     {renderRow(item)}
//                     <td className="py-4 px-5">
//                       <div className="flex items-center gap-2">
//                         <button onClick={() => setDeleteTarget(item)}
//                           className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Doctors List ─────────────────────────────────────────────────────────────
// function DoctorsListPage({ setPage }) {
//   return (
//     <ListPage
//       title="All Doctors"
//       fetchUrl={`${API}/doctors`}
//       deleteUrl={`${API}/doctors`}
//       idField="uuid"
//       addKey="add-doctor"
//       setPage={setPage}
//       columns={[
//         { key: 'name',              label: 'Name' },
//         { key: 'email',             label: 'Email' },
//         { key: 'specialities',      label: 'Specialities' },
//         { key: 'city',              label: 'City' },
//         { key: 'experience_in_years', label: 'Exp (yrs)' },
//         { key: 'is_active',         label: 'Status' },
//       ]}
//       renderRow={item => (<>
//         <td className="py-4 px-5">
//           <div className="flex items-center gap-3">
//             {item.photo
//               ? <img src={item.photo} alt="" className="w-9 h-9 rounded-full object-cover border" />
//               : <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: gradCard }}>{item.name?.[0] ?? 'D'}</div>
//             }
//             <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
//           </div>
//         </td>
//         <td className="py-4 px-5 text-sm text-gray-600">{item.email}</td>
//         <td className="py-4 px-5 text-sm text-gray-600">{Array.isArray(item.specialities) ? item.specialities.join(', ') : item.specialities || '—'}</td>
//         <td className="py-4 px-5 text-sm text-gray-600">{item.city || '—'}</td>
//         <td className="py-4 px-5 text-sm text-gray-600">{item.experience_in_years ?? '—'}</td>
//         <td className="py-4 px-5"><Badge active={item.is_active} /></td>
//       </>)}
//     />
//   );
// }

// // ─── Hospitals List ───────────────────────────────────────────────────────────
// function HospitalsListPage({ setPage }) {
//   return (
//     <ListPage
//       title="All Hospitals"
//       fetchUrl={`${API}/hospitals`}
//       deleteUrl={`${API}/hospitals`}
//       idField="id"
//       addKey="add-hospital"
//       setPage={setPage}
//       columns={[
//         { key: 'name',    label: 'Name' },
//         { key: 'city',    label: 'City' },
//         { key: 'state',   label: 'State' },
//         { key: 'phone',   label: 'Phone' },
//         { key: 'is_active', label: 'Status' },
//       ]}
//       renderRow={item => (<>
//         <td className="py-4 px-5">
//           <div className="flex items-center gap-3">
//             {item.photo
//               ? <img src={item.photo} alt="" className="w-9 h-9 rounded-lg object-cover border" />
//               : <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white" style={{ background: gradCard }}><Building2 className="w-4 h-4" /></div>
//             }
//             <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
//           </div>
//         </td>
//         <td className="py-4 px-5 text-sm text-gray-600">{item.city || '—'}</td>
//         <td className="py-4 px-5 text-sm text-gray-600">{item.state || '—'}</td>
//         <td className="py-4 px-5 text-sm text-gray-600">{item.phone || '—'}</td>
//         <td className="py-4 px-5"><Badge active={item.is_active} /></td>
//       </>)}
//     />
//   );
// }

// // ─── Treatments List ──────────────────────────────────────────────────────────
// function TreatmentsListPage({ setPage }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [toast, setToast] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/admin/getAll`, { withCredentials: true });
//       const result = res.data?.data ?? res.data;
//       setData(Array.isArray(result) ? result : []);
//     } catch { setToast({ msg: 'Failed to load treatments', type: 'error' }); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchData(); }, []);

//   const filtered = data.filter(t => t.name?.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div className="p-8">
//       {deleteTarget && <ConfirmModal message="Delete this treatment?" onConfirm={async () => {
//         try {
//           setToast({ msg: 'Delete not supported via API yet', type: 'error' });
//         } finally { setDeleteTarget(null); }
//       }} onCancel={() => setDeleteTarget(null)} />}
//       {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-800">All Treatments</h2>
//           <p className="text-gray-500 text-sm mt-1">{data.length} total records</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
//               className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 text-sm" />
//           </div>
//           <button onClick={fetchData} className="p-2 hover:bg-gray-100 rounded-xl"><RefreshCw className="w-5 h-5 text-gray-600" /></button>
//           <button onClick={() => setPage('add-treatment')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium shadow" style={{ background: grad }}>
//             <Plus className="w-4 h-4" /> Add New
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//         {loading ? (
//           <div className="flex items-center justify-center py-20 text-gray-400"><RefreshCw className="w-6 h-6 animate-spin mr-3" /> Loading...</div>
//         ) : filtered.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//             <ClipboardList className="w-12 h-12 mb-3 opacity-20" /><p>No treatments found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-200">
//                   {['#','Name','Specialty ID','Duration','Stay','Recovery','Success Rate','Actions'].map(h => (
//                     <th key={h} className="text-left py-4 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((item, idx) => (
//                   <tr key={item.id ?? idx} className="border-b border-gray-100 hover:bg-gray-50">
//                     <td className="py-4 px-5 text-sm text-gray-500">{idx + 1}</td>
//                     <td className="py-4 px-5">
//                       <div className="flex items-center gap-3">
//                         {item.treatment_image
//                           ? <img src={item.treatment_image} alt="" className="w-9 h-9 rounded-lg object-cover border" />
//                           : <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white" style={{ background: '#f97316' }}><ClipboardList className="w-4 h-4" /></div>
//                         }
//                         <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
//                       </div>
//                     </td>
//                     <td className="py-4 px-5 text-sm text-gray-600">{item.specialty_id ?? '—'}</td>
//                     <td className="py-4 px-5 text-sm text-gray-600">{item.surgery_duration || '—'}</td>
//                     <td className="py-4 px-5 text-sm text-gray-600">{item.hospital_stay || '—'}</td>
//                     <td className="py-4 px-5 text-sm text-gray-600">{item.recovery_time || '—'}</td>
//                     <td className="py-4 px-5 text-sm text-gray-600">{item.success_rate || '—'}</td>
//                     <td className="py-4 px-5">
//                       <button onClick={() => setDeleteTarget(item)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Reviews List ─────────────────────────────────────────────────────────────
// function ReviewsListPage({ setPage }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [toast, setToast] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/users/reviews`, { withCredentials: true });
//       const result = res.data?.data ?? res.data;
//       setData(Array.isArray(result) ? result : []);
//     } catch { setToast({ msg: 'Failed to load reviews', type: 'error' }); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchData(); }, []);

//   const filtered = data.filter(r =>
//     r.name?.toLowerCase().includes(search.toLowerCase()) ||
//     r.treatment?.toLowerCase().includes(search.toLowerCase()) ||
//     r.city?.toLowerCase().includes(search.toLowerCase())
//   );

//   const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

//   return (
//     <div className="p-8">
//       {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-800">All Reviews</h2>
//           <p className="text-gray-500 text-sm mt-1">{data.length} total records</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
//               className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 text-sm" />
//           </div>
//           <button onClick={fetchData} className="p-2 hover:bg-gray-100 rounded-xl"><RefreshCw className="w-5 h-5 text-gray-600" /></button>
//           <button onClick={() => setPage('add-review')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium shadow" style={{ background: grad }}>
//             <Plus className="w-4 h-4" /> Add New
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//         {loading ? (
//           <div className="flex items-center justify-center py-20 text-gray-400"><RefreshCw className="w-6 h-6 animate-spin mr-3" /> Loading...</div>
//         ) : filtered.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//             <Star className="w-12 h-12 mb-3 opacity-20" /><p>No reviews found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-200">
//                   {['#','Name','Treatment','City','Rating','Date','Description'].map(h => (
//                     <th key={h} className="text-left py-4 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((item, idx) => (
//                   <tr key={item.id ?? idx} className="border-b border-gray-100 hover:bg-gray-50">
//                     <td className="py-4 px-5 text-sm text-gray-500">{idx + 1}</td>
//                     <td className="py-4 px-5 font-semibold text-gray-800 text-sm">{item.name}</td>
//                     <td className="py-4 px-5 text-sm text-gray-600">{item.treatment || '—'}</td>
//                     <td className="py-4 px-5 text-sm text-gray-600">{item.city || '—'}</td>
//                     <td className="py-4 px-5 text-yellow-500 text-sm">{stars(item.rating ?? 0)}</td>
//                     <td className="py-4 px-5 text-sm text-gray-600">{item.date ? new Date(item.date).toLocaleDateString() : '—'}</td>
//                     <td className="py-4 px-5 text-sm text-gray-600 max-w-xs truncate">{item.description || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── App Root ─────────────────────────────────────────────────────────────────
// export default function HospitalDashboard() {
//   const [page, setPage] = useState('dashboard');

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <Sidebar activePage={page} setPage={setPage} />
//       <div className="ml-64">
//         {page === 'dashboard'      && <DashboardPage setPage={setPage} />}
//         {page === 'add-doctor'     && <AdminDoctorForm />}
//         {page === 'add-hospital'   && <AdminHospitalForm />}
//         {page === 'add-treatment'  && <TreatmentAdminForm />}
//         {page === 'add-review'     && <ReviewForm />}
//         {page === 'list-doctors'   && <DoctorsListPage setPage={setPage} />}
//         {page === 'list-hospitals' && <HospitalsListPage setPage={setPage} />}
//         {page === 'list-treatments'&& <TreatmentsListPage setPage={setPage} />}
//         {page === 'list-reviews'   && <ReviewsListPage setPage={setPage} />}
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Users, Stethoscope, Calendar, Search, Bell, ChevronLeft, ChevronRight,
  ClipboardList, Building2, Star, LogOut, Trash2, Pencil, X, Check,
  RefreshCw, AlertCircle, CheckCircle2, Eye, EyeOff, ChevronDown, ChevronUp,
  Plus, Layers
} from 'lucide-react';

import AdminDoctorForm    from '../add_doctors/page';
import AdminHospitalForm  from '../add_hospitals/page';
import TreatmentAdminForm from '../add_treatments/page';
import ReviewForm         from '../add_user_reviews/page';
import AddSpecialityForm  from '../add-speciality/page'; // ✅ new

const API = 'http://localhost:4000/api';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const grad     = 'linear-gradient(90deg,#2563eb,#10b981)';
const gradCard = 'linear-gradient(135deg,#2563eb,#10b981)';

function Badge({ active }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 className="w-7 h-7 text-red-500" />
          </div>
          <p className="text-gray-800 font-semibold text-lg">{message}</p>
          <p className="text-gray-500 text-sm">This action cannot be undone.</p>
          <div className="flex gap-3 w-full mt-2">
            <button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50">Cancel</button>
            <button onClick={onConfirm} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl text-white font-medium text-sm transition-all ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {msg}
      <button onClick={onClose}><X className="w-4 h-4 ml-2" /></button>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ activePage, setPage }) {
  const router = useRouter();

  const nav = [
    { icon: <Calendar className="w-5 h-5" />,     label: 'Dashboard',           key: 'dashboard' },
    { divider: true, label: 'ADD NEW' },
    { icon: <Layers className="w-5 h-5" />,        label: 'Add Speciality',      key: 'add-speciality' }, // ✅
    { icon: <Users className="w-5 h-5" />,         label: 'Add Doctor',          key: 'add-doctor' },
    { icon: <Building2 className="w-5 h-5" />,     label: 'Add Hospital',        key: 'add-hospital' },
    { icon: <ClipboardList className="w-5 h-5" />, label: 'Add Treatment',       key: 'add-treatment' },
    { icon: <Star className="w-5 h-5" />,          label: 'Add Review',          key: 'add-review' },
    { divider: true, label: 'MANAGE' },
    { icon: <Layers className="w-5 h-5" />,        label: 'All Specialities',    key: 'list-specialities' }, // ✅
    { icon: <Users className="w-5 h-5" />,         label: 'All Doctors',         key: 'list-doctors' },
    { icon: <Building2 className="w-5 h-5" />,     label: 'All Hospitals',       key: 'list-hospitals' },
    { icon: <ClipboardList className="w-5 h-5" />, label: 'All Treatments',      key: 'list-treatments' },
    { icon: <Star className="w-5 h-5" />,          label: 'All Reviews',         key: 'list-reviews' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-10 flex flex-col overflow-y-auto">
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: gradCard }}>
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold" style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            MUFT MADAD
          </h1>
        </div>

        <nav className="space-y-1">
          {nav.map((item, idx) =>
            item.divider ? (
              <p key={idx} className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 pt-4 pb-1">{item.label}</p>
            ) : (
              <button key={item.key} onClick={() => setPage(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm ${activePage === item.key ? 'text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
                style={activePage === item.key ? { background: grad } : {}}>
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            )
          )}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-100">
        <button onClick={async () => {
          try {
            await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
          } catch (e) { /* ignore */ }
          // ✅ Clear localStorage token so dashboard auth check fails next time
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          router.replace('/login');
        }}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

// ─── Dashboard Stats Page ─────────────────────────────────────────────────────
function DashboardPage({ setPage }) {
  const [stats, setStats] = useState({ specialities: 0, doctors: 0, hospitals: 0, treatments: 0, reviews: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Month');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [sp, d, h, t, r] = await Promise.allSettled([
          axios.get(`${API}/specialities`),
          axios.get(`${API}/doctors`),
          axios.get(`${API}/hospitals`),
          axios.get(`${API}/admin/getAll`),
          axios.get(`${API}/users/reviews`),
        ]);
        const count = (res) => {
          if (res.status !== 'fulfilled') return 0;
          const v = res.value.data;
          return v?.data?.length ?? v?.length ?? 0;
        };
        setStats({
          specialities: count(sp),
          doctors:      count(d),
          hospitals:    count(h),
          treatments:   count(t),
          reviews:      count(r),
        });
      } catch { /* silent */ }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const { firstDay, daysInMonth } = (() => {
    const m = currentDate.getMonth(), y = currentDate.getFullYear();
    return { firstDay: new Date(y, m, 1).getDay(), daysInMonth: new Date(y, m + 1, 0).getDate() };
  })();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const calendarDays = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const statCards = [
    { label: 'Total Specialities', value: stats.specialities, key: 'list-specialities', primary: true },
    { label: 'Total Doctors',      value: stats.doctors,      key: 'list-doctors' },
    { label: 'Total Hospitals',    value: stats.hospitals,    key: 'list-hospitals' },
    { label: 'Total Treatments',   value: stats.treatments,   key: 'list-treatments' },
    { label: 'Total Reviews',      value: stats.reviews,      key: 'list-reviews' },
  ];

  const quickActions = [
    { label: 'Add Speciality', key: 'add-speciality', icon: <Layers className="w-5 h-5" />,        color: '#6366f1' },
    { label: 'Add Doctor',     key: 'add-doctor',     icon: <Users className="w-5 h-5" />,         color: '#2563eb' },
    { label: 'Add Hospital',   key: 'add-hospital',   icon: <Building2 className="w-5 h-5" />,     color: '#10b981' },
    { label: 'Add Treatment',  key: 'add-treatment',  icon: <ClipboardList className="w-5 h-5" />, color: '#f97316' },
    { label: 'Add Review',     key: 'add-review',     icon: <Star className="w-5 h-5" />,           color: '#8b5cf6' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Hospital Dashboard</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-xl"><Bell className="w-6 h-6 text-gray-600" /></button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: gradCard }}>DR</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['Day', 'Week', 'Month', 'Year'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${activeTab === tab ? 'text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200'}`}
            style={activeTab === tab ? { background: grad } : {}}>
            {tab}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 bg-white px-4 py-2 rounded-xl border shadow-sm">
          <span className="text-sm text-gray-600">📅 {monthName}</span>
        </div>
      </div>

      {/* Stats Cards — now 5 cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {statCards.map((s, i) => (
          <button key={i} onClick={() => setPage(s.key)}
            className={`rounded-2xl p-6 shadow-lg text-left transition-transform hover:scale-105 ${s.primary ? 'text-white' : 'bg-white border border-gray-100'}`}
            style={s.primary ? { background: gradCard } : {}}>
            <h3 className={`text-sm font-medium mb-2 ${s.primary ? 'text-blue-100' : 'text-gray-600'}`}>{s.label}</h3>
            <p className={`text-4xl font-bold mb-1 ${s.primary ? 'text-white' : 'text-gray-800'}`}>
              {loading ? '...' : s.value}
            </p>
            <p className={`text-xs ${s.primary ? 'text-blue-200' : 'text-gray-400'}`}>Click to view all</p>
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-5 gap-4">
          {quickActions.map(action => (
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
        {/* Overview */}
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            {statCards.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: ['#6366f1','#2563eb','#10b981','#f97316','#8b5cf6'][i] }}>
                  {[
                    <Layers className="w-5 h-5" />,
                    <Users className="w-5 h-5" />,
                    <Building2 className="w-5 h-5" />,
                    <ClipboardList className="w-5 h-5" />,
                    <Star className="w-5 h-5" />
                  ][i]}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{loading ? '...' : s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
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
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} className="text-xs text-gray-400 text-center font-medium">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => (
              <div key={idx} className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-all ${
                day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()
                  ? 'text-white font-bold' : day ? 'hover:bg-blue-50 text-gray-700 cursor-pointer' : ''
              }`} style={day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? { background: grad } : {}}>
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Generic List Page ────────────────────────────────────────────────────────
function ListPage({ title, fetchUrl, deleteUrl, idField, columns, renderRow, addKey, setPage }) {
  const [data, setData]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]             = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(fetchUrl, { withCredentials: true });
      const result = res.data?.data ?? res.data;
      setData(Array.isArray(result) ? result : []);
    } catch {
      setToast({ msg: 'Failed to load data', type: 'error' });
    } finally { setLoading(false); }
  }, [fetchUrl]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${deleteUrl}/${deleteTarget[idField]}`, { withCredentials: true });
      setToast({ msg: 'Deleted successfully!', type: 'success' });
      setData(prev => prev.filter(d => d[idField] !== deleteTarget[idField]));
    } catch {
      setToast({ msg: 'Delete failed. Try again.', type: 'error' });
    } finally { setDeleteTarget(null); }
  };

  const filtered = data.filter(item =>
    columns.some(col => String(item[col.key] ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-8">
      {deleteTarget && <ConfirmModal message={`Delete this ${title.replace('All ', '')}?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-500 text-sm mt-1">{data.length} total records</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 text-sm" />
          </div>
          <button onClick={fetchData} className="p-2 hover:bg-gray-100 rounded-xl" title="Refresh">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
          {addKey && (
            <button onClick={() => setPage(addKey)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium shadow"
              style={{ background: grad }}>
              <Plus className="w-4 h-4" /> Add New
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <RefreshCw className="w-6 h-6 animate-spin mr-3" /> Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <ClipboardList className="w-12 h-12 mb-3 opacity-20" />
            <p className="font-medium">No records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                  {columns.map(col => (
                    <th key={col.key} className="text-left py-4 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">{col.label}</th>
                  ))}
                  <th className="text-left py-4 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr key={item[idField] ?? idx} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                    <td className="py-4 px-5 text-sm text-gray-500">{idx + 1}</td>
                    {renderRow(item)}
                    <td className="py-4 px-5">
                      <button onClick={() => setDeleteTarget(item)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Specialities List ────────────────────────────────────────────────────────
function SpecialitiesListPage({ setPage }) {
  return (
    <ListPage
      title="All Specialities"
      fetchUrl={`${API}/specialities`}
      deleteUrl={`${API}/specialities`}
      idField="id"
      addKey="add-speciality"
      setPage={setPage}
      columns={[
        { key: 'name_en',   label: 'Name (EN)' },
        { key: 'name_hi',   label: 'Name (HI)' },
        { key: 'slug',      label: 'Slug' },
        { key: 'is_active', label: 'Status' },
      ]}
      renderRow={item => (<>
        <td className="py-4 px-5">
          <div className="flex items-center gap-3">
            {item.image
              ? <img src={item.image} alt="" className="w-9 h-9 rounded-lg object-cover border" />
              : <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white" style={{ background: '#6366f1' }}>
                  <Layers className="w-4 h-4" />
                </div>
            }
            <span className="font-semibold text-gray-800 text-sm">{item.name_en}</span>
          </div>
        </td>
        <td className="py-4 px-5 text-sm text-gray-600">{item.name_hi || '—'}</td>
        <td className="py-4 px-5 text-sm text-gray-500 font-mono">{item.slug || '—'}</td>
        <td className="py-4 px-5"><Badge active={item.is_active} /></td>
      </>)}
    />
  );
}

// ─── Doctors List ─────────────────────────────────────────────────────────────
function DoctorsListPage({ setPage }) {
  return (
    <ListPage
      title="All Doctors"
      fetchUrl={`${API}/doctors`}
      deleteUrl={`${API}/doctors`}
      idField="uuid"
      addKey="add-doctor"
      setPage={setPage}
      columns={[
        { key: 'name',               label: 'Name' },
        { key: 'email',              label: 'Email' },
        { key: 'specialities',       label: 'Specialities' },
        { key: 'city',               label: 'City' },
        { key: 'experience_in_years', label: 'Exp (yrs)' },
        { key: 'is_active',          label: 'Status' },
      ]}
      renderRow={item => (<>
        <td className="py-4 px-5">
          <div className="flex items-center gap-3">
            {item.photo
              ? <img src={item.photo} alt="" className="w-9 h-9 rounded-full object-cover border" />
              : <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: gradCard }}>{item.name?.[0] ?? 'D'}</div>
            }
            <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
          </div>
        </td>
        <td className="py-4 px-5 text-sm text-gray-600">{item.email}</td>
        <td className="py-4 px-5 text-sm text-gray-600">{Array.isArray(item.specialities) ? item.specialities.join(', ') : item.specialities || '—'}</td>
        <td className="py-4 px-5 text-sm text-gray-600">{item.city || '—'}</td>
        <td className="py-4 px-5 text-sm text-gray-600">{item.experience_in_years ?? '—'}</td>
        <td className="py-4 px-5"><Badge active={item.is_active} /></td>
      </>)}
    />
  );
}

// ─── Hospitals List ───────────────────────────────────────────────────────────
function HospitalsListPage({ setPage }) {
  return (
    <ListPage
      title="All Hospitals"
      fetchUrl={`${API}/hospitals`}
      deleteUrl={`${API}/hospitals`}
      idField="id"
      addKey="add-hospital"
      setPage={setPage}
      columns={[
        { key: 'name',      label: 'Name' },
        { key: 'city',      label: 'City' },
        { key: 'state',     label: 'State' },
        { key: 'phone',     label: 'Phone' },
        { key: 'is_active', label: 'Status' },
      ]}
      renderRow={item => (<>
        <td className="py-4 px-5">
          <div className="flex items-center gap-3">
            {item.photo
              ? <img src={item.photo} alt="" className="w-9 h-9 rounded-lg object-cover border" />
              : <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white" style={{ background: gradCard }}><Building2 className="w-4 h-4" /></div>
            }
            <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
          </div>
        </td>
        <td className="py-4 px-5 text-sm text-gray-600">{item.city || '—'}</td>
        <td className="py-4 px-5 text-sm text-gray-600">{item.state || '—'}</td>
        <td className="py-4 px-5 text-sm text-gray-600">{item.phone || '—'}</td>
        <td className="py-4 px-5"><Badge active={item.is_active} /></td>
      </>)}
    />
  );
}

// ─── Treatments List ──────────────────────────────────────────────────────────
function TreatmentsListPage({ setPage }) {
  const [data, setData]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]             = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/getAll`, { withCredentials: true });
      const result = res.data?.data ?? res.data;
      setData(Array.isArray(result) ? result : []);
    } catch { setToast({ msg: 'Failed to load treatments', type: 'error' }); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = data.filter(t => t.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8">
      {deleteTarget && <ConfirmModal message="Delete this treatment?" onConfirm={async () => {
        try { setToast({ msg: 'Delete not supported via API yet', type: 'error' }); }
        finally { setDeleteTarget(null); }
      }} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">All Treatments</h2>
          <p className="text-gray-500 text-sm mt-1">{data.length} total records</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 text-sm" />
          </div>
          <button onClick={fetchData} className="p-2 hover:bg-gray-100 rounded-xl"><RefreshCw className="w-5 h-5 text-gray-600" /></button>
          <button onClick={() => setPage('add-treatment')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium shadow" style={{ background: grad }}>
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400"><RefreshCw className="w-6 h-6 animate-spin mr-3" /> Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <ClipboardList className="w-12 h-12 mb-3 opacity-20" /><p>No treatments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['#','Name','Specialty ID','Duration','Stay','Recovery','Success Rate','Actions'].map(h => (
                    <th key={h} className="text-left py-4 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr key={item.id ?? idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-5 text-sm text-gray-500">{idx + 1}</td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        {item.treatment_image
                          ? <img src={item.treatment_image} alt="" className="w-9 h-9 rounded-lg object-cover border" />
                          : <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white" style={{ background: '#f97316' }}><ClipboardList className="w-4 h-4" /></div>
                        }
                        <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-sm text-gray-600">{item.specialty_id ?? '—'}</td>
                    <td className="py-4 px-5 text-sm text-gray-600">{item.surgery_duration || '—'}</td>
                    <td className="py-4 px-5 text-sm text-gray-600">{item.hospital_stay || '—'}</td>
                    <td className="py-4 px-5 text-sm text-gray-600">{item.recovery_time || '—'}</td>
                    <td className="py-4 px-5 text-sm text-gray-600">{item.success_rate || '—'}</td>
                    <td className="py-4 px-5">
                      <button onClick={() => setDeleteTarget(item)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Reviews List ─────────────────────────────────────────────────────────────
function ReviewsListPage({ setPage }) {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [toast, setToast]     = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/users/reviews`, { withCredentials: true });
      const result = res.data?.data ?? res.data;
      setData(Array.isArray(result) ? result : []);
    } catch { setToast({ msg: 'Failed to load reviews', type: 'error' }); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = data.filter(r =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.treatment?.toLowerCase().includes(search.toLowerCase()) ||
    r.city?.toLowerCase().includes(search.toLowerCase())
  );

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

  return (
    <div className="p-8">
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">All Reviews</h2>
          <p className="text-gray-500 text-sm mt-1">{data.length} total records</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 text-sm" />
          </div>
          <button onClick={fetchData} className="p-2 hover:bg-gray-100 rounded-xl"><RefreshCw className="w-5 h-5 text-gray-600" /></button>
          <button onClick={() => setPage('add-review')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium shadow" style={{ background: grad }}>
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400"><RefreshCw className="w-6 h-6 animate-spin mr-3" /> Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Star className="w-12 h-12 mb-3 opacity-20" /><p>No reviews found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['#','Name','Treatment','City','Rating','Date','Description'].map(h => (
                    <th key={h} className="text-left py-4 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr key={item.id ?? idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-5 text-sm text-gray-500">{idx + 1}</td>
                    <td className="py-4 px-5 font-semibold text-gray-800 text-sm">{item.name}</td>
                    <td className="py-4 px-5 text-sm text-gray-600">{item.treatment || '—'}</td>
                    <td className="py-4 px-5 text-sm text-gray-600">{item.city || '—'}</td>
                    <td className="py-4 px-5 text-yellow-500 text-sm">{stars(item.rating ?? 0)}</td>
                    <td className="py-4 px-5 text-sm text-gray-600">{item.date ? new Date(item.date).toLocaleDateString() : '—'}</td>
                    <td className="py-4 px-5 text-sm text-gray-600 max-w-xs truncate">{item.description || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function HospitalDashboard() {
  const [page, setPage] = useState('dashboard');
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // Verify session with backend on every mount
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) { router.replace('/login'); return; }
      try {
        await axios.get('http://localhost:4000/api/auth/check-auth', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
          timeout: 5000,
        });
        setAuthChecked(true);
      } catch {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        router.replace('/login');
      }
    };
    verifyAuth();
  }, []);

  // Block dashboard render until auth is confirmed — prevents flash
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-4 text-gray-500">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar activePage={page} setPage={setPage} />
      <div className="ml-64">
        {page === 'dashboard'          && <DashboardPage setPage={setPage} />}
        {page === 'add-speciality'     && <AddSpecialityForm />}           {/* ✅ */}
        {page === 'add-doctor'         && <AdminDoctorForm />}
        {page === 'add-hospital'       && <AdminHospitalForm />}
        {page === 'add-treatment'      && <TreatmentAdminForm />}
        {page === 'add-review'         && <ReviewForm />}
        {page === 'list-specialities'  && <SpecialitiesListPage setPage={setPage} />} {/* ✅ */}
        {page === 'list-doctors'       && <DoctorsListPage setPage={setPage} />}
        {page === 'list-hospitals'     && <HospitalsListPage setPage={setPage} />}
        {page === 'list-treatments'    && <TreatmentsListPage setPage={setPage} />}
        {page === 'list-reviews'       && <ReviewsListPage setPage={setPage} />}
      </div>
    </div>
  );
}