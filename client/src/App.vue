<template>
  <div id="app">
    <v-app>
      <page-header/>
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
@import url('http://fonts.googleapis.com/css?family=Raleway:300,700');
@import  "@riophae/vue-treeselect/dist/vue-treeselect.min.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: url('./assets/images/background.jpg') no-repeat center center fixed;
  background-size: cover;
}
.danger-alert {
  color: red;
}
</style>
