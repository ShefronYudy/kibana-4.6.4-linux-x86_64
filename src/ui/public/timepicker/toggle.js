import UiModules from 'ui/modules';
import chromeNavControlsRegistry from 'ui/registry/chrome_nav_controls';

import toggleHtml from './toggle.html';

// TODO: the chrome-context directive is currently responsible for several variables
// on scope used by this template. We need to get rid of that directive and move that
// logic here

chromeNavControlsRegistry.register(function () {
  return {
    name: '切换时间选择器',
    order: 100,
    template: toggleHtml
  };
});
