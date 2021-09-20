<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          @click="$router.go(-1)"
          icon="arrow_back"
          dense
          flat
        />
        <q-toolbar-title class="absolute-center"> {{ title }}</q-toolbar-title>

        <q-btn
          v-if="!userDetail.userId"
          to="/auth"
          no-caps
          class="absolute-right q-pr-sm"
          icon="account_circle"
          flat
          dense
          label="Login"
        />
        <q-btn-dropdown
          v-else
          class="absolute-right q-pr-sm btn-logout"
          icon="account_circle"
          flat
          dense
          :label="userDetail.name"
        >
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label @click="logoutUser">Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";
import { mapActions, mapState } from "vuex";
import mixinOtherUserDetail from "src/mixins/mixin_other_user_detail.js";
export default {
  name: "MainLayout",
  mixins: [mixinOtherUserDetail],
  components: {
    //EssentialLink,
  },

  setup() {
    return {
      onItemClick() {
        // console.log('Clicked on an Item')
      },
    };
  },
  computed: {
    ...mapState("store", ["userDetail"]),
    title() {
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") return "SmartChat";
      else if (currentPath.includes("/chat")) return this.otherUserDetail.name;
      else if (currentPath == "/auth") return "Login";
      return "";
    },
  },
  methods: {
    ...mapActions("store", ["logoutUser"]),
    openURL,
  },
};
</script>
<style lang="scss">
.btn-logout {
  text-transform: capitalize;
}
</style>
