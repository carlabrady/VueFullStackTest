<template>
  <div>
    <div class="table">
      <v-layout row class="header">
        <div v-for="header in headers"
          :key="header.text">
          {{header.text}}
        </div>
        <div>
          <label class="form-checkbox">
            <input type="checkbox" v-model="selectAll" @click="select">
            <i class="form-icon"></i>
          </label>
        </div>
      </v-layout>
      <v-layout column class="body" v-for="store in items" :key="store.id">
        <v-layout row>
          <div>{{store.name}}</div>
          <div>
            <label class="form-checkbox">
                <input type="checkbox" :value="store.id" v-model="selected">
                <i class="form-icon"></i>
              </label>
          </div>
        </v-layout>
        <v-layout v-if="store.value" column class="reportList" v-for="report in store.reports" :key="report.id">
          <v-layout row>
            <div>{{report.name}}</div>
            <div>
              <label class="form-checkbox">
                  <input type="checkbox" :value="report.id" v-model="selected">
                  <i class="form-icon"></i>
                </label>
            </div>
          </v-layout>
        </v-layout>
      </v-layout>
    </div>

  <!-- <div class="userPermissionTable">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      select-all
      :pagination.sync="pagination"
      item-key="name"
      class="elevation-1"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
          <th>
            <v-checkbox
              primary
              hide-details
              @click.native="toggleAll"
              :input-value="props.all"
              :indeterminate="props.indeterminate"
            ></v-checkbox>
          </th>
          <th>
            <v-checkbox
              primary
              hide-details
              @click.native="toggleAll"
              :input-value="props.all"
              :indeterminate="props.indeterminate"
            ></v-checkbox>
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>{{ props.item.name }}</td>
          <td>
            <v-checkbox
              primary
              hide-details
              :input-value="props.selected"
            ></v-checkbox>
          </td>
          <td>
            <v-checkbox
              primary
              hide-details
              :input-value="props.selected"
            ></v-checkbox>
          </td>
        </tr>
      </template>
    </v-data-table> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: [],
    headers: [
      {
        text: 'Stores',
        align: 'left',
        value: 'name'
      }
    ],
    items: [
      {
        id: '1',
        value: false,
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
        value: false,
        name: '10012'
      },
      {
        id: '3',
        value: false,
        name: '10013'
      }
    ],
    selectAll: false
  }),

  methods: {
    select () {
      this.selected = []
      if (!this.selectAll) {
        for (let i in this.items) {
          this.selected.push(this.items[i].id)
        }
      }
    }
    // toggleAll () {
    //   if (this.selected.length) this.selected = []
    //   else this.selected = this.items.slice()
    // }
    // changeSort (column) {
    //   if (this.pagination.sortBy === column) {
    //     this.pagination.descending = !this.pagination.descending
    //   } else {
    //     this.pagination.sortBy = column
    //     this.pagination.descending = false
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
