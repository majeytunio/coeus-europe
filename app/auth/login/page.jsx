// 'use client';

// import { useState } from 'react';

// export default function Login() {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLinkedInLogin = () => {
//     setIsLoading(true);
    
//     const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || '78p5y4gf2aevxi';
//     const redirectUri = `${window.location.origin}/auth/login/callback`;
//     const scopes = 'openid profile email';
//     const state = Math.random().toString(36).substring(2, 15);
    
//     console.log('Redirect URI:', redirectUri); // Debug log
    
//     // Store state in sessionStorage for validation
//     sessionStorage.setItem('linkedin_oauth_state', state);
    
//     const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scopes)}`;
    
//     window.location.href = authUrl;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in with LinkedIn
//           </h2>
//         </div>
//         <div className="mt-8 space-y-6">
//           <button
//             onClick={handleLinkedInLogin}
//             disabled={isLoading}
//             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//           >
//             {isLoading ? 'Redirecting...' : 'Sign in with LinkedIn'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }











'use client';

import { useState } from 'react';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkedInLogin = () => {
    setIsLoading(true);
    
    const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || '78p5y4gf2aevxi';
    const redirectUri = `${window.location.origin}/auth/login/callback`;
    // Updated scopes - using only approved and available scopes
    const scopes = 'openid profile email';
    
    const state = Math.random().toString(36).substring(2, 15);
    
    // Store state in sessionStorage for validation
    sessionStorage.setItem('linkedin_oauth_state', state);
    
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scopes)}`;
    
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in with LinkedIn
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We'll access your basic profile information
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={handleLinkedInLogin}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Redirecting...' : 'Sign in with LinkedIn'}
          </button>
        </div>
      </div>
    </div>
  );
}