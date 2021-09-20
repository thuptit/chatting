<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      outlined
      v-model="formData.name"
      label="Username"
      class="q-mb-md"
    />
    <q-input outlined v-model="formData.email" label="Email" class="q-mb-md" />
    <q-input
      outlined
      v-model="formData.password"
      label="Password"
      type="password"
      class="q-mb-md"
    />

    <div class="row justify-center">
      <q-btn :label="tab" type="submit" color="primary" />
    </div>
  </q-form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login-register",
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions("store", ["registerUser", "loginUser"]),
    submitForm() {
      if (this.tab == "login") {
        this.loginUser(this.formData);
      } else {
        this.registerUser(this.formData);
      }
    },
  },
};
</script>
<style lang="scss"></style>
