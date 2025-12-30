// // export async function GET(req) {
// //   const { searchParams } = new URL(req.url);
// //   const code = searchParams.get("code");

// //   const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
// //     body: new URLSearchParams({
// //       grant_type: "authorization_code",
// //       code,
// //       redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
// //       client_id: process.env.LINKEDIN_CLIENT_ID,
// //       client_secret: process.env.LINKEDIN_CLIENT_SECRET,
// //     }),
// //   });

// //   const tokenData = await tokenRes.json();

// //   // Store access_token securely (Supabase or encrypted storage)
// //   return new Response("LinkedIn Connected");
// // }






// // import { createClient } from "@supabase/supabase-js";
// // import { cookies } from "next/headers";

// // export async function GET(req) {
// //   const { searchParams } = new URL(req.url);
// //   const code = searchParams.get("code");

// //   if (!code) {
// //     return new Response("Missing code", { status: 400 });
// //   }

// //   // 1️⃣ Exchange code for access token
// //   const tokenRes = await fetch(
// //     "https://www.linkedin.com/oauth/v2/accessToken",
// //     {
// //       method: "POST",
// //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
// //       body: new URLSearchParams({
// //         grant_type: "authorization_code",
// //         code,
// //         redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
// //         client_id: process.env.LINKEDIN_CLIENT_ID,
// //         client_secret: process.env.LINKEDIN_CLIENT_SECRET,
// //       }),
// //     }
// //   );

// //   const tokenData = await tokenRes.json();

// //   if (!tokenData.access_token) {
// //     console.error(tokenData);
// //     return new Response("OAuth failed", { status: 400 });
// //   }

// //   // 2️⃣ Get LinkedIn user info (author URN)
// //   const userInfoRes = await fetch(
// //     "https://api.linkedin.com/v2/userinfo",
// //     {
// //       headers: {
// //         Authorization: `Bearer ${tokenData.access_token}`,
// //       },
// //     }
// //   );

// //   const userInfo = await userInfoRes.json();
// //   const authorUrn = `urn:li:person:${userInfo.sub}`;

// //   // 3️⃣ Get logged-in Supabase user
// //   const supabase = createClient(
// //     process.env.NEXT_PUBLIC_SUPABASE_URL,
// //     process.env.SUPABASE_SERVICE_ROLE_KEY,
// //     {
// //       cookies,
// //     }
// //   );

// //   const {
// //     data: { user },
// //   } = await supabase.auth.getUser();

// //   if (!user) {
// //     return new Response("Not authenticated", { status: 401 });
// //   }

// //   // 4️⃣ Store token in Supabase
// //   await supabase.from("linkedin_accounts").upsert({
// //     user_id: user.id,
// //     access_token: tokenData.access_token,
// //     expires_at: new Date(
// //       Date.now() + tokenData.expires_in * 1000
// //     ),
// //     author_urn: authorUrn,
// //   });

// //   // 5️⃣ Redirect back to admin
// //   return Response.redirect(
// //     new URL("/admin", req.url)
// //   );
// // }




// import { createClient } from "@supabase/supabase-js";
// import { cookies } from "next/headers";

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const code = searchParams.get("code");

//   if (!code) {
//     return new Response("Missing code", { status: 400 });
//   }

//   // 1️⃣ Exchange code for access token
//   const tokenRes = await fetch(
//     "https://www.linkedin.com/oauth/v2/accessToken",
//     {
//         method: "POST",
//         headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//         grant_type: "authorization_code",
//         code,
//         redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
//         client_id: process.env.LINKEDIN_CLIENT_ID,
//         client_secret: process.env.LINKEDIN_CLIENT_SECRET,
//         }),
//     }
//   );


//   const tokenData = await tokenRes.json();

//   if (!tokenData.access_token) {
//     console.error(tokenData);
//     return new Response("OAuth failed", { status: 400 });
//   }

//   // 2️⃣ Get LinkedIn user info (author URN)
//   const userInfoRes = await fetch(
//     "https://api.linkedin.com/v2/userinfo",
//     {
//       headers: {
//         Authorization: `Bearer ${tokenData.access_token}`,
//       },
//     }
//   );

