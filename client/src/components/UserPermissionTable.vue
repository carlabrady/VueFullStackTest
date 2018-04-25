<template>
  <v-card>
    <div class="table">
      <v-layout class="header">
        <div v-for="header in headers"
          :key="header.text" class="stores">
          {{header.text}}
        </div>
        <div class="permissionCheckbox">
          <label>
            <input type="checkbox" v-model="selectAllView" @click="selectView">
            <i class="form-icon">View Report</i>
          </label>
        </div>
        <div class="permissionCheckbox">
          <label>
            <input type="checkbox" v-model="selectAllEmail" @click="selectEmail">
            <i class="form-icon">Receive Email</i>
          </label>
        </div>
      </v-layout>
      <div class="seperation"></div>

      <v-layout column v-for="store in stores" :key="store.id">
        <v-layout  class="bodyrow" row @click="!store.showReports">
          <div class="stores">{{store.name}}</div>
          <div class="permissionCheckbox">
            <label>
                <input type="checkbox" :value="store.id" v-model="viewSelected">
                <i class="form-icon"></i>
              </label>
          </div>
          <div class="permissionCheckbox">
            <label>
                <input type="checkbox" :value="store.id" v-model="emailSelected">
                <i class="form-icon"></i>
              </label>
          </div>
        </v-layout>
        <div class="seperation" v-if="store.id !== '3'"></div>

        <v-layout v-if="store.showReports" column class="reportList" v-for="report in store.reports" :key="report.id">
          <v-layout class="bodyrow" row>
            <div class="stores">{{report.name}}</div>
            <div class="permissionCheckbox">
              <label class="form-checkbox">
                  <input type="checkbox" :value="report.id" v-model="viewReportSelected">
                  <i class="form-icon"></i>
                </label>
            </div>
            <div class="permissionCheckbox">
              <label class="form-checkbox">
                  <input type="checkbox" :value="report.id" v-model="emailReportSelected">
                  <i class="form-icon"></i>
                </label>
            </div>
          </v-layout>
          <div class="seperation"></div>
        </v-layout>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: 'Stores',
        align: 'left',
        value: 'name'
      }
    ],
    stores: [
      {
        id: '1',
        showReports: false,
        name: '10011',
        reports: [{
          id: 'r1',
          name: 'Period Comparison Report'
        }, {
          id: 'r2',
          name: 'Royalties Report'
        }]
      },
      {
        id: '2',
        showReports: false,
        name: '10012'
      },
      {
        id: '3',
        showReports: false,
        name: '10013'
      }
    ],
    selectAllView: false,
    selectAllEmail: false,
    viewSelected: [],
    emailSelected: []
  }),

  methods: {
    selectView () {
      this.viewSelected = []
      if (!this.selectAllView) {
        for (let i in this.stores) {
          this.viewSelected.push(this.stores[i].id)
        }
      }
    },
    selectEmail () {
      this.emailSelected = []
      if (!this.selectAllEmail) {
        for (let i in this.stores) {
          this.emailSelected.push(this.stores[i].id)
        }
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
  display: block;
  margin: 0 auto;
  width: 90%;
  border-bottom: 1px solid rgba(0,0,0,.14)
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
</style>
