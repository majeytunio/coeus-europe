// /app/admin/linkedin-restore/page.jsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LinkedInRestorePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('Restoring your session...');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function restoreAndContinue() {
      try {
        const code = searchParams.get('code');
        const redirectUri = searchParams.get('redirect_uri');
        
        console.log("Restoration page - Code:", code ? "Present" : "Missing");
        console.log("Redirect URI:", redirectUri);
        
        if (!code) {
          setError('Missing authorization code from LinkedIn');
          setStatus('Error');
          return;
        }
        
        // Check if user is logged in
        setStatus('Checking authentication...');
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("Error getting user:", userError);
          setError('Authentication error. Please log in again.');
          setStatus('Error');
          return;
        }
        
        if (user) {
          console.log("User found:", user.id);
          setStatus('User authenticated! Completing LinkedIn connection...');
          
          // Call continue endpoint
          const response = await fetch('/api/linkedin/continue', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code,
              redirect_uri: redirectUri,
            }),
          });
          
          const result = await response.json();
          console.log("Continue endpoint response:", result);
          
          if (response.ok) {
            setStatus('LinkedIn connected successfully! Redirecting...');
            setTimeout(() => {
              router.push('/admin?success=LinkedIn+connected+successfully');
            }, 1500);
          } else {
            setError(result.error || 'Failed to connect LinkedIn');
            setStatus('Error');
            setTimeout(() => {
              router.push(`/admin?error=${encodeURIComponent(result.error || 'Connection failed')}`);
            }, 3000);
          }
        } else {
          setStatus('No active session found. Redirecting to login...');
          setTimeout(() => {
            router.push('/admin/login?error=Please+log+in+to+complete+LinkedIn+connection');
          }, 2000);
        }
      } catch (err) {
        console.error("Error in restoration:", err);
        setError('An unexpected error occurred');
        setStatus('Error');
      }
    }
    
    restoreAndContinue();
  }, [searchParams, router]);
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">{status}</h1>
        <p className="text-gray-600 text-sm">
          Please wait while we complete your LinkedIn connection...
        </p>
      </div>
    </div>
  );
}