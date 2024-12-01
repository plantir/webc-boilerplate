import Axios from "./axios";
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
class TimeService {
  get(doctor_id: string, service_id: string) {
    return Axios.get(
      `/clinic_service/clinics/availableTime?doctor_id=${doctor_id}&service_id=${service_id}`
    );
  }
}
export default new TimeService();
