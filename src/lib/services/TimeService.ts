import moment from 'moment';
import Axios from './axios';
const baseService = 'auth';
const getAvalaible = () => {
	return Math.floor(Math.random() * 1000) < 500;
};
const availableTimes = () => {
	let times = [];
	for (let index = 9; index <= 23; index++) {
		times.push({
			time: `${index == 9 ? '0' : ''}${index}:00`,
			available: getAvalaible()
		});
	}
	return times;
};
class TimeService {
	get(doctor_id: string, service_id: string) {
		return {
			data: {
				"2024-10": [
					{
						"date": "2024-11-10",
						"times": [
							{
								"time": "14:00",
								"status": "available"
							},
							{
								"time": "14:30",
								"status": "available"
							},
							{
								"time": "15:00",
								"status": "available"
							},
							{
								"time": "15:30",
								"status": "available"
							},
							{
								"time": "16:00",
								"status": "available"
							},
							{
								"time": "16:30",
								"status": "available"
							},
							{
								"time": "17:00",
								"status": "available"
							},
							{
								"time": "17:30",
								"status": "available"
							},
							{
								"time": "18:00",
								"status": "available"
							},
							{
								"time": "18:30",
								"status": "available"
							},
							{
								"time": "19:00",
								"status": "available"
							},
							{
								"time": "19:30",
								"status": "available"
							}
						]
					},
					{
						"date": "2024-11-12",
						"times": [
							{
								"time": "14:00",
								"status": "available"
							},
							{
								"time": "14:30",
								"status": "available"
							},
							{
								"time": "15:00",
								"status": "available"
							},
							{
								"time": "15:30",
								"status": "available"
							},
							{
								"time": "16:00",
								"status": "available"
							},
							{
								"time": "16:30",
								"status": "available"
							},
							{
								"time": "17:00",
								"status": "available"
							},
							{
								"time": "17:30",
								"status": "available"
							},
							{
								"time": "18:00",
								"status": "available"
							},
							{
								"time": "18:30",
								"status": "available"
							},
							{
								"time": "19:00",
								"status": "available"
							},
							{
								"time": "19:30",
								"status": "available"
							}
						]
					},
					{
						"date": "2024-11-17",
						"times": [
							{
								"time": "14:00",
								"status": "available"
							},
							{
								"time": "14:30",
								"status": "available"
							},
							{
								"time": "15:00",
								"status": "available"
							},
							{
								"time": "15:30",
								"status": "available"
							},
							{
								"time": "16:00",
								"status": "available"
							},
							{
								"time": "16:30",
								"status": "available"
							},
							{
								"time": "17:00",
								"status": "available"
							},
							{
								"time": "17:30",
								"status": "available"
							},
							{
								"time": "18:00",
								"status": "available"
							},
							{
								"time": "18:30",
								"status": "available"
							},
							{
								"time": "19:00",
								"status": "available"
							},
							{
								"time": "19:30",
								"status": "available"
							}
						]
					},
					{
						"date": "2024-11-19",
						"times": [
							{
								"time": "14:00",
								"status": "available"
							},
							{
								"time": "14:30",
								"status": "available"
							},
							{
								"time": "15:00",
								"status": "available"
							},
							{
								"time": "15:30",
								"status": "available"
							},
							{
								"time": "16:00",
								"status": "available"
							},
							{
								"time": "16:30",
								"status": "available"
							},
							{
								"time": "17:00",
								"status": "available"
							},
							{
								"time": "17:30",
								"status": "available"
							},
							{
								"time": "18:00",
								"status": "available"
							},
							{
								"time": "18:30",
								"status": "available"
							},
							{
								"time": "19:00",
								"status": "available"
							},
							{
								"time": "19:30",
								"status": "available"
							}
						]
					}
				],
				"2024-11": []
			}
		}
		return Axios.get(`/clinic_service/clinics/availableTime?doctor_id=${doctor_id}&service_id=${service_id}`)
	}
}
export default new TimeService();
