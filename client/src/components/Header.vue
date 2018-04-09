<template>
  <div>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      clipped
      app
      dark
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :value="item.title" :key="item.title"
                      :to="item.path == '#' ? '' : item.path"
                      active-class="black--text">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed class="blue" dark clipped-left app>
      <v-toolbar-title
        class="ml-0 pl-3"
        :class="$vuetify.breakpoint.width <= 1264 && 'pr-3'">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn to="/">
          NTY Report Portal
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" flat dark to="login">
          Login
        </v-btn>

        <v-btn v-if="$store.state.isUserLoggedIn && $store.state.user.IsUserAdministrator" flat dark to="register">
          Add User
        </v-btn>

        <v-btn v-if="$store.state.isUserLoggedIn" flat dark @click="logout">
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-footer color="blue" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </div>
</template>

<script>

export default {
  data () {
    return {
      drawer: null,
      clipped: false,
      items: [
        {
          title: 'Sales',
          icon: 'trending_up',
          path: '/sales'
        },
        {
          title: 'Buys',
          icon: 'attach_money',
          path: '/buys'
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
