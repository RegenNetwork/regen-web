import initStoryshots from '@storybook/addon-storyshots';
import path from 'path';

initStoryshots({
  configPath: path.resolve(__dirname, '../../web-storybook/.storybook'),
  framework: 'react',
});
