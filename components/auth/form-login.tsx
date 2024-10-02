'use client';

import axios from 'axios';
import * as crypto from 'crypto';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter()
  const handleSubmit = async (value: FormData) => {
    const urlParams = new URLSearchParams(window.location.search);
    const responseType = urlParams.get('response_type');
    const clientId = urlParams.get('client_id');
    const clientSecret = urlParams.get('client_secret');
    const redirectUri = urlParams.get('redirect_uri');
    const codeChallengeMethod = urlParams.get('code_challenge_method');

    try {
      const { data } = await axios.post(
        'http://localhost:5000/oauth/authorize',
        {
          email: value.get('email'),
          password: value.get('password'),
          code_challenge: process.env.NEXT_PUBLIC_CODE_CHALLENGE,
          code_challenge_method: codeChallengeMethod,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret,
          response_type: responseType,
          state: crypto.randomBytes(16).toString('hex'),
        },
      );
      console.log('dataUser:', data);
      if (data) {
        
        router.push(data)
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
    //   throw new Error('Function not implemented.');
  };

  return (
    <div className="items-center p-5">
      <form action={handleSubmit} className="space-y-2">
        <div>
          <label htmlFor="email" className="">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            required
            className="border rounded"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border rounded"
          />
        </div>
        <button type="submit" className="py-2 px-3 bg-gray-200 rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
};
