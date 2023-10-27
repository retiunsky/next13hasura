import React from 'react';
import { getSession, getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';

import Highlight from '../../components/Highlight';

export default withPageAuthRequired(
  async function SSRPage() {
    const { user } = await getSession();
    const { accessToken } = await getAccessToken();
    console.log(accessToken);
    return (
      <>
        <div className="mb-5" data-testid="ssr">
          <h1 data-testid="ssr-title">Server-side Rendered Page</h1>
          
        </div>
        <div className="result-block-container" data-testid="ssr-json">
          <div className="result-block">
            <h6 className="muted">User</h6>
            <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
          </div>
        </div>
      </>
    );
  },
  { returnTo: '/ssr' }
);


