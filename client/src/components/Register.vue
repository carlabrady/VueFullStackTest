<template>
  <v-layout column>
    <v-flex xs6>
      <div class="white elevation-2">
        <v-toolbar flat dense class="blue" dark>
          <v-toolbar-title>Add User</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
          <form
            name="report-register-form"
            autocomplete="off">
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="First Name"
                    type="text"
                    v-model="first"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Last Name"
                    type="text"
                    v-model="last"
                    autocomplete="new-password"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Email"
                    type="email"
                    v-model="email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model="password"
                    autocomplete="new-password"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-switch
                    :label="`Can modify Users: ${userMod.toString()}`"
                    v-model="userMod"
                  ></v-switch>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-switch
                    :label="`Can modify Stores: ${storeMod.toString()}`"
                    v-model="storeMod"
                  ></v-switch>
                </v-flex>
              </v-layout>
              <v-select
                autocomplete
                label="Stores"
                :items="stores"
                v-model="selectedStores"
                multiple
                max-height="400"
                hint="Select stores for user access."
                persistent-hint
                clearable
                color="success">
              </v-select>
            </v-container>
            <br>
            <div class="danger-alert" v-html="error" />
            <br>
            <v-btn
              dark
              class="green"
              @click="register">
              Submit
            </v-btn>
          </form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import {mapState} from 'vuex'
import StoreService from '@/services/StoreService'

export default {
  data () {
    return {
      first: '',
      last: '',
      email: '',
      password: '',
      userMod: false,
      storeMod: false,
      error: null,
      selectedStores: [],
      stores: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.stores = (await StoreService.get()).data
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          NewUser: {
            FirstName: this.first,
            LastName: this.last,
            Email: this.email,
            Password: this.password,
            IsUserAdministrator: this.userMod,
            IsStoreAdministrator: this.storeMod
          },
          CurrentUser: this.$store.state.user.ReportPortalUserID,
          NewUserStores: this.selectedStores
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
