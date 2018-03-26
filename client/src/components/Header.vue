<template>
  <v-toolbar fixed class="blue" dark>
    <v-toolbar-title class="mr-4">
      <v-btn to="/">
        NTY Report Portal
      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark to="login">
        Login
      </v-btn>

      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark to="register">
        New User
      </v-btn>

      <v-btn v-if="$store.state.isUserLoggedIn" flat dark to="/">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
