import { Fragment } from 'react';

import MainNavigation from './main-navigation';
import { SessionProvider } from 'next-auth/react';

function Layout(props) {
  const { session } = props
  return (
    <SessionProvider session={session}>
      <Fragment>
        <MainNavigation />
        <main>{props.children}</main>
      </Fragment>
    </SessionProvider>
  );
}

export default Layout;
