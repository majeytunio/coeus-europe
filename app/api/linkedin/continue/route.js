// /app/api/linkedin/continue/route.js
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req) {
  try {
    const { code, redirect_uri } = await req.json();
    
    console.log("=== LINKEDIN CONTINUE ENDPOINT ===");
    console.log("Received code:", code ? "YES" : "NO");
    console.log("Redirect URI:", redirect_uri);
    
    if (!code) {
      return Response.json({ error: "Missing authorization code" }, { status: 400 });
    }

    // Get authenticated user
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

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    console.log("User in continue endpoint:", {
      exists: !!user,
      id: user?.id,
      error: userError?.message
    });

    if (!user) {
      return Response.json({ error: "No authenticated user found" }, { status: 401 });
    }

    // Exchange code for LinkedIn token
    console.log("Exchanging code for LinkedIn token...");
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
          redirect_uri: redirect_uri || process.env.LINKEDIN_REDIRECT_URI,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        }),
      }
    );

    const tokenData = await tokenRes.json();
    
    console.log("Token exchange result:", {
      hasToken: !!tokenData.access_token,
      error: tokenData.error
    });

    if (!tokenData.access_token) {
      console.error("Token exchange failed:", tokenData);
      return Response.json({ 
        error: "Failed to exchange code for LinkedIn token",
        details: tokenData 
      }, { status: 400 });
    }

    // Get LinkedIn user info
    console.log("Getting LinkedIn user info...");
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

    // Save to database using service role
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: upsertData, error: upsertError } = await supabaseAdmin
      .from("linkedin_accounts")
      .upsert({
        user_id: user.id,
        access_token: tokenData.access_token,
        expires_at: new Date(Date.now() + tokenData.expires_in * 1000),
        author_urn: authorUrn,
        updated_at: new Date(),
      })
      .select();

    console.log("Database save result:", {
      success: !upsertError,
      error: upsertError?.message,
      data: upsertData
    });

    if (upsertError) {
      return Response.json({ 
        error: "Failed to save LinkedIn account to database",
        details: upsertError.message 
      }, { status: 500 });
    }

    return Response.json({ 
      success: true, 
      message: "LinkedIn account connected successfully",
      data: upsertData 
    });

  } catch (error) {
    console.error("Error in continue endpoint:", error);
    return Response.json({ 
      error: "Internal server error",
      details: error.message 
    }, { status: 500 });
  }
}