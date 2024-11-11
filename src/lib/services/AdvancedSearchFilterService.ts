import axios from "./axios";
const baseService = 'auth'
let random = (count: number) => {
    return Math.floor(Math.random() * count)
}
const getRandomRole = () => {
    const randomNumber = random(1000)
    if (randomNumber % 3 == 0) {
        return 'admin'
    } else if (randomNumber % 3 == 1) {
        return 'expert'
    } else {
        return 'company_manager'
    }
}
const RandomStatus = () => {
    const randomNumber = random(1000)
    if (randomNumber % 4 == 0) {
        return 'active'
    } else if (randomNumber % 4 == 1) {
        return 'canceled'
    } else if (randomNumber % 4 == 2) {
        return 'canceled_request'
    } else {
        return 'send_to_manager'
    }
}
const getRuleItem = () => {
    return {
        "id": random(1000),
        judgment_number: random(5000),
        title: "عنوان قانون",
        post_managers: [
            {
                name: 'محمد عزیزی',
                id: random(100)
            },
            {
                name: 'محمد عزیزی',
                id: random(100)
            },
            {
                name: 'محمد عزیزی',
                id: random(100)
            }
        ],
        post_experts: [
            {
                name: 'محمد عزیزی',
                id: random(100)
            },
            {
                name: 'محمد عزیزی',
                id: random(100)
            },
            {
                name: 'محمد عزیزی',
                id: random(100)
            }
        ],
        rules_fileds: [
            {
                title: "شماره موبایل",
                id: random(100),
            },
            {
                title: "تاریخ ارسال",
                id: random(100)
            },
            {
                title: "مبدا",
                id: random(100)
            }
        ],
        matching_shipments: random(100),
        status: RandomStatus(),
        "expiredAt": "2024-09-01T11:05:11.854Z",
        "createdAt": "2024-09-01T11:05:11.854Z"
    }
}
type advancedFilterType = {
    title: string;
    period: string;
    filters: string[];
    userId: number | string
}
class AdvancedSearchFilterService {
    get() {
        // return axios.get('/AdvancedSearchFilters',)
        return new Promise((resolve, reject) => {
            resolve({
                "statusCode": "OK",
                "data": {
                    "items": [
                        {
                            "id": 1,
                            "title": "شهر مبدا",
                            items: ['تهران', 'شیراز', 'قم'],
                            "period": "LastDay"
                        },
                        {
                            "id": 1,
                            "title": "شهر مبدا",
                            items: ['تهران', 'شیراز', 'قم'],
                            "period": "LastDay"
                        },
                        {
                            "id": 1,
                            "title": "شهر مبدا",
                            items: ['تهران', 'شیراز', 'قم'],
                            "period": "LastDay"
                        },
                    ]
                },
                "message": "string",
                "invalidItems": [
                    {
                        "name": "string",
                        "reason": "string"
                    }
                ],
                "isSuccess": true
            })
        })
    }
    post(data: advancedFilterType) {
        return axios.post('/SearchPatterns', { data })
    }
}
export default new AdvancedSearchFilterService();