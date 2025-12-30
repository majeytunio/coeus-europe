"use client";

export default function LinkedInSettingsPage() {
  function connectLinkedIn() {
    window.location.href = "/api/linkedin/login";
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">
        LinkedIn Connection
      </h1>

      <button
        onClick={connectLinkedIn}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Connect LinkedIn Account
      </button>
    </div>
  );
}
