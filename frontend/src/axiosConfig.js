import axios from "axios";

const instance = axios.create({
  baseURL: "https://railway.com/project/e5bcd3d7-51f6-4cd2-b922-dd860876161d/service/189b4db7-8bb4-4500-9dea-d076423b9b99?environmentId=c5d38f36-414c-418d-aafe-dc45bfb31a77&id=f6acaf2b-6bd6-415a-9eee-3a5fea9f8cb2#details"
});

export default instance;