import { useSession } from 'next-auth/react';
import AuthForm from '../components/auth/auth-form';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function AuthPage() {
  const { session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/")
    }
  }, [router, session])

  if (status === 'loading') {
    return <h3>loading</h3>
  }
  return <AuthForm />;
}

export default AuthPage;
