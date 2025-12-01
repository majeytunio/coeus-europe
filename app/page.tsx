// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
// //       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
// //       </main>
// //     </div>
// //   );
// // }





// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold text-gray-900 mb-8">
//           LinkedIn OAuth Demo
//         </h1>
//         <Link 
//           href="/auth/login"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
//         >
//           Login with LinkedIn
//         </Link>
//       </div>
//     </div>
//   );
// }













import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Professional LinkedIn Integration
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Connect your LinkedIn account to share your professional profile, education background, and work experience with our platform.
        </p>
        <div className="space-y-4">
          <Link 
            href="/auth/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300"
          >
            Connect LinkedIn Account
          </Link>
          <div>
            <Link 
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Go to Dashboard →
            </Link>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-blue-600 text-2xl mb-3">🎓</div>
            <h3 className="font-semibold mb-2">Education History</h3>
            <p className="text-gray-600 text-sm">Access your complete academic background and qualifications</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-green-600 text-2xl mb-3">💼</div>
            <h3 className="font-semibold mb-2">Work Experience</h3>
            <p className="text-gray-600 text-sm">Share your professional journey and career achievements</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-purple-600 text-2xl mb-3">🔒</div>
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600 text-sm">Your data is handled securely and with complete privacy</p>
          </div>
        </div>
      </div>
    </div>
  );
}