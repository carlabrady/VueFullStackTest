<template>
  <v-layout>
    <v-flex>
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
              <div>
                <treeselect
                  name="storeSelect"
                  :multiple="multiple"
                  :clearable="clearable"
                  :searchable="searchable"
                  :disabled="disabled"
                  :open-on-click="openOnClick"
                  :open-on-focus="openOnFocus"
                  :clear-on-select="clearOnSelect"
                  :close-on-select="closeOnSelect"
                  :always-open="alwaysOpen"
                  :options="options"
                  :value-consists-of="valueConsistsOf"
                  :max-height="200"
                  v-model="value"
                  />
              </div>
              <!-- <v-select
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
              </v-select><br/> -->

              <!-- <v-layout row wrap v-for="store in selectedStores" :key="store">
                <span class="title">Set permission for store #{{store}}</span>
                <v-flex xs12 sm3>
                  <v-switch
                    :label="`View reports: ${store.userView.toString()}`"
                    v-model="store.userView"
                  ></v-switch>
                </v-flex>
                <v-flex xs12 sm3>
                  <v-switch
                    :label="`Receive emails: ${store.userEmail.toString()}`"
                    v-model="store.userEmail"
                  ></v-switch>
                </v-flex>
              </v-layout> -->
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
import Treeselect from '@riophae/vue-treeselect'

export default {
  components: {
    Treeselect
  },
  data () {
    return {
      first: '',
      last: '',
      email: '',
      password: '',
      userMod: false,
      storeMod: false,
      error: null,
      // selectedStores: [],
      // stores: []
      multiple: true,
      clearable: true,
      searchable: true,
      disabled: false,
      openOnClick: true,
      openOnFocus: false,
      clearOnSelect: true,
      closeOnSelect: false,
      alwaysOpen: false,
      value: [],
      valueConsistsOf: 'LEAF_PRIORITY',
      options: [{
        id: 'Device Pitstop',
        label: 'Device Pitstop',
        children: [
          {
            id: '10011',
            label: '10011'
          },
          {
            id: '10012',
            label: '10012'
          },
          {
            id: '10013',
            label: '10013'
          }
        ]
      },
      {
        id: 'Clothing Exchange',
        label: 'Clothing Exchange',
        children: [
          {
            id: '20000',
            label: '20000'
          },
          {
            id: '20001',
            label: '20010'
          }
        ]
      },
      {
        id: 'Children\'s Orchard',
        label: 'Children\'s Orchard',
        children: [
          {
            id: '32000',
            label: '32000'
          },
          {
            id: '32001',
            label: '32001'}
        ]
      }]
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
