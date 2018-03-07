<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">Hello Test App</h1>
    </v-card-title>
    <section class="pa-3">
      <p>This is a test page for the home route in the app.</p>
      <p>
        <span class="my-2">I am a line with scoped style.</span>
      </p>
      <p>Main vue libraries used:</p>
      <ul class="px-3">
        <li>vue-router</li>
        <li>vuex for state management</li>
        <li>vuetify for UI components</li>
        <li>vuelidate for validation</li>
      </ul>
    </section>
  </v-card>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  span { color: #1867c0 }
</style>
