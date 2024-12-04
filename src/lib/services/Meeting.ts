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
    enter() {
        return {
            data: null
        }

        // return axios.get("/apiUrl for getting meeting enter script");
    }

}
export default new MeetingService();
