<template>
  <div>
    <v-navigation-drawer :clipped="clipped" v-model="drawer" enable-resize-watcher app dark>
      <v-list>
        <v-list-group v-for="item in items" :value="item.title" :key="item.title">
          <v-list-tile
                        :to="item.path == '#' ? '' : item.path"
                        active-class="black--text">
            <v-list-tile-content>
              <v-list-tile-title >{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed class="blue" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-4">
        <v-btn to="/">
          NTY Report Portal
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" flat dark to="login">
          Login
        </v-btn>

        <v-btn v-if="$store.state.isUserLoggedIn" flat dark to="register">
          Add User
        </v-btn>

        <v-btn v-if="$store.state.isUserLoggedIn" flat dark @click="logout">
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>

export default {
  data () {
    return {
      drawer: true,
      clipped: false,
      items: [
        {
          action: 'local_activity',
          title: 'Sales',
          path: '/sales',
          items: []
        },
        {
          action: 'purchasing',
          title: 'Buys',
          path: '/buys',
          items: []
        }
      ]
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>

</style>
