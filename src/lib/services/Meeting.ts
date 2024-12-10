import axios from "./axios";
const baseService = "auth";
const getAvalaible = () => {
  return Math.floor(Math.random() * 1000) < 500;
};
class MeetingService {
  get(trackingCode: string | number) {
    // return {
    //     data: {
    //         book_date: new Date(),
    //         time: '19:30 - 18:30'
    //     }
    // }
    return axios.get(`/clinic_service/clinics/booking/${trackingCode}`);
  }
  enter() {
    return {
      data: null,
    };

    // return axios.get("/apiUrl for getting meeting enter script");
  }
}
export default new MeetingService();
