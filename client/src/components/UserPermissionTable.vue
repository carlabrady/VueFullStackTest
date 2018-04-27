<template>
  <v-card class="pb-4">
    <div>
      {{stores}}
      <v-layout class="header">
        <div v-for="header in headers"
          :key="header.text" class="stores">
          {{header.text}}
        </div>
        <div class="permissionCheckbox">
          <label>
            <input type="checkbox" v-indeterminate="viewAllIndeterminate" v-model="AllView" @click="selectAllView">
            <span>View Report</span>
          </label>
        </div>
        <div class="permissionCheckbox">
          <label>
            <input type="checkbox" v-indeterminate="emailAllIndeterminate" v-model="AllEmail" @click="selectAllEmail">
            <span>Receive Email</span>
          </label>
        </div>
      </v-layout>
      <div class="seperation"></div>

      <v-layout column v-for="store in stores" :key="store.id">
        <v-layout  class="bodyrow" row>
          <div class="stores">
            <div @click="store.showReports = !store.showReports">
              <v-icon v-if="store.showReports">arrow_drop_up</v-icon>
              <v-icon v-else >arrow_drop_down</v-icon>
              {{store.id}}
            </div>
          </div>
          <div class="permissionCheckbox">
            <label>
                <input class="storeViewCheckbox" type="checkbox" :value="store.id" v-model="viewSelected">
              </label>
          </div>
          <div class="permissionCheckbox">
            <label>
                <input class="storeEmailCheckbox" type="checkbox" :value="store.id" v-model="emailSelected">
              </label>
          </div>
        </v-layout>
        <div class="seperation" v-if="store !== stores[stores.length - 1] || store.showReports == true"></div>

        <v-layout v-if="store.showReports" column class="reportList" v-for="report in store.reports" :key="report.ReportID">
          <v-layout class="bodyrow" row>
            <div class="reports">{{report.ReportName}}</div>
            <div class="permissionCheckbox">
              <label class="reportViewAccess">
                  <input type="checkbox" :value="report.id" v-model="viewReportSelected" @click="changeStoreViewState">
                </label>
            </div>
            <div class="permissionCheckbox">
              <label class="reportStoreAccess">
                  <input type="checkbox" :value="report.id" v-model="emailReportSelected" @click="changeStoreEmailState">
                </label>
            </div>
          </v-layout>
          <div class="seperation" v-if="report !== store.reports[store.reports.length - 1]"></div>
        </v-layout>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['stores'],
  data: () => ({
    headers: [
      {
        text: 'Stores',
        align: 'left',
        value: 'name'
      }
    ],
    viewAllIndeterminate: false,
    emailAllIndeterminate: false,
    viewReportSelected: false,
    emailReportSelected: false,
    AllView: false,
    AllEmail: false,
    viewSelected: [],
    emailSelected: []
  }),

  methods: {
    selectAllView () {
      this.viewSelected = []

      if (this.AllView) {
        this.stores.forEach(store => {
          this.viewSelected.push(store.id.toString())
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
    changeStoreViewState () {

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
