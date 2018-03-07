# Vue Test App

This is a Vue experiment for trying out Vuetify, Scoped Slots and the render function. There are 2 node apps; one for the vue applications and another ExpressJs one which handles the server side for ajax calls. The ExpressJs app only saves changes in memory which is lost upon restarting the node app.

The "users" page contains an attempt at a crud component which registers a dynamic Vuex module (with related ajax calls) from some scoped slots, a url, a form component and a couple of other props. The Scoped Slots allow for customising and extending content; e.g. being able to add an extra "Notify" button to the actions without changing the crud component's definition.

The "about" page contains a simple test of using the Vue render function.

# About the dependencies
* [Vuetify](https://vuetifyjs.com) - a material design UI component library
* [Vuelidate](https://monterail.github.io/vuelidate/) - a validation framework which adds validation definitions to the vue component object
* [Vuex](https://vuex.vuejs.org) - a state mangement library
* [Vue Router](https://router.vuejs.org) - router management 

Note: The npm package Concurrently is used to start both the Vue and Express apps in a single command

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
