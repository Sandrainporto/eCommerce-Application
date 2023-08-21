import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './BuildClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'rss-nightcoders' });

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getProject = () => {
  return apiRoot.get().execute();
};

// Retrieve Project information and output the result to the log
getProject().then(console.log).catch(console.error);

export { createApiBuilderFromCtpClient };
