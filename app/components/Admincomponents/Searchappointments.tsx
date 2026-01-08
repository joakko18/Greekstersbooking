'use client';

import { useState, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext'; // Import AuthContext

interface AppointmentSchedule {
  id: number;
  date: string;
  time_slot: string;
}

const SearchAppointments = () => {
  const { isLoggedIn } = useContext(AuthContext); // Check if the user is logged in
  const [searchDate, setSearchDate] = useState('');
  const [appointments, setAppointments] = useState<AppointmentSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch appointments by date
  const fetchAppointments = async () => {
    if (!searchDate) {
      setError('Please select a date.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/searchbardelete?date=${searchDate}`);
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
    try {
      const response = await fetch(`/api/searchbardelete?id=${id}`, {
        method: 'DELETE',
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

  // If the user is not logged in, hide the component
  if (!isLoggedIn) {
    return <p className="text-center text-red-500">Please log in to search for appointments.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center">🔍 Search Appointments</h2>

      {/* Search Input */}
      <div className="flex justify-center gap-4 mb-4">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border p-2 rounded-md"
        />
        <button
          onClick={fetchAppointments}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Results Table */}
      {appointments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Time Slot</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-b hover:bg-gray-100 transition">
                  <td className="py-2 px-4">{appt.date}</td>
                  <td className="py-2 px-4">{appt.time_slot}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deleteSlot(appt.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchAppointments;
