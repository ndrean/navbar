import { action, observable } from "mobx";

const store = observable({
  open: false,
  setModalOpen: action(function setOpen() {
    store.open = true;
  }),
  setModalClose: action(function setLodalClose() {
    store.open = false;
  }),
  toggleModal: action(function toggleModal() {
    return (store.open = !store.open);
  }),
  //
  showForm: false,
  toggleForm: action(function toggleForm() {
    return (store.showForm = !store.showForm);
  }),
  //
  isSignedIn: false,
  toggleSgn: action(function toggleSgn() {
    return (store.isSignedIn = !store.isSignedIn);
  }),
  get setSignedIn() {
    return store.isSignedIn ? "Sign out" : "Sign in";
  },
  //
  nb: 0,
  inc: action(function inc() {
    return store.nb++;
  }),
  //
  welcome: "Please sign in",
  get setWelcome() {
    return store.isSignedIn ? "Welcome back" : "Please sign in";
  },
  setMsg: action(function setMsg() {
    return (store.welcome = store.isSignedIn
      ? "Welcome back"
      : "Please sign in");
  }),
  //
  users: [],
  addUser: action(function addUser(data) {
    store.users.push(data);
  }),
  get nbUsers() {
    return store.users.length;
  },
  getUserEmail: function (idx) {
    if (store.users.length > 0) return store.users[idx].email;
  },
});

export default store;
