import {signIn, useSession} from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

export default function Login() {
  const [signing, setSigning] = useState(false);
  const {data: session, status} = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  const [startedRouterPush, setStartedRouterPush] = useState(false);

  // const handleGithubLogin = async (e) => {
  //   e.preventDefault();
  //   setSigning(true);
  //   await signIn('github');
  // };

  const handleGoogleLogin = async (e) => {
      e.preventDefault();
      setSigning(true);
      await signIn('google');
    };


  useEffect(() => {
    if (session && !loading) {
      if (startedRouterPush) return;
      router.push('/');
      setStartedRouterPush(true);
    }
  }, [session, loading, startedRouterPush, router]);

  return (
    <div>
      <section className="h-screen py-10 lg:py-20 bg-purple-500">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="mb-10 text-center ">
              <Link href="/" className="text-white text-3xl font-bold leading-none">
                MakersMatch
              </Link>
            </div>
            <div className="p-6 lg:p-12 bg-white shadow-md rounded">
              <div className="mb-6 px-3 text-center">
                <span className="text-gray-500">Sign In</span>
                <h3 className="text-2xl font-bold">Join our community</h3>
              </div>
              <form action="">
                <div className="text-center">
                  <button
                    className="mt-8 mb-4 p-4 flex justify-center items-center border rounded hover:bg-gray-50"
                    onClick={handleGoogleLogin}>
                    <picture>
                      <img className="mr-4 w-6" src="/google.svg" alt="" />
                    </picture>
                    <span className="text-xs text-gray-500 font-bold">
                      {!signing && 'Sign In with Google'}
                      {signing && 'Signing in ...'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
