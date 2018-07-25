/* node: true */

describe('Addin Client plugin', () => {
  let plugin;

  beforeEach(() => {
    plugin = require('./addin-client');
  });

  it('should contain a preload hook', () => {
    expect(plugin.preload).toBeDefined();
  });

  it('should only change the content of the app-extras.module.ts file', () => {
    let content = '<p></p>';
    let path = 'sample.service.ts';
    let result = plugin.preload(content, path);
    expect(result).toBe(content);
    content = '{}';
    path = 'app-extras.module.ts';
    result = plugin.preload(content, path);
    expect(result).not.toBe(content);
  });

  it('should add content to the end of the app-extras.module.ts file', () => {
    let content = '';
    let path = 'app-extras.module.ts';
    let result = plugin.preload(content, path);
    expect(result).toContain('(SkyAppBootstrapper as any).processBootstrapConfig');
  });
});
