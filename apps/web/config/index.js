import axios from "axios";

import ailabApi from "@ailab/api-client/ailabApi";

axios.interceptors.response.use((r) => r.data);

const req = (params) => axios(params);

const config = {
  useSentry: process.env.USE_SENTRY === "true",
  ailabApiUrl: process.env.AILAB_API_URL,
  socketUrl: 'ws://api.ailab.internal:3030',
};

ailabApi.init({ req, baseUrl: config.ailabApiUrl });

export default config;
