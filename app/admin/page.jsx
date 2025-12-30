// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";

// export default function AdminPage() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     supabase
//       .from("linkedin_posts")
//       .select("*")
//       .eq("status", "pending")
//       .then(({ data }) => setPosts(data));
//   }, []);

//   return (
//     <div>
//       <h1>Pending LinkedIn Posts</h1>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <p>{post.content}</p>
//           <button onClick={() => approvePost(post.id)}>
//             Approve & Post
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }













"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthGuard } from "../../lib/useAuthGuard";


export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useAuthGuard();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from("linkedin_posts")
      .select("*")
      .order("created_at", { ascending: false });

    setPosts(data || []);
    setLoading(false);
  }

//   async function approvePost(post) {
//     await fetch("/api/linkedin/post", {
//       method: "POST",
//       body: JSON.stringify({ content: post.content }),
//     });

//     await supabase
//       .from("linkedin_posts")
//       .update({ status: "posted", posted_at: new Date() })
//       .eq("id", post.id);

//     fetchPosts();
//   }



//   async function approvePost(post) {
//     try {
//         console.log("Approving post:", post.id);
        
//         const response = await fetch("/api/linkedin/post", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ 
//             content: post.content,
//             postId: post.id 
//         }),
//         });

//         const result = await response.json();
        
//         console.log("Post API response:", {
//         ok: response.ok,
//         status: response.status,
//         result
//         });

//         if (!response.ok) {
//         console.error("Failed to post to LinkedIn:", result);
//         alert(`❌ Failed to post to LinkedIn:\n${result.error || result.details?.message || "Unknown error"}`);
//         return;
//         }

//         // Update database
//         const { error: updateError } = await supabase
//         .from("linkedin_posts")
//         .update({ 
//             status: "posted", 
//             posted_at: new Date(),
//             linkedin_response: result // Optional: store response for debugging
//         })
//         .eq("id", post.id);

//         if (updateError) {
//         console.error("Failed to update post status:", updateError);
//         alert("Post published to LinkedIn but failed to update local status");
//         } else {
//         console.log("Post status updated successfully");
//         alert("✅ Post successfully published to LinkedIn!");
//         }

//         fetchPosts();
//     } catch (error) {
//         console.error("Error in approvePost:", error);
//         alert("Error posting to LinkedIn. Check console for details.");
//     }
//   }



    async function approvePost(post) {
        try {
            console.log("Approving post:", post.id);
            
            const response = await fetch("/api/linkedin/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                content: post.content,
                postId: post.id 
            }),
            });

            const result = await response.json();
            
            console.log("Post API response:", {
            ok: response.ok,
            status: response.status,
            result
            });

            if (!response.ok) {
            console.error("Failed to post to LinkedIn:", result);
            alert(`❌ Failed to post to LinkedIn:\n${result.error || result.details?.message || "Unknown error"}`);
            return;
            }

            // SUCCESS! Post was published to LinkedIn
            console.log("✅ Successfully posted to LinkedIn! Share ID:", result.data?.id);
            
            // Update database - with better error handling
            const { data: updateData, error: updateError } = await supabase
            .from("linkedin_posts")
            .update({ 
                status: "posted", 
                posted_at: new Date().toISOString(), // Use ISO string format
                linkedin_share_id: result.data?.id || result.id // Store the LinkedIn share ID
            })
            .eq("id", post.id)
            .select(); // Add .select() to see what was updated

            console.log("Database update result:", {
            updateData,
            updateError,
            postId: post.id
            });

            if (updateError) {
            console.error("Failed to update post status:", updateError);
            
            // Check if it's a specific error
            if (updateError.code === '42501') {
                alert("Permission denied to update post. Check your RLS policies.");
            } else if (updateError.code === '23505') {
                alert("Duplicate entry or constraint violation.");
            } else {
                alert(`Post published to LinkedIn but database update failed: ${updateError.message}`);
            }
            } else {
            console.log("✅ Post status updated successfully in database");
            alert(`✅ Post successfully published to LinkedIn!\nShare ID: ${result.data?.id || result.id}`);
            
            // Refresh the posts list
            fetchPosts();
            }

        } catch (error) {
            console.error("Error in approvePost:", error);
            alert("Error in approval process. Check console for details.");
        }
    }



  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            LinkedIn Admin Panel
          </h1>

                      
          <button
            onClick={() => window.location.href = "/admin/create-post"}
            className="text-sm text-green-600 hover:underline"
          >
            Create Post
          </button>


          <button
            onClick={() => window.location.href = "/admin/settings"}
            className="text-sm text-red-600 hover:underline"
          >
            Connect LinkedIn
          </button>

          <button
            onClick={logout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-lg font-medium mb-6 text-gray-600">
          Pending & Approved Posts
        </h2>

        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onApprove={approvePost} />
          ))}
        </div>
      </main>
    </div>
  );
}


function PostCard({ post, onApprove }) {
  const [content, setContent] = useState(post.content);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            post.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : post.status === "posted"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {post.status.toUpperCase()}
        </span>

        <span className="text-xs text-gray-600">
          {new Date(post.created_at).toLocaleString()}
        </span>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full min-h-[120px] border rounded-md p-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-end gap-3 mt-4">
        {post.status === "pending" && (
          <button
            onClick={() => onApprove({ ...post, content })}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Approve & Post
          </button>
        )}
      </div>
    </div>
  );
}
