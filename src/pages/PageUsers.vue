<template>
  <q-page class="flex q-pa-md">
    <q-list bordered separator class="full-width">
      <q-item
        v-for="(contact, key) in users"
        :key="key"
        class="q-my-sm"
        clickable
        :to="'/chat/' + key"
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ contact.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge rounded :color="contact.online ? 'green' : 'grey-4'" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PageUsers",
  computed: {
    ...mapGetters("store", ["users"]),
  },
};
</script>
