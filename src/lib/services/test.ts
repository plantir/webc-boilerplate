import axios from "./axios";

export class TestService {
  static get() {
    return axios.get("/test");
  }
}
