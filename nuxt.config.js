const filename = `.env.${process.env.NODE_ENV || 'local'}`;
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({ path: filename });

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/toshokan-api-client.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    ['@nuxtjs/dotenv', { filename }],
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/bulma',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */

    postcss: {
      plugins: {
        'postcss-preset-env': {
          features: {
            customProperties: false,
          },
        },
      },
    },
    // eslint-disable-next-line no-unused-vars
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  auth: {
    strategies: {
      prolab: {
        _scheme: 'oauth2',
        authorization_endpoint: `${process.env.OAUTH2_BASE_URL}/oauth2/auth`,
        access_token_endpoint: `${process.env.OAUTH2_BASE_URL}/oauth2/token`,
        userinfo_endpoint: false,
        scope: ['openid', 'profile.read'],
        access_type: 'offline',
        response_type: 'code',
        grant_type: 'authorization_code',
        token_type: 'Bearer',
        client_id: process.env.PROLAB_ACCOUNTS_CLIENT_ID,
        token_key: 'access_token',
        redirect_uri: process.env.OAUTH2_CALLBACK_URL,
      },
    },
  },
};
