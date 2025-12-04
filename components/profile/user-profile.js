import { useSession } from 'next-auth/react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useEffect } from 'react';

function UserProfile() {
  const { session, status } = useSession();

  useEffect(() => {
    if (!session) {
      window.location.href = '/auth'
    }

  }, [session])

  if (status === 'loading') {
    return <h4 className={classes.profile}>Loading...</h4>
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
