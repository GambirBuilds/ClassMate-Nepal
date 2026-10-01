import { useState } from 'react';
import { Search, User, PieChart } from 'lucide-react';

export default function StudentReport({ students, attendanceRecords }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.rollNo.includes(searchTerm)
  );

  const calculateReport = (studentId) => {
    const studentRecords = attendanceRecords.filter(r => r.studentId === studentId);
    const totalClasses = studentRecords.length;
    
    if (totalClasses === 0) return null;

    const present = studentRecords.filter(r => r.status === 'Present').length;
    const absent = studentRecords.filter(r => r.status === 'Absent').length;
    const late = studentRecords.filter(r => r.status === 'Late').length;
    
    // Late could count as half or full present, here we just count as present for percentage
    const percentage = Math.round(((present + late) / totalClasses) * 100);

    return { totalClasses, present, absent, late, percentage, records: studentRecords };
  };

  const report = selectedStudent ? calculateReport(selectedStudent.id) : null;

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 h-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Search size={20} className="text-blue-600" />
              Find Student
            </h3>
            
            <input
              type="text"
              placeholder="Search by name or roll no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors flex justify-between items-center ${
                      selectedStudent?.id === student.id 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'bg-white border border-gray-100 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{student.name}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      {student.rollNo}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic text-center py-4">No students found.</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          {selectedStudent ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User size={32} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h2>
                  <p className="text-gray-500">
                    Roll No: <span className="font-medium text-gray-700">{selectedStudent.rollNo}</span> | 
                    Class: <span className="font-medium text-gray-700">{selectedStudent.className}</span>
                  </p>
                </div>
              </div>

              {report ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Total Classes</p>
                      <p className="text-2xl font-bold text-gray-800">{report.totalClasses}</p>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                      <p className="text-xs text-green-600 font-semibold uppercase mb-1">Present</p>
                      <p className="text-2xl font-bold text-green-700">{report.present}</p>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-center">
                      <p className="text-xs text-red-600 font-semibold uppercase mb-1">Absent</p>
                      <p className="text-2xl font-bold text-red-700">{report.absent}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-center">
                      <p className="text-xs text-yellow-600 font-semibold uppercase mb-1">Late</p>
                      <p className="text-2xl font-bold text-yellow-700">{report.late}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <PieChart size={24} className="text-blue-600" />
                      <div>
                        <h4 className="font-bold text-blue-900">Attendance Percentage</h4>
                        <p className="text-sm text-blue-700">Calculated based on {report.totalClasses} recorded days.</p>
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-blue-600">
                      {report.percentage}%
                    </div>
                  </div>

                  <h4 className="font-bold text-gray-800 mb-4">Recent Attendance Records</h4>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="p-3 text-sm font-semibold text-gray-600">Date</th>
                          <th className="p-3 text-sm font-semibold text-gray-600">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.records.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map((record, idx) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-3 text-sm text-gray-800">
                              {new Date(record.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </td>
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                  <PieChart size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No Attendance Data</h3>
                  <p className="text-gray-500 text-sm">
                    There are no attendance records for this student yet.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-lg p-8 min-h-[400px]">
              <User size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">Select a Student</h3>
              <p className="text-gray-500 text-sm text-center">
                Select a student from the list on the left to view their detailed attendance report.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
