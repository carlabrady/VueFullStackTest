<template>
  <v-card class="pb-4">
    <div>
      <v-layout class="header">
        <div class="stores">
          {{header}}
        </div>
        <div class="permissionCheckbox">
          <label>
            <input
              type="checkbox"
              v-indeterminate="allViewIndeterminate"
              :value="allView"
              v-model="allView"
              @click="allViewSelect">
            <span>View Report</span>
          </label>
        </div>
        <div class="permissionCheckbox">
          <label>
            <input
              type="checkbox"
              v-indeterminate="allEmailIndeterminate"
              :value="allEmail"
              v-model="allEmail"
              @click="allEmailSelect">
            <span>Receive Email</span>
          </label>
        </div>
      </v-layout>
      <div class="seperation"></div>
        <div v-if="!stores.length" class="danger-alert">
          <br>
          <v-text>No stores have been selected.</v-text>
        </div>
      <v-layout column v-for="store in stores" :key="store.id">
        <v-layout  class="bodyrow" row>
          <div class="stores">
            <div @click="showThisStoresReports(store)">
              <v-btn small icon>
                <v-icon v-if="store.showReports">arrow_drop_up</v-icon>
                <v-icon v-else >arrow_drop_down</v-icon>
              </v-btn>
              {{store.id}}
            </div>
          </div>
          <div class="permissionCheckbox">
            <label>
                <input
                  class="storeViewCheckbox"
                  type="checkbox"
                  v-indeterminate="store.storeViewIndeterminate"
                  :value="store"
                  v-model="viewSelected"
                  @click="selectReportsView(store)">
              </label>
          </div>
          <div class="permissionCheckbox">
            <label>
                <input
                  class="storeEmailCheckbox"
                  type="checkbox"
                  v-indeterminate="store.storeEmailIndeterminate"
                  :value="store"
                  v-model="emailSelected"
                  @click="selectReportsEmail(store)">
              </label>
          </div>
        </v-layout>
        <div class="seperation" v-if="store !== stores[stores.length - 1] || store.showReports == true"></div>

        <v-layout
          column
          v-if="store.showReports"
          class="reportList"
          v-for="report in store.reports"
          :key="report.ReportID">
          <v-layout class="reportRow" row>
            <v-spacer></v-spacer>
            <div class="reports">{{report.ReportName}}</div>
            <div class="permissionCheckbox">
              <label>
                  <input
                    class="reportViewAccess"
                    type="checkbox"
                    :value="report.ReportID"
                    v-model="store.viewReportsSelected"
                    @change="changeStoreViewState(store)">
                </label>
            </div>
            <div class="permissionCheckbox">
              <label>
                  <input
                    class="reportEmailAccess"
                    type="checkbox"
                    :value="report.ReportID"
                    v-model="store.emailReportsSelected"
                    @change="changeStoreEmailState(store)">
                </label>
            </div>
          </v-layout>
          <div class="seperation" v-if="report !== store.reports[store.reports.length - 1] || store !== stores[stores.length - 1]"></div>
        </v-layout>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['stores'],
  data: () => ({
    header: 'Stores',
    allViewIndeterminate: false,
    allEmailIndeterminate: false,
    allView: false,
    allEmail: false,
    viewSelected: [],
    emailSelected: []
  }),

  methods: {
    showThisStoresReports (store) {
      // toggle view of individual report permissions
      store.showReports = !store.showReports
    },
    allViewSelect () {
      // on-click of checkbox to select view all access
      if (this.viewSelected.length > 0) {
        this.viewSelected = []
        this.stores.forEach(store => {
          store.storeViewIndeterminate = false
          store.viewReportsSelected = []
        })
      } else {
        this.stores.forEach(store => {
          if (!this.viewSelected.includes(store)) {
            store.reports.forEach(report => {
              store.storeViewIndeterminate = false
              store.viewReportsSelected.push(report.ReportID)
            })
            this.viewSelected.push(store)
          }
        })
      }
    },
    allEmailSelect () {
      // on-click of checkbox to select email all access
      if (this.emailSelected.length > 0) {
        this.emailSelected = []
        this.stores.forEach(store => {
          store.storeEmailIndeterminate = false
          store.emailReportsSelected = []
        })
      } else {
        this.stores.forEach(store => {
          if (!this.emailSelected.includes(store)) {
            store.reports.forEach(report => {
              store.storeEmailIndeterminate = false
              store.emailReportsSelected.push(report.ReportID)
            })
            this.emailSelected.push(store)
          }
        })
      }
    },
    selectReportsView (store) {
      if (store.viewReportsSelected.length > 0) {
        store.viewReportsSelected = []
      } else {
        store.reports.forEach(report => {
          if (!store.viewReportsSelected.includes(report.ReportID)) {
            store.viewReportsSelected.push(report.ReportID)
          }
        })
      }
    },
    selectReportsEmail (store) {
      if (store.emailReportsSelected.length > 0) {
        store.emailReportsSelected = []
      } else {
        store.reports.forEach(report => {
          if (!store.emailReportsSelected.includes(report.ReportID)) {
            store.emailReportsSelected.push(report.ReportID)
          }
        })
      }
    },
    changeStoreViewState (store) {
      let index = this.viewSelected.indexOf(store)

      if (store.viewReportsSelected.length === 0) {
        store.storeViewIndeterminate = false
        if (this.viewSelected.includes(store)) {
          this.viewSelected.splice(index, 1)
        }
      } else if (store.viewReportsSelected.length === store.reports.length) {
        store.storeViewIndeterminate = false
        if (!this.viewSelected.includes(store)) {
          this.viewSelected.push(store)
        }
      } else {
        store.storeViewIndeterminate = true
        if (this.viewSelected.includes(store)) {
          this.viewSelected.splice(index, 1)
        }
      }
    },
    changeStoreEmailState (store) {
      let index = this.emailSelected.indexOf(store)

      if (store.emailReportsSelected.length === 0) {
        store.storeEmailIndeterminate = false
        if (this.emailSelected.includes(store)) {
          this.emailSelected.splice(index, 1)
        }
      } else if (store.emailReportsSelected.length === store.reports.length) {
        store.storeEmailIndeterminate = false
        if (!this.emailSelected.includes(store)) {
          this.emailSelected.push(store)
        }
      } else {
        store.storeEmailIndeterminate = true
        if (this.emailSelected.includes(store)) {
          this.emailSelected.splice(index, 1)
        }
      }
    }
  },
  directives: {
    indeterminate: (el, binding) => {
      el.indeterminate = Boolean(binding.value)
    }
  },
  watch: {
    viewSelected (newVal, oldVal) {
      // Handle changes in individual store view checkboxes
      if (newVal.length === 0) {
        this.allViewIndeterminate = false
        this.allView = false
      } else if (newVal.length === this.stores.length) {
        this.allViewIndeterminate = false
        this.allView = true
      } else {
        this.allViewIndeterminate = true
        this.allView = false
      }
    },
    emailSelected (newVal, oldVal) {
      // Handle changes in individual store email checkboxes
      if (newVal.length === 0) {
        this.allEmailIndeterminate = false
        this.allEmail = false
      } else if (newVal.length === this.stores.length) {
        this.allEmailIndeterminate = false
        this.allEmail = true
      } else {
        this.allEmailIndeterminate = true
        this.allEmail = false
      }
    }
  }
}
</script>

<style scoped>
.header {
  height: 30px;
  padding-top: 20px;
  padding-bottom: 30px;

}
.seperation {
  height: 1px;
  display: block;
  margin: 0 auto;
  width: 90%;
  background-color: rgba(0,0,0,.14)
}
.bodyrow {
  height: 25px;
  padding-top: 15px;
  padding-bottom: 30px;
}
.reportRow {
  text-align: left;
  height: 25px;
  padding-top: 15px;
  padding-bottom: 30px;
}

.stores {
  width: 40%;
}
.permissionCheckbox {
  width: 23%;
}
.reports {
  width: 33%;
}
</style>
