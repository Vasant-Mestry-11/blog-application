import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {

  const handleChangePassword = async ({
    oldPassword, newPassword
  }) => {

    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify({
        oldPassword, newPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();


    // add notification
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={handleChangePassword} />
    </section>
  );
}

export default UserProfile;
