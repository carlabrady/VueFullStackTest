<template>
  <v-card class="pb-4">
    <div>
      {{stores}}
      <v-layout class="header">
        <div class="stores">
          {{header}}
        </div>
        <div class="permissionCheckbox">
          <label>
            <input
              type="checkbox"
              v-indeterminate="viewAllIndeterminate"
              v-model="AllView"
              @click="selectAllView">
            <span>View Report</span>
          </label>
        </div>
        <div class="permissionCheckbox">
          <label>
            <input
              type="checkbox"
              v-indeterminate="emailAllIndeterminate"
              v-model="AllEmail"
              @click="selectAllEmail">
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
                  v-model="viewSelected">
              </label>
          </div>
          <div class="permissionCheckbox">
            <label>
                <input
                  class="storeEmailCheckbox"
                  type="checkbox"
                  :value="store"
                  v-model="emailSelected">
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
                    :value="report.HasViewAccess"
                    v-model="viewReportSelected"
                    @click="changeStoreViewState(report, store)">
                </label>
            </div>
            <div class="permissionCheckbox">
              <label>
                  <input
                    class="reportEmailAccess"
                    type="checkbox"
                    :value="report.CanReceiveEmail"
                    v-model="emailReportSelected"
                    @click="changeStoreEmailState">
                </label>
            </div>
          </v-layout>
          <div class="seperation" v-if="report !== store.reports[store.reports.length - 1] || store !== stores[stores.length - 1]"></div>
        </v-layout>
      </v-layout>
      {{viewSelected}}
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['stores'],
  data: () => ({
    header: 'Stores',
    viewAllIndeterminate: false,
    emailAllIndeterminate: false,
    viewReportSelected: [],
    emailReportSelected: [],
    AllView: false,
    AllEmail: false,
    viewSelected: [],
    emailSelected: []
  }),

  methods: {
    showThisStoresReports (store) {
      store.showReports = !store.showReports
    },
    selectAllView () {
      if (this.viewSelected.length === this.stores.length) {
        this.viewSelected = []
      } else {
        this.stores.forEach(store => {
          if (!this.viewSelected.includes(store)) {
            this.viewSelected.push(store)
          }
        })
      }
    },
    selectAllEmail () {
      for (var i = 0; i < this.stores.length; i++) {
        this.stores[i].storeEmailCheckbox.checked = this.checked
      }
    },
    selectEmail () {
      this.emailSelected = []
      if (!this.selectAllEmail) {
        for (let i in this.stores) {
          this.emailSelected.push(this.stores[i].id)
        }
      }
    },
    changeStoreViewState (report) {
      let checkedCount = document.querySelectorAll('input.reportViewAccess:checked').length

      this.store.checked = checkedCount > 0
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
