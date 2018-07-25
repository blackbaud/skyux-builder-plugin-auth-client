/* node: true */

describe('Auth Email Whitelist plugin', () => {
  let plugin;

  beforeEach(() => {
    plugin = require('./auth-email-whitelist');
  });

  it('should contain a preload hook', () => {
    expect(plugin.preload).toBeDefined();
  });

  it('should only change the content of the app-extras.module.ts file', () => {
    let content = '<p></p>';
    let path = 'sample.service.ts';
    let skyAppConfig = {
      skyux: {}
    };
    let result = plugin.preload(content, path, skyAppConfig);
    expect(result).toBe(content);
    skyAppConfig.skyux['auth'] = true;
    content = '{}';
    path = 'app-extras.module.ts';
    result = plugin.preload(content, path, skyAppConfig);
    expect(result).not.toBe(content);
  });

  it('should only change the content of app-extras if auth is true', () => {
    let content = '<p></p>';
    let path = 'app-extras.module.ts';
    let skyAppConfig = {
        skyux:{
          auth: false
        }
    }
    let result = plugin.preload(content, path, skyAppConfig);
    expect(result).toBe(content);

    skyAppConfig.skyux.auth = true;
    result = plugin.preload(content, path, skyAppConfig);
    expect(result).not.toBe(content);
  });

  it('should add content to the end of the app-extras.module.ts file', () => {
    let content = '';
    let path = 'app-extras.module.ts';
    let skyAppConfig = {
        skyux:{
          auth: true
        }
    }
    let result = plugin.preload(content, path, skyAppConfig);
    expect(result).toContain('(SkyAppBootstrapper as any).processBootstrapConfig');
  });
});
