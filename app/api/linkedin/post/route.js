// // // export async function POST(req) {
// // //   const { content, accessToken, authorUrn } = await req.json();

// // //   const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
// // //     method: "POST",
// // //     headers: {
// // //       Authorization: `Bearer ${accessToken}`,
// // //       "Content-Type": "application/json",
// // //       "X-Restli-Protocol-Version": "2.0.0",
// // //     },
// // //     body: JSON.stringify({
// // //       author: authorUrn,
// // //       lifecycleState: "PUBLISHED",
// // //       specificContent: {
// // //         "com.linkedin.ugc.ShareContent": {
// // //           shareCommentary: { text: content },
// // //           shareMediaCategory: "NONE",
// // //         },
// // //       },
// // //       visibility: {
// // //         "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
// // //       },
// // //     }),
// // //   });



// // //   const data = await res.json(); // ✅ read once

// // //   console.log("LinkedIn response:", data);

// // //   if (!res.ok) {
// // //     return Response.json(
// // //       { error: data },
// // //       { status: res.status }
// // //     );
// // //   }

// // //   return Response.json(data);


// // // //   return Response.json(await res.json());
// // // }



















// // import { createClient } from "@supabase/supabase-js";

// // export async function POST(req) {
// //   const { content, userId } = await req.json();

// //   const supabase = createClient(
// //     process.env.NEXT_PUBLIC_SUPABASE_URL,
// //     process.env.SUPABASE_SERVICE_ROLE_KEY
// //   );

// //   // Load LinkedIn token
// //   const { data: account } = await supabase
// //     .from("linkedin_accounts")
// //     .select("*")
// //     .eq("user_id", userId)
// //     .single();

// //   if (!account) {
// //     return Response.json(
// //       { error: "LinkedIn not connected" },
// //       { status: 400 }
// //     );
// //   }

// //   const res = await fetch(
// //     "https://api.linkedin.com/v2/ugcPosts",
// //     {
// //       method: "POST",
// //       headers: {
// //         Authorization: `Bearer ${account.access_token}`,
// //         "Content-Type": "application/json",
// //         "X-Restli-Protocol-Version": "2.0.0",
// //       },
// //       body: JSON.stringify({
// //         author: account.author_urn,
// //         lifecycleState: "PUBLISHED",
// //         specificContent: {
// //           "com.linkedin.ugc.ShareContent": {
// //             shareCommentary: { text: content },
// //             shareMediaCategory: "NONE",
// //           },
// //         },
// //         visibility: {
// //           "com.linkedin.ugc.MemberNetworkVisibility":
// //             "PUBLIC",
// //         },
// //       }),
// //     }
// //   );

// //   const data = await res.json();

// //   if (!res.ok) {
// //     console.error(data);
// //     return Response.json(data, { status: res.status });
// //   }

// //   return Response.json(data);
// // }



















// import { cookies } from "next/headers";
// import { createServerClient } from "@supabase/auth-helpers-nextjs";

// export async function POST(req) {
//   const cookieStore = await cookies(); // ✅ MUST await

//   console.log(
//     "Cookies:",
//     cookieStore.getAll().map(c => c.name)
//   );

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             cookieStore.set(name, value, options);
//           });
//         },
//       },
//     }
//   );

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return Response.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   const { content } = await req.json();

//   const { data, error } = await supabase
//     .from("linkedin_accounts")
//     .select("access_token, author_urn")
//     .eq("user_id", user.id)
//     .single();

//   if (error || !data) {
//     return Response.json({ error: "LinkedIn not connected" }, { status: 400 });
//   }

//   const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${data.access_token}`,
//       "Content-Type": "application/json",
//       "X-Restli-Protocol-Version": "2.0.0",
//     },
//     body: JSON.stringify({
//       author: data.author_urn,
//       lifecycleState: "PUBLISHED",
//       specificContent: {
//         "com.linkedin.ugc.ShareContent": {
//           shareCommentary: {
//             text: content,
//           },
//           shareMediaCategory: "NONE",
//         },
//       },
//       visibility: {
//         "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
//       },
//     }),
//   });

//   const responseData = await res.json();

//   if (!res.ok) {
//     console.error("LinkedIn error:", responseData);
//     return Response.json(responseData, { status: res.status });
//   }

