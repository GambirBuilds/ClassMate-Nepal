import { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function AttendanceHistory({ students, attendanceRecords }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Get all unique dates from records
  const availableDates = [...new Set(attendanceRecords.map(r => r.date))].sort().reverse();

  // Filter records for selected date
  const dateRecords = attendanceRecords.filter(r => r.date === selectedDate);
  
  // Calculate stats
  const presentCount = dateRecords.filter(r => r.status === 'Present').length;
  const absentCount = dateRecords.filter(r => r.status === 'Absent').length;
  const lateCount = dateRecords.filter(r => r.status === 'Late').length;

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-blue-600" />
              Select Date
            </h3>
            
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              <p className="text-sm font-medium text-gray-500 mb-2">Available Dates:</p>
              {availableDates.length > 0 ? (
                availableDates.map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedDate === date 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">No attendance records found.</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          {dateRecords.length > 0 ? (
            <div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                  <p className="text-xs text-green-600 font-semibold uppercase mb-1">Present</p>
                  <p className="text-2xl font-bold text-green-700">{presentCount}</p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-center">
                  <p className="text-xs text-red-600 font-semibold uppercase mb-1">Absent</p>
                  <p className="text-2xl font-bold text-red-700">{absentCount}</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-center">
                  <p className="text-xs text-yellow-600 font-semibold uppercase mb-1">Late</p>
                  <p className="text-2xl font-bold text-yellow-700">{lateCount}</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-3 text-sm font-semibold text-gray-600">Roll No</th>
                      <th className="p-3 text-sm font-semibold text-gray-600">Student Name</th>
                      <th className="p-3 text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => {
                      const record = dateRecords.find(r => r.studentId === student.id);
                      if (!record) return null;
                      
                      return (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 text-sm text-gray-800">{student.rollNo}</td>
                          <td className="p-3 text-sm text-gray-800">{student.name}</td>
                          <td className="p-3 text-sm">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              record.status === 'Present' ? 'bg-green-100 text-green-800' :
                              record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-lg p-8">
              <Calendar size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No Records Found</h3>
              <p className="text-gray-500 text-sm text-center">
                There are no attendance records for {selectedDate}. <br/>
                Please select another date or take attendance for this day.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
