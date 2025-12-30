"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthGuard } from "../../../lib/useAuthGuard";


export default function CreatePostPage() {
    
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedPost, setGeneratedPost] = useState("");
    
    useAuthGuard();

  async function generatePost() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const res = await fetch("/api/generate-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
        userId: user.id,
      }),
    });

    const data = await res.json();
    setGeneratedPost(data.content);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Create LinkedIn Post
          <button
            onClick={() => window.location.href = "/admin"}
            className="text-sm text-blue-600 ml-4 float-right hover:underline"
          >
            Back to Admin
          </button>
        </h1>

        <button
            onClick={() => window.location.href = "/admin/create-post"}
            className="text-sm text-green-600"
          >
            Create Post
        </button>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Post Topic
        </label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Launching a new SaaS feature"
          className="w-full border rounded-md px-3 py-2 mb-4 placeholder-gray-400 text-gray-800"
        />

        <button
          onClick={generatePost}
          disabled={loading || !topic}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate with AI"}
        </button>

        {generatedPost && (
          <>
            <h2 className="text-lg font-medium mt-6 mb-2 text-gray-800">
              Generated Post
            </h2>
            <textarea
              value={generatedPost}
              readOnly
              className="w-full min-h-[150px] border rounded-md p-3 text-sm text-gray-800"
            />
            <p className="text-sm text-green-600 mt-2">
              ✅ Saved for admin approval
            </p>
          </>
        )}
      </div>
    </div>
  );
}
