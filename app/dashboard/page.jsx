// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (!userData) {
//       router.push('/auth/login');
//       return;
//     }
//     setUser(JSON.parse(userData));
//   }, [router]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8 text-black">
//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
//         <div className="space-y-4">
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>LinkedIn ID:</strong> {user.sub}</p>
//         </div>
//         <button
//           onClick={() => {
//             localStorage.removeItem('user');
//             router.push('/');
//           }}
//           className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
















'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const formatDate = (dateObj) => {
    if (!dateObj) return 'Present';
    return `${dateObj.year}-${dateObj.month?.toString().padStart(2, '0') || '01'}`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold">Professional Dashboard</h1>
            <p className="text-blue-100">Welcome back, {user.name}!</p>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Basic Info Card */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>LinkedIn ID:</strong> {user.sub}</p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Profile Summary</h2>
                <div className="space-y-2">
                  <p><strong>Education Records:</strong> {user.education?.length || 0}</p>
                  <p><strong>Work Experiences:</strong> {user.experience?.length || 0}</p>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Actions</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      localStorage.removeItem('user');
                      router.push('/');
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Education</h2>
              {user.education?.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {user.education.map((edu, index) => (
                    <div key={index} className="bg-white border-l-4 border-blue-500 p-4 rounded shadow-sm">
                      <h3 className="font-semibold text-lg">{edu.schoolName}</h3>
                      <p className="text-gray-700">{edu.fieldOfStudy} {edu.degreeName && `- ${edu.degreeName}`}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.activities && (
                        <p className="text-sm text-gray-600 mt-2">Activities: {edu.activities}</p>
                      )}
                      {edu.description && (
                        <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 bg-gray-50 p-4 rounded">No education information available</p>
              )}
            </div>

            {/* Work Experience Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Work Experience</h2>
              {user.experience?.length > 0 ? (
                <div className="space-y-4">
                  {user.experience.map((exp, index) => (
                    <div key={index} className="bg-white border-l-4 border-green-500 p-4 rounded shadow-sm">
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-gray-700">{exp.company?.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        {!exp.endDate && <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Current</span>}
                      </p>
                      {exp.summary && (
                        <p className="text-gray-600 mt-2">{exp.summary}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 bg-gray-50 p-4 rounded">No work experience available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}