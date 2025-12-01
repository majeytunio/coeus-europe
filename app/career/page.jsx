// // 'use client';

// // import { useSearchParams, useRouter } from 'next/navigation';
// // import { useEffect } from 'react';

// // export default function CareerEntryPage() {
// //   const searchParams = useSearchParams();
// //   const router = useRouter();

// //   useEffect(() => {
// //     const query = Object.fromEntries(searchParams.entries());
// //     localStorage.setItem('career_query_params', JSON.stringify(query));

// //     // redirect to LinkedIn login
// //     router.push('/auth/login');
// //   }, []);

// //   return (
// //     <div className="min-h-screen flex items-center justify-center">
// //       <p>Redirecting to LinkedIn...</p>
// //     </div>
// //   );
// // }





// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function CareerEntryPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     // Convert query params to an object
//     const query = Object.fromEntries(searchParams.entries());

//     // Store in sessionStorage (NOT localStorage)
//     // This ensures the data only lives for this OAuth session.
//     sessionStorage.setItem('career_query_params', JSON.stringify(query));

//     // Redirect to LinkedIn login
//     router.push('/auth/login');
//   }, []); // run once

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p>Redirecting to LinkedIn...</p>
//     </div>
//   );
// }























'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CareerEntryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const query = Object.fromEntries(searchParams.entries());
    sessionStorage.setItem('career_query_params', JSON.stringify(query));

    console.log('Career query params stored:', query);

    // If already authenticated, do NOT redirect to login again
    const hasToken = sessionStorage.getItem("linkedin_access_token");
    if (hasToken) return;

    router.push('/auth/login');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to LinkedIn...</p>
    </div>
  );
}