//   return Response.json(responseData);
// }


















import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req) {
  try {
    console.log("=== LINKEDIN POST API CALLED ===");
    
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

    // Get user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    console.log("User found:", {
      exists: !!user,
      id: user?.id,
      email: user?.email,
      error: userError
    });

    if (!user) {
      console.error("ERROR: No authenticated user");
      return Response.json({ 
        error: "Not authenticated",
        details: "Please log in again"
      }, { status: 401 });
    }

    // Get request body
    const body = await req.json();
    const { content } = body;
    
    console.log("Content to post:", {
      contentPreview: content?.substring(0, 100) + (content?.length > 100 ? "..." : ""),
      contentLength: content?.length
    });

    if (!content || content.trim().length === 0) {
      console.error("ERROR: No content provided");
      return Response.json({ 
        error: "No content provided" 
      }, { status: 400 });
    }

    // Get LinkedIn connection - using service role for better reliability
    console.log("Fetching LinkedIn account for user:", user.id);
    
    const { createClient } = await import("@supabase/supabase-js");
    const supabaseService = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: linkedinData, error: linkedinError } = await supabaseService
      .from("linkedin_accounts")
      .select("access_token, author_urn, expires_at")
      .eq("user_id", user.id)
      .single();

    console.log("LinkedIn query result:", {
      hasData: !!linkedinData,
      dataExists: linkedinData ? "YES" : "NO",
      error: linkedinError?.message,
      authorUrn: linkedinData?.author_urn,
      tokenExists: !!linkedinData?.access_token,
      tokenPreview: linkedinData?.access_token ? 
        linkedinData.access_token.substring(0, 20) + "..." : "NO TOKEN"
    });

    if (linkedinError || !linkedinData) {
      console.error("ERROR: LinkedIn account not found or query failed:", linkedinError);
      return Response.json({ 
        error: "LinkedIn account not connected",
        details: linkedinError?.message || "No LinkedIn account found for user"
      }, { status: 400 });
    }

    // Check token expiry
    const now = new Date();
    const expiresAt = new Date(linkedinData.expires_at);
    const isExpired = expiresAt < now;
    
    console.log("Token expiry check:", {
      now: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      isExpired,
      daysUntilExpiry: Math.floor((expiresAt - now) / (1000 * 60 * 60 * 24))
    });

    if (isExpired) {
      console.error("ERROR: LinkedIn token expired");
      return Response.json({ 
        error: "LinkedIn token expired",
        details: `Token expired on ${expiresAt.toISOString()}`
      }, { status: 400 });
    }

    // Prepare LinkedIn API request
    const linkedinRequestBody = {
      author: linkedinData.author_urn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    console.log("Posting to LinkedIn API with:", {
      authorUrn: linkedinData.author_urn,
      contentLength: content.length,
      requestPreview: JSON.stringify(linkedinRequestBody).substring(0, 200) + "..."
    });

    // Make request to LinkedIn
    const linkedinResponse = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${linkedinData.access_token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify(linkedinRequestBody),
    });

    const responseData = await linkedinResponse.json();
    
    console.log("LinkedIn API Response:", {
      status: linkedinResponse.status,
      statusText: linkedinResponse.statusText,
      ok: linkedinResponse.ok,
      responseData: responseData
    });

    if (!linkedinResponse.ok) {
      console.error("LinkedIn API Error Details:", {
        status: linkedinResponse.status,
        error: responseData,
        headers: Object.fromEntries(linkedinResponse.headers.entries())
      });
      
      let errorMessage = "Failed to post to LinkedIn";
      if (responseData.message) {
        errorMessage += `: ${responseData.message}`;
      }
      if (responseData.serviceErrorCode) {
        errorMessage += ` (Error Code: ${responseData.serviceErrorCode})`;
      }
      
      return Response.json({ 
        error: errorMessage,
        details: responseData,
        status: linkedinResponse.status
      }, { status: linkedinResponse.status });
    }

    console.log("SUCCESS: Post created on LinkedIn!");
    return Response.json({
      success: true,
      message: "Post successfully published to LinkedIn",
      data: responseData
    });

  } catch (error) {
    console.error("Unexpected error in LinkedIn post route:", error);
    return Response.json({
      error: "Internal server error",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 });
  }
}