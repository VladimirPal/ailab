import { useEffect } from 'react';

import socketHelper from '@ailab/ui-toolkit/helpers/socketHelper';
import ailabApi from '@ailab/api-client/ailabApi';

import appConfig from '../../config';

function IndexPage() {

  useEffect(() => {
    const jwt = ailabApi.getJWT();
    socketHelper.connect({
      JWT: jwt,
      socketUrl: appConfig.socketUrl,
    });
  }, []);

  return (
    <div>Index Page</div>
  );
}
export default IndexPage;
