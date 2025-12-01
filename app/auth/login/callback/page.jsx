// // // // // 'use client';

// // // // // import { useEffect, useState } from 'react';
// // // // // import { useRouter, useSearchParams } from 'next/navigation';

// // // // // export default function Callback() {
// // // // //   const router = useRouter();
// // // // //   const searchParams = useSearchParams();
// // // // //   const code = searchParams.get('code');
// // // // //   const state = searchParams.get('state');
  
// // // // //   const [status, setStatus] = useState('processing');
// // // // //   const [userData, setUserData] = useState(null);
// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     const handleOAuthCallback = async () => {
// // // // //       if (!code || !state) return;

// // // // //       try {
// // // // //         // Validate state parameter
// // // // //         const storedState = sessionStorage.getItem('linkedin_oauth_state');
// // // // //         if (state !== storedState) {
// // // // //           throw new Error('Invalid state parameter');
// // // // //         }

// // // // //         // Exchange code for access token
// // // // //         const tokenResponse = await fetch('/api/auth/login/token', {
// // // // //           method: 'POST',
// // // // //           headers: {
// // // // //             'Content-Type': 'application/json',
// // // // //           },
// // // // //           body: JSON.stringify({ code }),
// // // // //         });

// // // // //         if (!tokenResponse.ok) {
// // // // //           const errorData = await tokenResponse.json();
// // // // //           throw new Error(errorData.error || 'Token exchange failed');
// // // // //         }

// // // // //         const { access_token } = await tokenResponse.json();

// // // // //         // Get user profile
// // // // //         const profileResponse = await fetch('/api/auth/login/profile', {
// // // // //           method: 'POST',
// // // // //           headers: {
// // // // //             'Content-Type': 'application/json',
// // // // //           },
// // // // //           body: JSON.stringify({ access_token }),
// // // // //         });

// // // // //         if (!profileResponse.ok) {
// // // // //           throw new Error('Failed to fetch profile');
// // // // //         }

// // // // //         const profileData = await profileResponse.json();
        
// // // // //         // Send to webhook
// // // // //         const webhookResponse = await fetch('/api/auth/login/webhook', {
// // // // //           method: 'POST',
// // // // //           headers: {
// // // // //             'Content-Type': 'application/json',
// // // // //           },
// // // // //           body: JSON.stringify({ profile: profileData }),
// // // // //         });

// // // // //         const webhookResult = await webhookResponse.json();

// // // // //         setUserData({
// // // // //           profile: profileData,
// // // // //           webhook: webhookResult,
// // // // //         });
// // // // //         setStatus('success');

// // // // //         // Clean up
// // // // //         sessionStorage.removeItem('linkedin_oauth_state');

// // // // //       } catch (err) {
// // // // //         setError(err.message);
// // // // //         setStatus('error');
// // // // //       }
// // // // //     };

// // // // //     if (code && state) {
// // // // //       handleOAuthCallback();
// // // // //     }
// // // // //   }, [code, state]);



// // // // //     // In your callback success section, add:
// // // // //     useEffect(() => {
// // // // //     if (status === 'success' && userData) {
// // // // //         // Store user data in localStorage or context
// // // // //         localStorage.setItem('user', JSON.stringify(userData.profile));
// // // // //         // Or use a state management solution
// // // // //     }
// // // // //     }, [status, userData]);



// // // // //   if (status === 'processing') {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
// // // // //           <p className="mt-4 text-gray-600">Processing LinkedIn login...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (status === 'error') {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // // //         <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
// // // // //           <div className="text-center">
// // // // //             <div className="text-red-600 text-6xl mb-4">❌</div>
// // // // //             <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Failed</h2>
// // // // //             <p className="text-gray-600 mb-4">{error}</p>
// // // // //             <button
// // // // //               onClick={() => router.push('/auth/login')}
// // // // //               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // // // //             >
// // // // //               Try Again
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (status === 'success' && userData) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gray-400 flex items-center justify-center">
// // // // //         <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
// // // // //           <div className="text-center">
// // // // //             <div className="text-green-600 text-6xl mb-4">✅</div>
// // // // //             <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Successful!</h2>
// // // // //             <p className="text-gray-600 mb-4">Welcome, {userData.profile.name}!</p>
            
