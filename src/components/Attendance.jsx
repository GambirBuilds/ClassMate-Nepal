import { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';

export default function Attendance({ students, attendanceRecords, setAttendanceRecords }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentAttendance, setCurrentAttendance] = useState({});
  const [saveMessage, setSaveMessage] = useState('');

  // When date changes, load existing attendance or initialize
  useEffect(() => {
    const existingRecordsForDate = attendanceRecords.filter(r => r.date === selectedDate);
    
    if (existingRecordsForDate.length > 0) {
      // Load existing records into state
      const recordsMap = {};
      existingRecordsForDate.forEach(r => {
        recordsMap[r.studentId] = r.status;
      });
      setCurrentAttendance(recordsMap);
    } else {
      // Reset to empty if no records
      setCurrentAttendance({});
    }
    setSaveMessage('');
  }, [selectedDate, attendanceRecords]);

  const handleStatusChange = (studentId, status) => {
    setCurrentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
    setSaveMessage('');
  };

  const markAllAs = (status) => {
    const newAttendance = {};
    students.forEach(student => {
      newAttendance[student.id] = status;
    });
    setCurrentAttendance(newAttendance);
    setSaveMessage('');
  };

  const saveAttendance = () => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    if (Object.keys(currentAttendance).length === 0) {
      alert("Please mark attendance for at least one student.");
      return;
    }

    // Remove old records for this date
    const otherDatesRecords = attendanceRecords.filter(r => r.date !== selectedDate);
    
    // Create new records
    const newRecords = Object.entries(currentAttendance).map(([studentId, status]) => ({
      date: selectedDate,
      studentId: parseInt(studentId),
      status
    }));

    // Save
    setAttendanceRecords([...otherDatesRecords, ...newRecords]);
    setSaveMessage('Attendance saved successfully!');
    
    setTimeout(() => {
      setSaveMessage('');
    }, 3000);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="font-medium text-gray-700 whitespace-nowrap">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => markAllAs('Present')}
            className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded text-sm hover:bg-green-100 whitespace-nowrap"
          >
            Mark All Present
          </button>
          <button
            onClick={() => markAllAs('Absent')}
            className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded text-sm hover:bg-red-100 whitespace-nowrap"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle size={18} />
          {saveMessage}
        </div>
      )}

      <div className="overflow-x-auto border border-gray-200 rounded-lg mb-6">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-sm font-semibold text-gray-600">Roll No</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Student Name</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => {
                const status = currentAttendance[student.id];
                return (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-sm font-medium text-gray-700">{student.rollNo}</td>
                    <td className="p-4 text-sm text-gray-800">{student.name}</td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleStatusChange(student.id, 'Present')}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            status === 'Present' 
                              ? 'bg-green-500 text-white shadow-sm' 
                              : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 border border-transparent'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'Absent')}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            status === 'Absent' 
                              ? 'bg-red-500 text-white shadow-sm' 
                              : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 border border-transparent'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'Late')}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            status === 'Late' 
                              ? 'bg-yellow-500 text-white shadow-sm' 
                              : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 border border-transparent'
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-500">
                  No students found. Please add students first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveAttendance}
          disabled={students.length === 0}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          Save Attendance
        </button>
      </div>
    </div>
  );
}
