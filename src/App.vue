<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
export default defineComponent({
  name: "App",
  methods: {
    ...mapActions("store", ["handleStateChanged"]),
  },
  mounted() {
    this.handleStateChanged();
  },
});
</script>
