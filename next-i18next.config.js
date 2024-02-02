const path = require('path');
module.exports = {
  locales: ['en'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en','vi'],
  },
  reloadOnPrerender: true,
  localePath: path.resolve('./public/locales')
};