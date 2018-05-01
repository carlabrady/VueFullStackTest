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

      <v-layout column v-for="store in stores" :key="store.id">
        <v-layout  class="bodyrow" row>
          <div class="stores">
            <div @click="showThisStoresReports(store)">
              <v-icon v-if="store.showReports">arrow_drop_up</v-icon>
              <v-icon v-else >arrow_drop_down</v-icon>
              {{store.id}}
            </div>
          </div>
          <div class="permissionCheckbox">
            <label>
                <input
                  class="storeViewCheckbox"
                  type="checkbox"
                  :value="store"
                  v-model="viewSelected"
                  @click="selectReportsView">
              </label>
          </div>
          <div class="permissionCheckbox">
            <label>
                <input
                  class="storeEmailCheckbox"
                  type="checkbox"
                  :value="store"
                  v-model="emailSelected"
                  @click="selectReportsEmail">
              </label>
          </div>
        </v-layout>
        <div class="seperation" v-if="store !== stores[stores.length - 1] || store.showReports == true"></div>

        <v-layout v-if="store.showReports" column class="reportList" v-for="report in store.reports" :key="report.ReportID">
          <v-layout class="bodyrow" row>
            <div class="reports">{{report.ReportName}}</div>
            <div class="permissionCheckbox">
              <label>
                  <input
                    class="reportViewAccess"
                    type="checkbox"
                    :value="report"
                    v-model="viewReportSelected"
                    @click="changeStoreViewState(report, store)">
                </label>
            </div>
            <div class="permissionCheckbox">
              <label>
                  <input
                    class="reportEmailAccess"
                    type="checkbox"
                    :value="report"
                    v-model="emailReportSelected"
                    @click="changeStoreEmailState">
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
    viewReportSelected: [],
    emailReportSelected: [],
    allView: false,
    allEmail: false,
    viewSelected: [],
    emailSelected: []
  }),

  methods: {
    showThisStoresReports (store) {
      store.showReports = !store.showReports
    },
    allViewSelect () {
      if (this.viewSelected.length > 0) {
        this.viewSelected = []
      } else {
        this.stores.forEach(store => {
          if (!this.viewSelected.includes(store)) {
            this.viewSelected.push(store)
          }
        })
      }
    },
    allEmailSelect () {
      if (this.emailSelected.length > 0) {
        this.emailSelected = []
      } else {
        this.stores.forEach(store => {
          if (!this.emailSelected.includes(store)) {
            this.emailSelected.push(store)
          }
        })
      }
    },
    selectReportsView () {
      this.viewReportSelected = []
      if (!this.viewReportSelected) {
        for (let i in this.stores) {
          this.viewReportSelected.push(this.stores[i].id)
        }
      }
    },
    selectReportsEmail () {
      this.viewEmailSelected = []
      if (!this.viewEmailSelected) {
        for (let i in this.stores) {
          this.viewEmailSelected.push(this.stores[i].id)
        }
      }
    },
    changeStoreViewState (report, store) {
      let checkedCount = document.querySelectorAll('input.reportViewAccess:checked').length

      this.parent.checked = checkedCount > 0
      this.store.indeterminate = checkedCount > 0 && checkedCount < this.store.reports.length
      report.HasViewAccess = !report.HasViewAccess
    },
    changeStoreEmailState () {

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
.stores {
  width: 40%;
}
.permissionCheckbox {
  width: 30%;
}
.reports {
  width: 50%;
}
</style>