// // // // //             <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left text-black">
// // // // //               <h3 className="font-semibold mb-2">User Info:</h3>
// // // // //               <p><strong>Name:</strong> {userData.profile.name}</p>
// // // // //               <p><strong>Email:</strong> {userData.profile.email}</p>
// // // // //               <p><strong>LinkedIn ID:</strong> {userData.profile.sub}</p>
// // // // //             </div>

// // // // //             <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left text-black">
// // // // //               <h3 className="font-semibold mb-2">Webhook Status:</h3>
// // // // //               <p><strong>Status:</strong> {userData.webhook.status}</p>
// // // // //               {userData.webhook.response && (
// // // // //                 <p><strong>Response:</strong> {userData.webhook.response}</p>
// // // // //               )}
// // // // //             </div>

// // // // //             <button
// // // // //               onClick={() => router.push('/')}
// // // // //               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // // // //             >
// // // // //               Go Home
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return null;
// // // // // }


















// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { useRouter, useSearchParams } from 'next/navigation';

// // // // export default function Callback() {
// // // //   const router = useRouter();
// // // //   const searchParams = useSearchParams();
// // // //   const code = searchParams.get('code');
// // // //   const state = searchParams.get('state');
  
// // // //   const [status, setStatus] = useState('processing');
// // // //   const [userData, setUserData] = useState(null);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const handleOAuthCallback = async () => {
// // // //       if (!code || !state) return;

// // // //       try {
// // // //         // Validate state parameter
// // // //         const storedState = sessionStorage.getItem('linkedin_oauth_state');
// // // //         if (state !== storedState) {
// // // //           throw new Error('Invalid state parameter');
// // // //         }

// // // //         // Exchange code for access token
// // // //         const tokenResponse = await fetch('/api/auth/login/token', {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify({ code }),
// // // //         });

// // // //         if (!tokenResponse.ok) {
// // // //           const errorData = await tokenResponse.json();
// // // //           throw new Error(errorData.error || 'Token exchange failed');
// // // //         }

// // // //         const { access_token } = await tokenResponse.json();

// // // //         // Get user profile with education and experience
// // // //         const profileResponse = await fetch('/api/auth/login/profile', {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify({ access_token }),
// // // //         });

// // // //         if (!profileResponse.ok) {
// // // //           throw new Error('Failed to fetch profile');
// // // //         }

// // // //         const profileData = await profileResponse.json();
        
// // // //         // Send to webhook
// // // //         const webhookResponse = await fetch('/api/auth/login/webhook', {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify({ profile: profileData }),
// // // //         });

// // // //         const webhookResult = await webhookResponse.json();

// // // //         // Store user data in localStorage
// // // //         localStorage.setItem('user', JSON.stringify(profileData));

// // // //         setUserData({
// // // //           profile: profileData,
// // // //           webhook: webhookResult,
// // // //         });
// // // //         setStatus('success');

// // // //         // Clean up
// // // //         sessionStorage.removeItem('linkedin_oauth_state');

// // // //       } catch (err) {
// // // //         setError(err.message);
// // // //         setStatus('error');
// // // //       }
// // // //     };

// // // //     if (code && state) {
// // // //       handleOAuthCallback();
// // // //     }
// // // //   }, [code, state]);

// // // //   // Format date function
// // // //   const formatDate = (dateObj) => {
// // // //     if (!dateObj) return 'Present';
// // // //     return `${dateObj.year}-${dateObj.month?.toString().padStart(2, '0') || '01'}`;
// // // //   };

// // // //   if (status === 'processing') {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
// // // //           <p className="mt-4 text-gray-600">Processing LinkedIn login...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (status === 'error') {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md">
// // // //           <div className="text-center">
// // // //             <div className="text-red-600 text-6xl mb-4">❌</div>
// // // //             <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Failed</h2>
// // // //             <p className="text-gray-600 mb-4">{error}</p>
// // // //             <button
// // // //               onClick={() => router.push('/auth/login')}
// // // //               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // // //             >
// // // //               Try Again
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (status === 'success' && userData) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 text-black">
// // // //         <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
// // // //           <div className="text-center mb-8">
// // // //             <div className="text-green-600 text-6xl mb-4">✅</div>
// // // //             <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Successful!</h2>
// // // //             <p className="text-gray-600 mb-4">Welcome, {userData.profile.name}!</p>
// // // //           </div>

