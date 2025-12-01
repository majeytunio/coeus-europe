// export async function POST(request) {
//   try {
//     const { access_token } = await request.json();

//     const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
//       headers: {
//         'Authorization': `Bearer ${access_token}`,
//       },
//     });

//     if (!profileResponse.ok) {
//       throw new Error('Failed to fetch profile from LinkedIn');
//     }

//     const profileData = await profileResponse.json();
//     return Response.json(profileData);
//   } catch (error) {
//     console.error('Profile fetch error:', error);
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }







export async function POST(request) {
  try {
    const { access_token } = await request.json();

    // Fetch basic profile info - this should work with openid profile email scopes
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch profile from LinkedIn');
    }

    const profileData = await profileResponse.json();

    // For now, return basic profile data only
    // Education and work experience require additional permissions
    return Response.json({
      ...profileData,
      education: [], // Empty for now
      experience: [] // Empty for now
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}