//   const userInfo = await userInfoRes.json();
//   const authorUrn = `urn:li:person:${userInfo.sub}`;

//   // 3️⃣ Get logged-in Supabase user
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.SUPABASE_SERVICE_ROLE_KEY,
//     {
//       cookies,
//     }
//   );

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     const profileRes = await fetch(
//     "https://api.linkedin.com/v2/userinfo",
//     {
//         headers: {
//         Authorization: `Bearer ${tokenData.access_token}`,
//         },
//     }
//     );

//     const profile = await profileRes.json();
//     console.log("LinkedIn Profile:", profile);

//     return Response.redirect(
//         new URL("/admin", req.url)
//     );

//     // return new Response("Not authenticated", { status: 401 });
//   }

//   // 4️⃣ Store token in Supabase
//   await supabase.from("linkedin_accounts").upsert({
//     user_id: user.id,
//     access_token: tokenData.access_token,
//     expires_at: new Date(
//       Date.now() + tokenData.expires_in * 1000
//     ),
//     author_urn: authorUrn,
//   });

//   // 5️⃣ Redirect back to admin
//   return Response.redirect(
//     new URL("/admin", req.url)
//   );
// }















import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
  console.log("=== LINKEDIN CALLBACK STARTED ===");
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  console.log("Auth code received:", code ? "YES" : "NO");

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  // Create Supabase client with auth helpers
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  // Get current user WITH the auth helpers client
  console.log("Getting current user...");
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  console.log("User data:", {
    userExists: !!user,
    userId: user?.id,
    userEmail: user?.email,
    error: userError
  });

  if (!user) {
    console.log("No authenticated user found!");
    // Store LinkedIn data temporarily and redirect to login?
    // For now, let's redirect to admin with an error message
    const url = new URL("/admin", req.url);
    url.searchParams.set("error", "Please log in first, then connect LinkedIn.");
    return Response.redirect(url);
  }

  // 1️⃣ Exchange code for access token
  console.log("Exchanging code for token...");
  const tokenRes = await fetch(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
    }
  );

  const tokenData = await tokenRes.json();
  console.log("Token response:", {
    hasAccessToken: !!tokenData.access_token,
    expiresIn: tokenData.expires_in,
    error: tokenData.error
  });

  if (!tokenData.access_token) {
    console.error("Token exchange failed:", tokenData);
    return new Response("OAuth failed: " + JSON.stringify(tokenData), { status: 400 });
  }

  // 2️⃣ Get LinkedIn user info (author URN)
  console.log("Getting user info from LinkedIn...");
  const userInfoRes = await fetch(
    "https://api.linkedin.com/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    }
  );

  const userInfo = await userInfoRes.json();
  console.log("LinkedIn user info:", userInfo);
  
  const authorUrn = `urn:li:person:${userInfo.sub}`;
  console.log("Author URN:", authorUrn);

  // 4️⃣ Store token in Supabase - use service role for this
  console.log("Attempting to save to linkedin_accounts table...");
  
  // Create a service role client for database operations
  const { createClient: createServiceClient } = await import("@supabase/supabase-js");
  const supabaseService = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: upsertData, error: upsertError } = await supabaseService
    .from("linkedin_accounts")
    .upsert({
      user_id: user.id,
      access_token: tokenData.access_token,
      expires_at: new Date(Date.now() + tokenData.expires_in * 1000),
      author_urn: authorUrn,
      updated_at: new Date(),
    })
    .select();

  console.log("Upsert result:", {
    data: upsertData,
    error: upsertError,
    message: upsertError?.message
  });

  if (upsertError) {
    console.error("Failed to save LinkedIn account:", upsertError);
    const url = new URL("/admin", req.url);
    url.searchParams.set("error", "Failed to save LinkedIn connection.");
    return Response.redirect(url);
  }

  console.log("SUCCESS: LinkedIn account saved!");
  console.log("Saved data:", upsertData);

  // 5️⃣ Redirect back to admin with success message
  const url = new URL("/admin", req.url);
  url.searchParams.set("success", "LinkedIn connected successfully!");
  return Response.redirect(url);
}