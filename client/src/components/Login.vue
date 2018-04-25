<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12" style="border-radius:6px">
          <v-toolbar dark color="blue">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="text"
                v-model="email">
              </v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                autocomplete="new-password"
                @keyup.enter="login">
              </v-text-field>
            </v-form>
            <br>
              <div class="danger-alert" v-html="error" />
            <br>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" dark @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          Email: this.email,
          Password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'root'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.toolbar__title {
  color: white;
}
#app > div > main > div > div {
  padding: 5em;
}
</style>
