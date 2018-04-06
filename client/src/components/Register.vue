<template>
  <v-layout column>
    <v-flex xs6>
      <div class="white elevation-2">
        <v-toolbar flat dense class="blue" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
          <form
            name="report-register-form"
            autocomplete="off">
            <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
            <br>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              autocomplete="new-password"
            ></v-text-field>
            <v-switch
              :label="`Can modify Users: ${switch1.toString()}`"
              v-model="switch1"
            ></v-switch>
            <v-switch
              :label="`Can modify Stores: ${switch2.toString()}`"
              v-model="switch2"
            ></v-switch>
          </form>
          <br>
          <div class="danger-alert" v-html="error" />
          <br>
          <v-btn
            dark
            class="green"
            @click="register">
            Register
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      switch1: false,
      switch2: false,
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          NewUser: {
            Email: this.email,
            Password: this.password,
            IsUserAdministrator: this.switch1,
            IsStoreAdministrator: this.switch2
          },
          CurrentUser: this.$store.state.user.ReportPortalUserID
        })
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