// // // //           <div className="grid md:grid-cols-2 gap-6">
// // // //             {/* Basic Info */}
// // // //             <div className="bg-gray-100 p-4 rounded-lg">
// // // //               <h3 className="font-semibold text-lg mb-3">Basic Information</h3>
// // // //               <div className="space-y-2">
// // // //                 <p><strong>Name:</strong> {userData.profile.name}</p>
// // // //                 <p><strong>Email:</strong> {userData.profile.email}</p>
// // // //                 <p><strong>LinkedIn ID:</strong> {userData.profile.sub}</p>
// // // //               </div>
// // // //             </div>

// // // //             {/* Webhook Status */}
// // // //             <div className="bg-gray-100 p-4 rounded-lg">
// // // //               <h3 className="font-semibold text-lg mb-3">Webhook Status</h3>
// // // //               <p><strong>Status:</strong> {userData.webhook.status}</p>
// // // //               {userData.webhook.response && (
// // // //                 <p className="mt-2"><strong>Response:</strong> {userData.webhook.response}</p>
// // // //               )}
// // // //             </div>

// // // //             {/* Education */}
// // // //             <div className="bg-gray-100 p-4 rounded-lg md:col-span-2">
// // // //               <h3 className="font-semibold text-lg mb-3">
// // // //                 Education ({userData.profile.eduction?.length || 0})
// // // //               </h3>
// // // //               {userData.profile.education?.length > 0 ? (
// // // //                 <div className="space-y-4">
// // // //                   {userData.profile.education.map((edu, index) => (
// // // //                     <div key={index} className="border-l-4 border-blue-500 pl-4">
// // // //                       <h4 className="font-semibold">{edu.schoolName}</h4>
// // // //                       <p>{edu.fieldOfStudy} {edu.degreeName && `- ${edu.degreeName}`}</p>
// // // //                       <p className="text-sm text-gray-600">
// // // //                         {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
// // // //                       </p>
// // // //                       {edu.activities && (
// // // //                         <p className="text-sm mt-1">Activities: {edu.activities}</p>
// // // //                       )}
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               ) : (
// // // //                 <p className="text-gray-600">No education information available</p>
// // // //               )}
// // // //             </div>

// // // //             {/* Work Experience */}
// // // //             <div className="bg-gray-100 p-4 rounded-lg md:col-span-2">
// // // //               <h3 className="font-semibold text-lg mb-3">
// // // //                 Work Experience ({userData.profile.experience?.length || 0})
// // // //               </h3>
// // // //               {userData.profile.experience?.length > 0 ? (
// // // //                 <div className="space-y-4">
// // // //                   {userData.profile.experience.map((exp, index) => (
// // // //                     <div key={index} className="border-l-4 border-green-500 pl-4">
// // // //                       <h4 className="font-semibold">{exp.title}</h4>
// // // //                       <p>{exp.company?.name}</p>
// // // //                       <p className="text-sm text-gray-600">
// // // //                         {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
// // // //                       </p>
// // // //                       {exp.summary && (
// // // //                         <p className="text-sm mt-1">{exp.summary}</p>
// // // //                       )}
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               ) : (
// // // //                 <p className="text-gray-600">No work experience available</p>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           <div className="text-center mt-6">
// // // //             <button
// // // //               onClick={() => router.push('/dashboard')}
// // // //               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mr-4"
// // // //             >
// // // //               Go to Dashboard
// // // //             </button>
// // // //             <button
// // // //               onClick={() => router.push('/')}
// // // //               className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
// // // //             >
// // // //               Go Home
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return null;
// // // // }




























// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { useRouter, useSearchParams } from 'next/navigation';

// // // // export default function Callback() {
// // // //   const router = useRouter();
// // // //   const searchParams = useSearchParams();
// // // //   const code = searchParams.get('code');
// // // //   const state = searchParams.get('state');
  
// // // //   const [status, setStatus] = useState('processing');
// // // //   const [userData, setUserData] = useState(null);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const handleOAuthCallback = async () => {
// // // //       if (!code || !state) return;

// // // //       try {
// // // //         // Validate state parameter
// // // //         const storedState = sessionStorage.getItem('linkedin_oauth_state');
// // // //         if (state !== storedState) {
// // // //           throw new Error('Invalid state parameter');
// // // //         }

// // // //         // Exchange code for access token
// // // //         const tokenResponse = await fetch('/api/auth/login/token', {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify({ code }),
// // // //         });

// // // //         if (!tokenResponse.ok) {
// // // //           const errorData = await tokenResponse.json();
// // // //           throw new Error(errorData.error || 'Token exchange failed');
// // // //         }

// // // //         const { access_token } = await tokenResponse.json();

// // // //         // Get user profile
// // // //         const profileResponse = await fetch('/api/auth/login/profile', {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify({ access_token }),
// // // //         });

// // // //         if (!profileResponse.ok) {
// // // //           throw new Error('Failed to fetch profile');
// // // //         }

// // // //         const profileData = await profileResponse.json();
        
// // // //         // Send to webhook
// // // //         const webhookResponse = await fetch('/api/auth/login/webhook', {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify({ profile: profileData }),
// // // //         });

// // // //         const webhookResult = await webhookResponse.json();

// // // //         setUserData({
// // // //           profile: profileData,
// // // //           webhook: webhookResult,
// // // //         });
// // // //         setStatus('success');

// // // //         // Clean up
// // // //         sessionStorage.removeItem('linkedin_oauth_state');

// // // //       } catch (err) {
// // // //         setError(err.message);
// // // //         setStatus('error');
// // // //       }
// // // //     };

// // // //     if (code && state) {
// // // //       handleOAuthCallback();
// // // //     }
// // // //   }, [code, state]);



// // // //     // In your callback success section, add:
// // // //     useEffect(() => {
// // // //     if (status === 'success' && userData) {
// // // //         // Store user data in localStorage or context
// // // //         localStorage.setItem('user', JSON.stringify(userData.profile));
// // // //         // Or use a state management solution
// // // //     }
// // // //     }, [status, userData]);



// // // //   if (status === 'processing') {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
// // // //           <p className="mt-4 text-gray-600">Processing LinkedIn login...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (status === 'error') {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
// // // //           <div className="text-center">
// // // //             <div className="text-red-600 text-6xl mb-4">❌</div>
// // // //             <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Failed</h2>
// // // //             <p className="text-gray-600 mb-4">{error}</p>
// // // //             <button
// // // //               onClick={() => router.push('/auth/login')}
// // // //               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // // //             >
// // // //               Try Again
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (status === 'success' && userData) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-400 flex items-center justify-center">
// // // //         <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
// // // //           <div className="text-center">
// // // //             <div className="text-green-600 text-6xl mb-4">✅</div>
// // // //             <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Successful!</h2>
// // // //             <p className="text-gray-600 mb-4">Welcome, {userData.profile.name}!</p>
            
// // // //             <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left text-black">
// // // //               <h3 className="font-semibold mb-2">User Info:</h3>
// // // //               <p><strong>Name:</strong> {userData.profile.name}</p>
// // // //               <p><strong>Email:</strong> {userData.profile.email}</p>
// // // //               <p><strong>LinkedIn ID:</strong> {userData.profile.sub}</p>
// // // //             </div>

// // // //             <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left text-black">
// // // //               <h3 className="font-semibold mb-2">Webhook Status:</h3>
// // // //               <p><strong>Status:</strong> {userData.webhook.status}</p>
// // // //               {userData.webhook.response && (
// // // //                 <p><strong>Response:</strong> {userData.webhook.response}</p>
// // // //               )}
// // // //             </div>

// // // //             <button
// // // //               onClick={() => router.push('/')}
// // // //               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // // //             >
// // // //               Go Home
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return null;
// // // // }


















// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useRouter, useSearchParams } from 'next/navigation';

// // // export default function Callback() {
// // //   const router = useRouter();
// // //   const searchParams = useSearchParams();
// // //   const code = searchParams.get('code');
// // //   const state = searchParams.get('state');
  
// // //   const [status, setStatus] = useState('processing');
// // //   const [userData, setUserData] = useState(null);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const handleOAuthCallback = async () => {
// // //       if (!code || !state) return;

// // //       try {
// // //         // Validate state parameter
// // //         const storedState = sessionStorage.getItem('linkedin_oauth_state');
// // //         if (state !== storedState) {
// // //           throw new Error('Invalid state parameter');
// // //         }

// // //         // Exchange code for access token
// // //         const tokenResponse = await fetch('/api/auth/login/token', {
// // //           method: 'POST',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //           },
// // //           body: JSON.stringify({ code }),
// // //         });

// // //         if (!tokenResponse.ok) {
// // //           const errorData = await tokenResponse.json();
// // //           throw new Error(errorData.error || 'Token exchange failed');
// // //         }

// // //         const { access_token } = await tokenResponse.json();

// // //         // Get user profile with education and experience
// // //         const profileResponse = await fetch('/api/auth/login/profile', {
// // //           method: 'POST',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //           },
// // //           body: JSON.stringify({ access_token }),
// // //         });

// // //         if (!profileResponse.ok) {
// // //           throw new Error('Failed to fetch profile');
// // //         }

// // //         const profileData = await profileResponse.json();
        
// // //         // Send to webhook
// // //         const webhookResponse = await fetch('/api/auth/login/webhook', {
// // //           method: 'POST',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //           },
// // //           body: JSON.stringify({ profile: profileData }),
// // //         });

// // //         const webhookResult = await webhookResponse.json();

// // //         // Store user data in localStorage
// // //         localStorage.setItem('user', JSON.stringify(profileData));

// // //         setUserData({
// // //           profile: profileData,
// // //           webhook: webhookResult,
// // //         });
// // //         setStatus('success');

// // //         // Clean up
// // //         sessionStorage.removeItem('linkedin_oauth_state');

// // //       } catch (err) {
// // //         setError(err.message);
// // //         setStatus('error');
// // //       }
// // //     };

// // //     if (code && state) {
// // //       handleOAuthCallback();
// // //     }
// // //   }, [code, state]);

// // //   // Format date function
// // //   const formatDate = (dateObj) => {
// // //     if (!dateObj) return 'Present';
// // //     return `${dateObj.year}-${dateObj.month?.toString().padStart(2, '0') || '01'}`;
// // //   };

// // //   if (status === 'processing') {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
// // //           <p className="mt-4 text-gray-600">Processing LinkedIn login...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (status === 'error') {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md">
// // //           <div className="text-center">
// // //             <div className="text-red-600 text-6xl mb-4">❌</div>
// // //             <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Failed</h2>
// // //             <p className="text-gray-600 mb-4">{error}</p>
// // //             <button
// // //               onClick={() => router.push('/auth/login')}
// // //               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // //             >
// // //               Try Again
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (status === 'success' && userData) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 text-black">
// // //         <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
// // //           <div className="text-center mb-8">
// // //             <div className="text-green-600 text-6xl mb-4">✅</div>
// // //             <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Successful!</h2>
// // //             <p className="text-gray-600 mb-4">Welcome, {userData.profile.name}!</p>
// // //           </div>

// // //           <div className="grid md:grid-cols-2 gap-6">
// // //             {/* Basic Info */}
// // //             <div className="bg-gray-100 p-4 rounded-lg">
// // //               <h3 className="font-semibold text-lg mb-3">Basic Information</h3>
// // //               <div className="space-y-2">
// // //                 <p><strong>Name:</strong> {userData.profile.name}</p>
// // //                 <p><strong>Email:</strong> {userData.profile.email}</p>
// // //                 <p><strong>LinkedIn ID:</strong> {userData.profile.sub}</p>
// // //               </div>
// // //             </div>

// // //             {/* Webhook Status */}
// // //             <div className="bg-gray-100 p-4 rounded-lg">
// // //               <h3 className="font-semibold text-lg mb-3">Webhook Status</h3>
// // //               <p><strong>Status:</strong> {userData.webhook.status}</p>
// // //               {userData.webhook.response && (
// // //                 <p className="mt-2"><strong>Response:</strong> {userData.webhook.response}</p>
// // //               )}
// // //             </div>

// // //             {/* Education */}
// // //             <div className="bg-gray-100 p-4 rounded-lg md:col-span-2">
// // //               <h3 className="font-semibold text-lg mb-3">
// // //                 Education ({userData.profile.eduction?.length || 0})
// // //               </h3>
// // //               {userData.profile.education?.length > 0 ? (
// // //                 <div className="space-y-4">
// // //                   {userData.profile.education.map((edu, index) => (
// // //                     <div key={index} className="border-l-4 border-blue-500 pl-4">
// // //                       <h4 className="font-semibold">{edu.schoolName}</h4>
// // //                       <p>{edu.fieldOfStudy} {edu.degreeName && `- ${edu.degreeName}`}</p>
// // //                       <p className="text-sm text-gray-600">
// // //                         {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
// // //                       </p>
// // //                       {edu.activities && (
// // //                         <p className="text-sm mt-1">Activities: {edu.activities}</p>
// // //                       )}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               ) : (
// // //                 <p className="text-gray-600">No education information available</p>
// // //               )}
// // //             </div>

// // //             {/* Work Experience */}
// // //             <div className="bg-gray-100 p-4 rounded-lg md:col-span-2">
// // //               <h3 className="font-semibold text-lg mb-3">
// // //                 Work Experience ({userData.profile.experience?.length || 0})
// // //               </h3>
// // //               {userData.profile.experience?.length > 0 ? (
// // //                 <div className="space-y-4">
// // //                   {userData.profile.experience.map((exp, index) => (
// // //                     <div key={index} className="border-l-4 border-green-500 pl-4">
// // //                       <h4 className="font-semibold">{exp.title}</h4>
// // //                       <p>{exp.company?.name}</p>
// // //                       <p className="text-sm text-gray-600">
// // //                         {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
// // //                       </p>
// // //                       {exp.summary && (
// // //                         <p className="text-sm mt-1">{exp.summary}</p>
// // //                       )}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               ) : (
// // //                 <p className="text-gray-600">No work experience available</p>
// // //               )}
// // //             </div>
// // //           </div>

// // //           <div className="text-center mt-6">
// // //             <button
// // //               onClick={() => router.push('/dashboard')}
// // //               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mr-4"
// // //             >
// // //               Go to Dashboard
// // //             </button>
// // //             <button
// // //               onClick={() => router.push('/')}
// // //               className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
// // //             >
// // //               Go Home
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return null;
// // // }

















// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import CareerForm from '../../../components/CareerForm';

// // export default function Callback() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const code = searchParams.get('code');
// //   const state = searchParams.get('state');

// //   const [status, setStatus] = useState('processing');
// //   const [linkedin, setLinkedin] = useState(null);
// //   const [careerParams, setCareerParams] = useState(null);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const handleOAuthCallback = async () => {
// //       if (!code || !state) return;

// //       try {
// //         const storedState = sessionStorage.getItem('linkedin_oauth_state');
// //         if (state !== storedState) throw new Error('Invalid state parameter');

// //         // 1. Exchange Code → Token
// //         const tokenResp = await fetch('/api/auth/login/token', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ code }),
// //         });

// //         const { access_token } = await tokenResp.json();

// //         // 2. Get Profile
// //         const profileResp = await fetch('/api/auth/login/profile', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ access_token }),
// //         });

// //         const profileData = await profileResp.json();

// //         // 3. Fetch QR-code career params
// //         const params = JSON.parse(localStorage.getItem('career_query_params') || '{}');

// //         setLinkedin(profileData);
// //         setCareerParams(params);
// //         setStatus('form');

// //         sessionStorage.removeItem('linkedin_oauth_state');

// //       } catch (err) {
// //         setError(err.message);
// //         setStatus('error');
// //       }
// //     };

// //     handleOAuthCallback();
// //   }, [code, state]);

// //   if (status === 'processing') return <p>Processing...</p>;
// //   if (status === 'error') return <p>Error: {error}</p>;

// //   if (status === 'form' && linkedin && careerParams) {
// //     return (
// //       <CareerForm
// //         linkedin={linkedin}
// //         careerParams={careerParams}
// //       />
// //     );
// //   }

// //   return null;
// // }




















// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import CareerForm from '../../../components/CareerForm';

// export default function Callback() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get('code');
//   const state = params.get('state');

//   const [status, setStatus] = useState('processing');
//   const [profile, setProfile] = useState(null);
//   const [careerParams, setCareerParams] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const run = async () => {
//       if (!code || !state) return;

//       try {
//         const storedState = sessionStorage.getItem('linkedin_oauth_state');
//         if (state !== storedState) throw new Error('Invalid OAuth state');

//         // 1️⃣ Exchange code → token
//         const tokenRes = await fetch('/api/auth/login/token', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ code })
//         });
//         const tokenData = await tokenRes.json();
//         const accessToken = tokenData.access_token;

//         // Save token
//         sessionStorage.setItem("linkedin_access_token", accessToken);

//         // 2️⃣ Fetch LinkedIn Profile
//         const profileRes = await fetch('/api/auth/login/profile', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ access_token: accessToken })
//         });
//         const profileData = await profileRes.json();

//         setProfile(profileData);

//         // 3️⃣ Load career params
//         const params = JSON.parse(sessionStorage.getItem("career_query_params") || '{}');
//         console.log('Loaded career params:', params);
//         setCareerParams(params);

//         // 4️⃣ Send webhook (to n8n)
//         await fetch('/api/auth/login/webhook', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ profile: profileData, careerParams: params })
//         });

//         setStatus('form');
//         sessionStorage.removeItem('linkedin_oauth_state');

//       } catch (e) {
//         setError(e.message);
//         setStatus('error');
//       }
//     };

//     run();
//   }, [code, state]);

//   if (status === 'processing') return <p>Processing OAuth…</p>;
//   if (status === 'error') return <p>Error: {error}</p>;

//   if (status === 'form' && profile && careerParams) {
//     return <CareerForm linkedin={profile} careerParams={careerParams} />;
//   }

//   return null;
// }








































'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CareerForm from '../../../components/CareerForm';

// This component contains the core logic and uses useSearchParams()
function CallbackComponent() {
  const router = useRouter();
  // useSearchParams is a client-side hook, now safely rendered after Suspense
  const params = useSearchParams();
  const code = params.get('code');
  const state = params.get('state');

  const [status, setStatus] = useState('processing');
  const [profile, setProfile] = useState(null);
  const [careerParams, setCareerParams] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      // Exit if code or state are missing (should only happen during initial server render/suspense)
      if (!code || !state) return;

      try {
        const storedState = sessionStorage.getItem('linkedin_oauth_state');
        // Validate state parameter to prevent CSRF attacks
        if (state !== storedState) throw new Error('Invalid OAuth state');

        // 1️⃣ Exchange code → token
        const tokenRes = await fetch('/api/auth/login/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        // Save token
        sessionStorage.setItem("linkedin_access_token", accessToken);

        // 2️⃣ Fetch LinkedIn Profile
        const profileRes = await fetch('/api/auth/login/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_token: accessToken })
        });
        const profileData = await profileRes.json();

        setProfile(profileData);

        // 3️⃣ Load career params
        const params = JSON.parse(sessionStorage.getItem("career_query_params") || '{}');
        console.log('Loaded career params:', params);
        setCareerParams(params);

        // 4️⃣ Send webhook (to n8n/CRM/etc.)
        await fetch('/api/auth/login/webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile: profileData, careerParams: params })
        });

        setStatus('form');
        sessionStorage.removeItem('linkedin_oauth_state');

      } catch (e) {
        // Handle errors during the OAuth process
        setError(e.message || "An unknown error occurred during authentication.");
        setStatus('error');
      }
    };

    run();
  }, [code, state]); // Dependencies ensure this runs when code/state become available

  // UI rendering based on status
  if (status === 'processing') return <p>Processing OAuth…</p>;
  if (status === 'error') return <p>Error: {error}</p>;

  if (status === 'form' && profile && careerParams) {
    return <CareerForm linkedin={profile} careerParams={careerParams} />;
  }

  return null;
}

// The default export wraps the logic component in a Suspense boundary.
// This is the fix for the Vercel deployment error.
export default function Callback() {
  return (
    <Suspense fallback={<div>Loading authentication data...</div>}>
      <CallbackComponent />
    </Suspense>
  );
}