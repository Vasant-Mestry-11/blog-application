import { useSession } from 'next-auth/react';
import AuthForm from '../components/auth/auth-form';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function AuthPage() {
  const { status } = useSession();

  if (status === 'loading') {
    return <h3>loading</h3>
  }
  return <AuthForm />;
}

export default AuthPage;
