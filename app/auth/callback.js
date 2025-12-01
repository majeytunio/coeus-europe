import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Callback() {
  const router = useRouter();
  const { code, state } = router.query;
  const [status, setStatus] = useState('processing');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (!code || !state) return;

      try {
        // Validate state parameter
        const storedState = sessionStorage.getItem('linkedin_oauth_state');
        if (state !== storedState) {
          throw new Error('Invalid state parameter');
        }

        // Exchange code for access token
        const tokenResponse = await fetch('/api/linkedin/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json();
          throw new Error(errorData.error || 'Token exchange failed');
        }

        const { access_token } = await tokenResponse.json();

        // Get user profile
        const profileResponse = await fetch('/api/linkedin/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token }),
        });

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch profile');
        }

        const profileData = await profileResponse.json();
        
        // Send to webhook
        const webhookResponse = await fetch('/api/linkedin/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ profile: profileData }),
        });

        const webhookResult = await webhookResponse.json();

        setUserData({
          profile: profileData,
          webhook: webhookResult,
        });
        setStatus('success');

        // Clean up
        sessionStorage.removeItem('linkedin_oauth_state');

      } catch (err) {
        setError(err.message);
        setStatus('error');
      }
    };

    if (code && state) {
      handleOAuthCallback();
    }
  }, [code, state]);

  if (status === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing LinkedIn login...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <div className="text-center">
            <div className="text-red-600 text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Failed</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success' && userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <div className="text-center">
            <div className="text-green-600 text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Successful!</h2>
            <p className="text-gray-600 mb-4">Welcome, {userData.profile.name}!</p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left">
              <h3 className="font-semibold mb-2">User Info:</h3>
              <p><strong>Name:</strong> {userData.profile.name}</p>
              <p><strong>Email:</strong> {userData.profile.email}</p>
              <p><strong>LinkedIn ID:</strong> {userData.profile.sub}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left">
              <h3 className="font-semibold mb-2">Webhook Status:</h3>
              <p><strong>Status:</strong> {userData.webhook.status}</p>
              {userData.webhook.response && (
                <p><strong>Response:</strong> {userData.webhook.response}</p>
              )}
            </div>

            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}