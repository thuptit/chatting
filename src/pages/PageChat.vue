<template>
  <q-page class="flex column">
    <q-banner
      class="text-dark bg-grey-4 text-center"
      v-if="!otherUserDetail.online"
    >
      {{ otherUserDetail.name }} is offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from == 'me' ? 'me' : otherUserDetail.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width">
          <q-input
            outlined
            rounded
            bg-color="white"
            label="Message"
            dense
            v-model="newMessage"
          >
            <template v-slot:after>
              <q-btn
                v-if="newMessage"
                round
                dense
                flat
                @click="sendMessage"
                icon="send"
                color="white"
              />
              <q-btn
                v-else
                round
                dense
                flat
                icon="emoji_emotions"
                color="white"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import mixinOtherUserDetail from "src/mixins/mixin_other_user_detail.js";

export default {
  name: "PageChat",
  mixins: [mixinOtherUserDetail],
  data() {
    return {
      newMessage: "",
    };
  },
  computed: {
    ...mapState("store", ["messages", "userDetail"]),
  },
  methods: {
    ...mapActions("store", ["firebaseGetMessage"]),
    ...mapActions("store", ["firebaseStopGettingMessage"]),
    ...mapActions("store", ["firebaseSendMessage"]),
    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: "me",
        },
        otherUserId: this.$route.params.otherUserId,
      });
      this.newMessage = "";
    },
  },
  mounted() {
    this.firebaseGetMessage(this.$route.params.otherUserId);
  },
  unmounted() {
    this.firebaseStopGettingMessage();
  },
};
</script>
