'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

interface Appointment {
  id: number;
  schedule_id: string;
  customer_name: string;
  customer_email: string;
  service: string;
  notes: string;
  date: string;
  time_slot: string;
}

const AppointmentsTable = () => {
  // 1. ALL HOOKS MUST BE AT THE TOP
  const context = useContext(AuthContext);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const [searchDate, setSearchDate] = useState('');

  // 2. USEEFFECT MUST BE BEFORE ANY RETURN STATEMENTS
  useEffect(() => {
    // We handle the logic inside the hook instead of wrapping the hook in an 'if'
    const isLoggedIn = context?.isLoggedIn;
    const token = context?.token;

    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        // Using the token from context for the request
        const response = await fetch('/api/appointmentstable', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data: Appointment[] = await response.json();

        const sortedAppointments = data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setAppointments(sortedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [context?.isLoggedIn, context?.token]); 

  // 3. NOW WE CAN HANDLE CONDITIONAL RENDERING (RETURN STATEMENTS)
  if (!context) {
    return <p className="text-center py-10">Initializing Authentication...</p>;
  }

  const { isLoggedIn } = context;

  if (!isLoggedIn) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 font-semibold bg-red-50 inline-block px-4 py-2 rounded-md border border-red-200 shadow-sm">
          ⛔ Please log in to view the appointments dashboard.
        </p>
      </div>
    );
  }

  // Logic for filtering and pagination
  const filteredAppointments = appointments.filter((appt) =>
    appt.date.includes(searchDate)
  );

  const startIndex = currentPage * rowsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">📅 Appointments Management</h2>

      <div className="mb-6 max-w-md mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Filter by Date</label>
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="p-2 border border-blue-200 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 animate-pulse">Loading secure data...</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <p className="text-center text-gray-500 bg-gray-50 py-10 rounded-lg border border-dashed border-gray-300">
          No appointments found for this criteria.
        </p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">ID</th>
                <th className="py-3 px-4 text-left font-semibold">Customer</th>
                <th className="py-3 px-4 text-left font-semibold">Email</th>
                <th className="py-3 px-4 text-left font-semibold">Service</th>
                <th className="py-3 px-4 text-left font-semibold">Notes</th>
                <th className="py-3 px-4 text-left font-semibold">Date</th>
                <th className="py-3 px-4 text-left font-semibold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentAppointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-blue-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-600">{appt.id}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{appt.customer_name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{appt.customer_email}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{appt.service}</td>
                  <td className="py-3 px-4 text-sm text-gray-500 italic">{appt.notes || '—'}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-mono">{appt.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-semibold">{appt.time_slot}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center p-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentPage === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white border border-blue-500 text-blue-600 hover:bg-blue-50'
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 font-medium">
              Page {currentPage + 1}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={startIndex + rowsPerPage >= filteredAppointments.length}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                startIndex + rowsPerPage >= filteredAppointments.length
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTable;