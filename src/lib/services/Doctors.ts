import axios from "./axios";
const baseService = "auth";
const getAvalaible = () => {
  return Math.floor(Math.random() * 1000) < 500;
};
const availableTimes = () => {
  let times = [];
  for (let index = 9; index <= 23; index++) {
    times.push({
      time: `${index == 9 ? "0" : ""}${index}:00`,
      available: getAvalaible(),
    });
  }
  return times;
};
class DcotorsService {
  config() {
    return axios.get(`/clinic_service/clinics/config`);
  }
  get(service: string | number) {
    return axios.get(`/clinic_service/clinics/services/${service}/doctors`);
  }
  services() {
    return axios.get("/clinic_service/clinics/services");
  }
  sendReservation(form: any) {
    return axios.post(`/clinic_service/clinics/book`, {
      ...form,
    });
  }
}
export default new DcotorsService();
