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
  reservationInformation(token: any) {
    return {
      data: {
        book_date: "2024-12-11",
        callback_url: "http://localhost:5173/gateway/callback",
        doctor: { id: 79, display_name: 'خانم الهام قاسمی', image: '/api/download/1727682725705_original.png' },
        service: {
          "id": 121,
          "name": "مشاوره حضوری",
          "image": "/api/download/1727683117867_original.png",
          "duration": 120,
          "is_meeting": 0,
          "constraint_type": "calendar_based",
          "total_amount": 1000000,
          "prepay_amount": 500000
        },
        start_time: "18:00",
        user: {
          "name": "aryabod",
          "family": "kheyrkhahan",
          "email": "aryabod.kh@gmail.com",
          "mobile": "09356664685",
          "national_code": "002271159",
          "accept_terms": true
        },
      }
    }
    return axios.get(`/clinic_service/clinics/information`, {
      params: {
        token
      }
    });
  }
  sendReservationAgain(form) {
    return axios.post(`/clinic_service/clinics/book`, {
      ...form,
    });
  }
}
export default new DcotorsService();
