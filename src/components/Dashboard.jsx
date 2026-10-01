import { Users, UserCheck, UserX, Clock } from 'lucide-react';

export default function Dashboard({ students, attendanceRecords }) {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Filter attendance for today
  const todaysAttendance = attendanceRecords.filter(record => record.date === today);
  
  const totalStudents = students.length;
  const presentToday = todaysAttendance.filter(r => r.status === 'Present').length;
  const absentToday = todaysAttendance.filter(r => r.status === 'Absent').length;
  const lateToday = todaysAttendance.filter(r => r.status === 'Late').length;
  
  // Calculate percentage based on total students if today's attendance has been taken,
  // or default to 0 if no attendance taken yet.
  let attendancePercentage = 0;
  if (todaysAttendance.length > 0) {
    attendancePercentage = Math.round(((presentToday + lateToday) / totalStudents) * 100);
  }

  const statCards = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: <Users size={24} className="text-blue-600" />,
      bg: 'bg-blue-100',
    },
    {
      title: 'Present Today',
      value: presentToday,
      icon: <UserCheck size={24} className="text-green-600" />,
      bg: 'bg-green-100',
    },
    {
      title: 'Absent Today',
      value: absentToday,
      icon: <UserX size={24} className="text-red-600" />,
      bg: 'bg-red-100',
    },
    {
      title: 'Late Today',
      value: lateToday,
      icon: <Clock size={24} className="text-yellow-600" />,
      bg: 'bg-yellow-100',
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-full ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-1">Today's Attendance Overview</h3>
          <p className="text-blue-700 text-sm">
            {todaysAttendance.length > 0 
              ? `Attendance recorded for ${todaysAttendance.length} out of ${totalStudents} students.`
              : 'Attendance has not been recorded for today yet.'}
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-white p-4 rounded-lg shadow-sm text-center min-w-[150px]">
          <p className="text-xs text-gray-500 font-medium mb-1">Overall Percentage</p>
          <p className="text-3xl font-bold text-blue-600">{attendancePercentage}%</p>
        </div>
      </div>
    </div>
  );
}
