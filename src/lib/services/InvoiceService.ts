import Axios from "./axios";

class InvoiceService {
  get(uuid: string) {
    return Axios.get(`/clinic_service/clinics/invoice/${uuid}`);
  }
  pay(uuid: string, data) {
    return Axios.post(`/clinic_service/clinics/invoice/${uuid}/pay`, data);
  }
}
export default new InvoiceService();
