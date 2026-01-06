// /app/admin/linkedin-restore/page.jsx
"use client";

import { Suspense } from 'react';
import LinkedInRestoreContent from './LinkedInRestoreContent';

export default function LinkedInRestorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-800">Loading...</h1>
        </div>
      </div>
    }>
      <LinkedInRestoreContent />
    </Suspense>
  );
}