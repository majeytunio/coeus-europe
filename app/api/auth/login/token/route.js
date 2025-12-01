export async function POST(request) {
  try {
    const { code } = await request.json();

    // Use the exact same redirect URI as in the login
    const redirectUri = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/login/callback`;

    console.log('Token exchange redirect URI:', redirectUri); // Debug log

    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri, // Use the variable
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('LinkedIn token error:', errorText);
      throw new Error(`LinkedIn API error: ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    return Response.json(tokenData);
  } catch (error) {
    console.error('Token exchange error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}