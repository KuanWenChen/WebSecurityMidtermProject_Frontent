const backend = "";
const API_URL = backend + "/api";

const api = {
  server: backend,
  handshake: API_URL,
  getComments: {
    get: API_URL + "/getComments.php",
    get$: API_URL + "/getComments.php?id=",
  },
  getToken: {
    get: API_URL + "/getToken.php",
  },
  isLive: {
    get: API_URL + "/isLive.php",
  },
  login: {
    post$: API_URL + "/login.php",
  },
  logout: {
    post$: API_URL + "/logout.php",
  },
  publish: {
    post$: API_URL + "/publish.php",
  },
  republish: {
    post$: API_URL + "/republish.php",
  },
  delete: {
    post$: API_URL + "/delete.php",
  },
  register: {
    post$: API_URL + "/register.php",
  },
  getTitle: {
    get: API_URL + "/getTitle.php",
  },
  setTitle: {
    post$: API_URL + "/setTitle.php",
  },
};

Object.freeze(api);
export default api;
