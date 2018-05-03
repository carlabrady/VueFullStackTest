<template>
  <v-layout class="registerUser">
    <v-flex>
      <v-card class="white elevation-2" style="border-radius:6px">
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
                    :label="`Can Add/Modify Users`"
                    v-model="userMod"
                    color="green"
                  ></v-switch>
                </v-flex>
              </v-layout>
              <div>
                <treeselect
                  name="storeSelect"
                  placeholder="Assign stores to new user"
                  :load-children-options="loadChildrenOptions"
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
                  :valueFormat="valueFormat"
                  v-model="value"
                  />
              </div><br/>
              <user-permission-table :stores="value"></user-permission-table>
            </v-container>
            <br>
            <div class="danger-alert" v-html="error"/>
            <br>
            {{this.value}}
            <v-btn
              dark
              class="green"
              @click="register">
              Submit
            </v-btn>
          </form>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import {mapState} from 'vuex'
import StoreService from '@/services/StoreService'
import Treeselect from '@riophae/vue-treeselect'
import UserPermissionTable from './UserPermissionTable'

export default {
  components: {
    Treeselect,
    UserPermissionTable
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
      multiple: true,
      clearable: true,
      searchable: true,
      disabled: false,
      openOnClick: true,
      openOnFocus: false,
      clearOnSelect: true,
      closeOnSelect: false,
      alwaysOpen: false,
      valueFormat: 'object',
      value: [],
      valueConsistsOf: 'LEAF_PRIORITY',
      options: [{
        id: '1',
        label: 'Device Pitstop',
        children: null
      },
      {
        id: '2',
        label: 'Clothing Exchange',
        children: null
      },
      {
        id: '3',
        label: 'Children\'s Orchard',
        children: null
      }]
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    async loadChildrenOptions (parent, callback/*, id */) {
      const DPstores = []
      const CEstores = []
      const COstores = []
      if (this.isUserLoggedIn) {
        this.stores = (await StoreService.getUserStoresAndReports()).data
        this.stores.forEach(store => {
          let newSelect = {
            id: store.StoreID,
            label: store.StoreID.toString(),
            reports: [],
            viewReportsSelected: [],
            emailReportsSelected: [],
            storeViewIndeterminate: false,
            storeEmailIndeterminate: false,
            showReports: false
          }
          store.ReportAccessConfiguration.forEach(configuration => {
            if (configuration.HasViewAccess) {
              newSelect.reports.push(configuration.Report)
            }
          })
          if (newSelect.reports.length > 0) {
            switch (store.StoreID.toString().substring(0, 1)) {
              case '1':
                DPstores.push(newSelect)
                break
              case '2':
                CEstores.push(newSelect)
                break
              case '3':
                COstores.push(newSelect)
                break
              default:
                console.log(store.StoreID.toString().substring(0, 1))
            }
          }
        })
        console.log(DPstores, CEstores, COstores)
      }
      switch (parent.id) {
        case '1': {
          const children = DPstores
          callback(null, children)
          break
        }
        case '2': {
          const children = CEstores
          callback(null, children)
          break
        }
        case '3': {
          const children = COstores
          callback(null, children)
          break
        }
        default:
      }
    },
    async register () {
      let NewUserStores = []
      await this.value.forEach(store => {
        let emailOnlyReports = []
        let Store = {
          StoreID: store.id,
          reports: []
        }

        store.viewReportsSelected.forEach(viewSelect => {
          let report = {
            ReportID: viewSelect,
            HasViewAccess: true,
            CanReceiveEmail: false
          }
          Store.reports.push(report)
        })

        store.emailReportsSelected.forEach(emailSelect => {
          if (!store.viewReportsSelected.includes(emailSelect)) {
            let emailOnlyReport = {
              ReportID: emailSelect,
              HasViewAccess: false,
              CanReceiveEmail: true
            }
            emailOnlyReports.push(emailOnlyReport)
            console.log(`email reports after email loop ${emailOnlyReports}`)
          } else {
            for (let i = 0; i < Store.reports.length; i++) {
              const report = Store.reports[i]
              if (report.ReportID === emailSelect) {
                report.CanReceiveEmail = true
                break
              }
            }
          }
        })

        Store.reports = Store.reports.concat(emailOnlyReports)
        NewUserStores.push(Store)
      })
      try {
        await AuthenticationService.register({
          NewUser: {
            FirstName: this.first,
            LastName: this.last,
            Email: this.email,
            Password: this.password,
            IsUserAdministrator: this.userMod
          },
          CurrentUser: this.$store.state.user.ReportPortalUserID,
          NewUserStores: NewUserStores
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
.registerUser {
  padding: 5em;
}

@media screen and (max-width: 600px) {
  .registerUser {
    padding: 0;
  }
}

.toolbar__title {
  color: white;
}
</style>
