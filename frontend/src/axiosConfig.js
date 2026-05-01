import axios from "axios";

const instance = axios.create({
  baseURL: "https://splendid-imagination-production-3a81.up.railway.app/api"
});

export default instance;