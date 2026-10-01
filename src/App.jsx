import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import Attendance from './components/Attendance';
import AttendanceHistory from './components/AttendanceHistory';
import StudentReport from './components/StudentReport';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State for students and attendance
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Load data from local storage on mount
  useEffect(() => {
    const storedStudents = localStorage.getItem('classmate_students');
    const storedAttendance = localStorage.getItem('classmate_attendance');
    
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    } else {
      // Seed data if empty
      const initialStudents = [
        { id: 1, rollNo: "01", name: "Aarav Sharma", className: "BCSIT - 1A" },
        { id: 2, rollNo: "02", name: "Bikash Thapa", className: "BCSIT - 1A" },
        { id: 3, rollNo: "03", name: "Priya Gurung", className: "BCSIT - 1A" },
        { id: 4, rollNo: "04", name: "Sushant Maharjan", className: "BCSIT - 1A" },
        { id: 5, rollNo: "05", name: "Neha Shrestha", className: "BCSIT - 1A" },
      ];
      setStudents(initialStudents);
      localStorage.setItem('classmate_students', JSON.stringify(initialStudents));
    }

    if (storedAttendance) {
      setAttendanceRecords(JSON.parse(storedAttendance));
    }
  }, []);

  // Update local storage when state changes
  useEffect(() => {
    localStorage.setItem('classmate_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('classmate_attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'students' && 'Student Management'}
              {activeTab === 'attendance' && 'Take Attendance'}
              {activeTab === 'history' && 'Attendance History'}
              {activeTab === 'report' && 'Student Report'}
            </h1>
            <p className="text-gray-600 mt-1">ClassMate Nepal - Smart Classroom Attendance</p>
          </header>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {activeTab === 'dashboard' && (
              <Dashboard students={students} attendanceRecords={attendanceRecords} />
            )}
            
            {activeTab === 'students' && (
              <StudentList students={students} setStudents={setStudents} />
            )}
            
            {activeTab === 'attendance' && (
              <Attendance 
                students={students} 
                attendanceRecords={attendanceRecords} 
                setAttendanceRecords={setAttendanceRecords} 
              />
            )}
            
            {activeTab === 'history' && (
              <AttendanceHistory 
                students={students} 
                attendanceRecords={attendanceRecords} 
              />
            )}
            
            {activeTab === 'report' && (
              <StudentReport 
                students={students} 
                attendanceRecords={attendanceRecords} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
