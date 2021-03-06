const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (env === 'development') {
  require('dotenv').config()
}
const getRoutes = require('./getRoutes')
module.exports = {
  router: {
    linkActiveClass: 'is-active-link',
    linkExactActiveClass: 'is-active-link-exact',
    base: '/'
  },
  /*
  ** Headers of the page
  */
  generate: {
    routes () {
      return getRoutes()
        .then(data => {
          return Object.keys(data)
            .map(route => ({
              route: '/documentation/' + route,
              payload: data[route]
            }))
        })
    }
  },
  env: {
    TIPE_API_KEY: process.env.TIPE_API_KEY,
    TIPE_ID: process.env.TIPE_ID
  },
  head: {
    title: 'nuxt-tipe-starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Get started with Tipe + Nuxt + Vue' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: ['@nuxtjs/apollo', '@nuxtjs/bulma', '@nuxtjs/font-awesome'],
  apollo: {
    clientConfigs: {
      default: '~/apollo/default.js'
    }
  },
  css: [
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
