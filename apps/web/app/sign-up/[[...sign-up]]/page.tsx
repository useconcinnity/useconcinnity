'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex w-full flex-col items-center justify-center px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Get Started</h1>
          <p className="mt-2 text-gray-600">Create your Concinnity account</p>
        </div>
        <div className="flex w-full items-center justify-center">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full flex justify-center',
                card: 'shadow-xl w-full max-w-md',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

