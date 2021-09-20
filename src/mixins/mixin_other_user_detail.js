export default {
  computed: {
    otherUserDetail() {
      if (this.$store.state.store.users[this.$route.params.otherUserId]) {
        return this.$store.state.store.users[this.$route.params.otherUserId];
      }
      return {};
    },
  },
};
