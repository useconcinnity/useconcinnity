'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex w-full flex-col items-center justify-center px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to Concinnity</p>
        </div>
        <div className="flex w-full items-center justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full flex justify-center',
                card: 'shadow-xl w-full max-w-md',
              },
            }}
            routing="path"
            path="/sign-in"
          />
        </div>
      </div>
    </div>
  );
}

