'use client';

import { useState, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

interface AppointmentSchedule {
  id: number;
  date: string;
  time_slot: string;
}

const SearchAppointments = () => {
  // 1. Always call hooks at the top level
  const context = useContext(AuthContext);

  const [searchDate, setSearchDate] = useState('');
  const [appointments, setAppointments] = useState<AppointmentSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 2. Safety Check for TypeScript (TS 2339)
  // If the context isn't ready yet, we return a neutral state.
  if (!context) {
    return (
      <div className="p-6 text-center text-gray-500">
        Initializing authentication...
      </div>
    );
  }

  // 3. Destructure now that we are 100% sure context exists
  const { isLoggedIn, token } = context;

  // Fetch appointments by date
  const fetchAppointments = async () => {
    if (!searchDate) {
      setError('Please select a date.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      // Using the token for extra security if your API requires it
      const response = await fetch(`/api/searchbardelete?date=${searchDate}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setAppointments(data);
      } else {
        setError(data.error || 'Error fetching data');
      }
    } catch (err) {
      setError('Something went wrong. Try again later.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete an appointment slot
  const deleteSlot = async (id: number) => {
    // Confirm before deleting
    if (!window.confirm('Are you sure you want to delete this slot?')) return;

    try {
      const response = await fetch(`/api/searchbardelete?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      } else {
        setError('Error deleting slot.');
      }
    } catch (err) {
      setError('Failed to delete slot.');
      console.log(err);
    }
  };

  // 4. Conditional UI check
  if (!isLoggedIn) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 font-semibold bg-red-50 inline-block px-4 py-2 rounded-md border border-red-200">
          ⛔ Please log in to search and manage appointment slots.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-900">🔍 Search Appointments</h2>

      {/* Search Input */}
      <div className="flex justify-center gap-4 mb-4">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border border-blue-200 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-black"
        />
        <button
          onClick={fetchAppointments}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white font-medium transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Status Messages */}
      {error && <p className="text-center text-red-500 mb-4 font-medium">{error}</p>}

      {/* Results Table */}
      {appointments.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm max-w-2xl mx-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Time Slot</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-4 text-gray-700">{appt.date}</td>
                  <td className="py-2 px-4 text-gray-900 font-semibold">{appt.time_slot}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => deleteSlot(appt.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm font-medium"
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && searchDate && <p className="text-center text-gray-400 mt-4">No slots found for this date.</p>
      )}
    </div>
  );
};

export default SearchAppointments;
