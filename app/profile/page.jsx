'use client';

import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
// import Loading from '../../components/Loading';
// import ErrorMessage from '../../components/ErrorMessage';
// import Highlight from '../../components/Highlight';
import { TableRow, TableCell } from '@mui/material';

function Profile() {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <TableRow className="align-items-center profile-header mb-5 text-center text-md-left" data-testid="profile">
            <TableCell md={2}>
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                decode="async"
                data-testid="profile-picture"
              />
            </TableCell>
            <TableCell md>
              <h2 data-testid="profile-name">{user.name}</h2>
              <p className="lead text-muted" data-testid="profile-email">
                {user.email}
              </p>
            </TableCell>
          </TableRow>
          <TableRow data-testid="profile-json">
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </TableRow>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <>Loading</>,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
