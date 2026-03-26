export default {
    target: 'static',

    loading: '@/components/Loader.vue',
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Bunzo',
        titleTemplate: 'Bunzo | %s',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Bunzo blog template'
            },
            {
                name: 'format-detection',
                content: 'telephone=no'
            },
            {
                name: 'keywords',
                content: 'Bunzo blog template'
            },
            {
                name: 'app-mobile-web-app-title',
                content: 'Bunzo'
            },
            {
                name: 'application-name',
                content: 'Bunzo blog template',
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'apple-touch-icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/scss/style.scss',
        '~/assets/css/tailwind.css',
        '~/assets/css/icofont.min.css',
        '~/assets/css/swiper.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/vue-awesome-swiper.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/apollo',
    ],

    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: "https://vue.thethemedemo.com/bunzo/graphql"
            }
        }
    },

    styleResources: {
        scss: ['~/assets/scss/style.scss'],
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        loaders: {
            vue: {
              compiler: require('vue-template-babel-compiler')
            }
        },
    },
}
