import { action, observable } from "mobx";

const store = observable({
  mode: null,
  setMode: action((val) => (store.mode = val)),
  // modal version
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
  addUsers: action((data) => {
    const emails = Array.from(store.users, ({ email }) => email);
    const newdata = data.filter((user) => !emails.includes(user.email));
    return (store.users = [...store.users, ...newdata]); // concate 2 arrays -> 2 spread
  }),
  get nbUsers() {
    return store.users.length;
  },
  getUserEmail: function (idx) {
    if (store.users.length > 0) return store.users[idx].email;
  },
  getUserByEmail: function (email) {
    return store.users.find((user) => {
      if (user.email === email) return user;
      return null;
    });
  },
  //
  current: {},
  setCurrent: action((data) => {
    store.current = data;
  }),
  rmCurrent: action(function rmUser(user) {
    store.users = store.users.filter((u) => u.email !== user.email);
    store.current = {};
  }),
  //
  token: "",
  setToken: action(function ({ token }) {
    store.token = token;
  }),
});

export default store;
