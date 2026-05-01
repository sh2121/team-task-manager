import axios from "axios";

const instance = axios.create({
  baseURL: "splendid-imagination-production-3a81.up.railway.app"
});

export default instance;