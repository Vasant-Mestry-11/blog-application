import Link from 'next/link';

import classes from './main-navigation.module.css';
import { signOut, useSession } from 'next-auth/react';

function MainNavigation() {
  const { data, status } = useSession();

  const handleLogout = () => {
    signOut()
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!data && status === 'unauthenticated' && <li>
            <Link href="/auth">Login</Link>
          </li>}
          {status === 'authenticated' && <li>
            <Link href="/profile">Profile</Link>
          </li>}
          {status === 'authenticated' && <li>
            <button onClick={handleLogout}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
