const preload = (content, resourcePath) => {
  if (resourcePath.match(/app-extras\.module\.ts$/)) {
    return `${content}
/* tslint:disable:max-line-length */

import { SkyAppBootstrapper, SkyAppWindowRef } from '@blackbaud/skyux-builder/runtime';
import { AddinClient } from '@blackbaud/sky-api-addin';

function addQSParam(url: string, name: string, value: string): string {
  const urlAndFragment = url.split('#');

  urlAndFragment[0] += urlAndFragment[0].indexOf('?') >= 0 ? '&' : '?';
  urlAndFragment[0] += name + '=' + encodeURIComponent(value);

  return urlAndFragment.join('#');
}

/* istanbul ignore next */
(SkyAppBootstrapper as any).processBootstrapConfig = () => {

  const bootstrapPromise = new Promise((resolve, reject) => {
    const client = new AddinClient({
      callbacks: {
        init: (args) => {
          const url = SkyAppBootstrapper.getUrl();

          history.replaceState(
            {},
            '',
            addQSParam(url, 'envid', args.envId)
          );
          window.__bbAddinClient = client;
          resolve();
        }
      }
    });
  });
  return bootstrapPromise;

/* tslint:enable:max-line-length */
`;
  }

  return content;
};

module.exports = {
  preload
};
