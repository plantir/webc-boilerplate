import { apiToken } from "../stores/layout";
import axios from "./axios";
import moment from 'moment'
const baseService = 'auth'
const getAvalaible = () => {
    return Math.floor(Math.random() * 1000) < 500
}
const availableTimes = () => {
    let times = []
    for (let index = 9; index <= 23; index++) {
        times.push({
            time: `${index == 9 ? '0' : ''}${index}:00`,
            available: getAvalaible()
        })

    }
    return times
}
class DcotorsService {
    get(service: string | number) {
        // return {
        //     data: [
        //         {
        //             "id": 79,
        //             "display_name": "خانم الهام قاسمی",
        //             "image": "/api/download/1727682725705_original.png"
        //         }
        //     ]
        // }
        return axios.get(`/clinic_service/clinics/services/${service}/doctors`)
    }
    services() {
        // return {
        //     data: [
        //         {
        //             "id": 122,
        //             "name": "مشاوره تلفنی",
        //             "image": "/api/download/1727683057772_original.png",
        //             "duration": 30,
        //             "constraint_type": "calendar_based",
        //             "total_amount": 700000,
        //             "prepay_amount": 700000
        //         },
        //         {
        //             "id": 121,
        //             "name": "مشاوره حضوری",
        //             "image": "/api/download/1727683117867_original.png",
        //             "duration": 120,
        //             "constraint_type": "calendar_based",
        //             "total_amount": 1000000,
        //             "prepay_amount": 500000
        //         },
        //         {
        //             "id": 123,
        //             "name": "مشاوره واتساپی",
        //             "image": "/api/download/1727683042130_original.png",
        //             "duration": 30,
        //             "constraint_type": "limited_by_day_and_quantity",
        //             "total_amount": 500000,
        //             "prepay_amount": 500000
        //         }
        //     ]
        // }
        return axios.get('/clinic_service/clinics/services')
    }
    sendReservation(form: any) {
        return axios.post(`/clinic_service/clinics/book`, {
            ...form
        })
    }

}
export default new DcotorsService();