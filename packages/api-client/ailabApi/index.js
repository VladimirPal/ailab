export function apiFactory(props) {
  const apiCommonMethods = props?.methods ?? [
    ["signin", "/api/auth/signin", "POST"],
    ["signup", "/api/auth/signup", "POST"],
    ["me", "/api/accounts/me", "GET"],
  ];

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer null",
    "Content-Type": "application/json",
  };
  let makeRequest = props?.makeRequest ?? (() => {});
  let mockMethods = {};
  let token = null;
  let apiBaseUrl = null;

  /* eslint-disable */
  function fillUrlTemplate(template, templateVars) {
    const re = new RegExp("{", "g");
    return new Function(
      `return \`${template.replace(re, '${this.')}\`;`
    ).call(templateVars);
  }
  /* eslint-enable */

  function buildQueryUrl(endpointUrl, params = {}) {
    const urlInstance = new URL(
      `${apiBaseUrl}${fillUrlTemplate(endpointUrl, params)}`,
    );

    urlInstance.search = new URLSearchParams(params);
    return urlInstance.toString();
  }

  function performFetch({ methodName, endpointUrl, method, params, body }) {
    const url = buildQueryUrl(endpointUrl, params);

    if (mockMethods[methodName]) {
      return mockMethods[methodName]({
        ...params,
        url,
        endpointUrl,
        headers,
        ...(Object.keys(body).length
          ? {
              data: JSON.stringify(body),
            }
          : {}),
      });
    }

    return makeRequest({
      url,
      method,
      headers,
      ...(Object.keys(body).length
        ? {
            data: JSON.stringify(body),
          }
        : {}),
    });
  }

  return {
    init({ req, baseUrl }) {
      if (req) {
        makeRequest = req;
      }
      if (baseUrl) {
        apiBaseUrl = baseUrl;
      }
    },

    setMockMethods(mockObject, merge = true) {
      mockMethods = merge
        ? {
            ...mockMethods,
            ...mockObject,
          }
        : mockObject;

      return mockMethods;
    },

    clearMockMethods() {
      mockMethods = {};
      return mockMethods;
    },

    setJWT(jwt) {
      token = jwt;
      headers.Authorization = `Bearer ${jwt}`;
    },

    getJWT() {
      return token;
    },

    getBaseUrl() {
      return apiBaseUrl;
    },

    ...apiCommonMethods.reduce(
      (acc, [methodName, endpointUrl, method = "GET"]) => ({
        ...acc,
        [methodName](
          { params = {}, body = {} } = {
            params: {},
            body: {},
          },
        ) {
          return performFetch({
            methodName,
            endpointUrl,
            method,
            params,
            body,
          });
        },
      }),
      {},
    ),
  };
}

const api = apiFactory();

export default api;
