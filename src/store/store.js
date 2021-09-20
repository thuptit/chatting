import { firebaseAuth, firebaseDb } from "boot/firebase";

let messageRef;

const state = {
  userDetail: {},
  users: {},
  messages: {},
};

const mutations = {
  setUserDetail(state, payload) {
    state.userDetail = payload;
  },
  addUser(state, payload) {
    state.users[payload.userId] = payload.userDetail;
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetail);
  },
  addMessage(state, payload) {
    state.messages[payload.messageId] = payload.messageDetails;
    console.log(payload);
  },
  clearMessage(state) {
    state.messages = {};
  },
};

const actions = {
  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log(response);
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).set({
          name: payload.name,
          email: payload.email,
          online: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  loginUser({}, payload) {
    console.log(payload);
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  handleStateChanged({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).once("value", (snapshot) => {
          let userDetail = snapshot.val();
          if (userDetail != null) {
            commit("setUserDetail", {
              name: userDetail.name,
              email: userDetail.email,
              userId: userId,
            });
            dispatch("firebaseUpdateUser", {
              userId: userId,
              updates: {
                online: true,
              },
            });
            dispatch("firebaseGetUsers");
            this.$router.push("/");
          }
        });
      } else {
        dispatch("firebaseUpdateUser", {
          userId: state.userDetail.userId,
          updates: {
            online: false,
          },
        });
        commit("setUserDetail", {});
        this.$router.replace("/auth");
      }
    });
  },
  firebaseGetUsers({ commit }) {
    firebaseDb.ref("users").on("child_added", (snapshot) => {
      let userDetail = snapshot.val();
      let userId = snapshot.key;
      commit("addUser", {
        userId,
        userDetail,
      });
    });
    firebaseDb.ref("users").on("child_changed", (snapshot) => {
      let userDetail = snapshot.val();
      let userId = snapshot.key;
      commit("updateUser", {
        userId,
        userDetail,
      });
    });
  },
  firebaseUpdateUser({}, payload) {
    if (payload.userId) {
      firebaseDb.ref("users/" + payload.userId).update(payload.updates);
    }
  },
  firebaseGetMessage({ commit }, otherUserId) {
    let userId = state.userDetail.userId;
    messageRef = firebaseDb.ref("/chats/" + userId + "/" + otherUserId);
    messageRef.on("child_added", (snapshot) => {
      let messageDetails = snapshot.val();
      let messageId = snapshot.key;
      commit("addMessage", {
        messageId,
        messageDetails,
      });
    });
  },
  firebaseStopGettingMessage({ commit }) {
    if (messageRef) {
      messageRef.off("child_added");
      commit("clearMessage");
    }
  },
  firebaseSendMessage({}, payload) {
    firebaseDb
      .ref("chats/" + state.userDetail.userId + "/" + payload.otherUserId)
      .push(payload.message);
    payload.message.from = "them";
    firebaseDb
      .ref("chats/" + payload.otherUserId + "/" + state.userDetail.userId)
      .push(payload.message);
  },
};

const getters = {
  users: (state) => {
    let usersFilter = {};
    Object.keys(state.users).forEach((key) => {
      if (key !== state.userDetail.userId) {
        usersFilter[key] = state.users[key];
      }
    });
    return usersFilter;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
