import { getServerSession } from 'next-auth';
import authOptions from '@/pages/api/auth/[...nextauth]'
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

export default ProfilePage;
