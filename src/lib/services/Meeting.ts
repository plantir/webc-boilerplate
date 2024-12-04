import axios from "./axios";
const baseService = "auth";
const getAvalaible = () => {
    return Math.floor(Math.random() * 1000) < 500;
};
class MeetingService {
    get(token: string | number) {
        return {
            data: {
                book_date: new Date(),
                time: '19:30 - 18:30'
            }
        }
        // return axios.get(`/apiURL for geeting meeting detail`, {
        //     params: {
        //         data: {
        //             token
        //         }
        //     }
        // });
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
export default new MeetingService();
