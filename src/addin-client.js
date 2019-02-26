const preload = (content, resourcePath) => {
  if (resourcePath.match(/app-extras\.module\.ts$/)) {
    return `${content}
/* tslint:disable:max-line-length */

import { SkyAppBootstrapper } from '@skyux-sdk/builder/runtime';
import { AddinClient } from '@blackbaud/sky-addin-client';

function addQSParam(url: string, name: string, value: string): string {
  const urlAndFragment = url.split('#');

  urlAndFragment[0] += urlAndFragment[0].indexOf('?') >= 0 ? '&' : '?';
  urlAndFragment[0] += name + '=' + encodeURIComponent(value);

  return urlAndFragment.join('#');
}

/* istanbul ignore next */
(SkyAppBootstrapper as any).processBootstrapConfig = () => {

  const bootstrapPromise = new Promise((resolve, reject) => {
    let client: AddinClient;
    try {
      client = new AddinClient({
        callbacks: {
          init: (args) => {
            const url = window.location.href;

            history.replaceState(
              {},
              '',
              addQSParam(url, 'envid', args.envId)
            );
            client.destroy();
            resolve();
          }
        }
      });
    } catch (e) {
      client.destroy();
      reject(e);
    }
  });
  return bootstrapPromise;
};

/* tslint:enable:max-line-length */
`;
  }

  return content;
};

module.exports = {
  preload
};
