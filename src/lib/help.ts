import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });
export function validate(type: any, value: string) {
  switch (type) {
    case "email":
      return (
        value &&
        value.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      );
    case "phone":
      return value && value.match(/09[0|1|2|3|4](?:[0-9]){8}/gi);
    case "string":
      return !!value;
    default:
      break;
  }
}
export function clickOutside(node: any) {
  const handleClick = (event: any) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent("click_outside", node));
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const chartColors = [
  "rgba(21, 112, 239, 1)",
  "rgba(46, 144, 250, 1)",
  "rgba(209, 233, 255, 1)",
  "rgba(132, 202, 255, 1)",
  "rgba(106, 194, 213, 1)",
];
export const labelsFilter = {
  month: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ],
  week: ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه"],
  year: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ],
  today: [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ],
};
export const RoleNames = {
  expert: "متخصص",
  company_manager: "مدیر شرکت",
  admin: "ادمین",
};
export const missionsFields = [
  {
    title: "شماره موبایل",
    value: "mobile",
  },
  {
    title: "شهر مبدا",
    value: "send_city",
  },
];
export const timePeriod = [
  {
    title: "دیروز",
    value: "LastDay",
  },
  {
    title: "یک هفته اخیر",
    value: "LastWeek",
  },
  {
    title: "دو هفته اخیر",
    value: "LastTwoWeek",
  },
  {
    title: "یک ماه اخیر",
    value: "LastMonth",
  },
];
export const filtersToArray = (filters: any) => {
  let arr: any = [];
  filters.forEach((element: any) => {
    if (element.includes("==")) {
      const objectArr = element.split("==");
      arr.push({
        field: objectArr[0],
        type: "==",
        items: objectArr[1].split("|"),
      });
    } else if (element.includes("@=")) {
      const objectArr = element.split("@=");
      arr.push({
        field: objectArr[0],
        type: "@=",
        items: objectArr[1].split("|"),
      });
    }
  });
  return arr;
};
export const filtersToApi = (filters: any) => {
  let arr: any = [];
  filters.forEach((element: any) => {
    arr.push(
      `${element.field}${element.type}${element.items.join("|").toString()}`
    );
  });
  return arr;
};
export const ArrayToObject = (filters: any) => {
  let arr: any = [];
  filters.forEach((element: any) => {
    arr.push(
      `${element.field}${element.type}${typeof element.items == "object" ? element.items.join("|").toString() : element.items}`
    );
  });
  return arr;
};
export const ObjectToArray = (object: any, type: "@=" | "==" = "@=") => {
  let arr: any = [];
  const keys = Object.keys(object);
  keys.forEach((key) => {
    if (object[key]) {
      arr.push(`${key}${type}${object[key]}`);
    }
  });
  return arr;
};
export const parcelsTypeItems = [
  {
    title: "شامل",
    value: "@=",
  },
  {
    title: "برابر",
    value: "==",
  },
  {
    title: "برابر نباشد",
    value: "!=",
  },
  {
    title: "بزرگتر از",
    value: ">",
  },
  {
    title: "کوچکتر از",
    value: "<",
  },
  {
    title: "شروع با",
    value: "_=",
  },
  {
    title: "پایان با",
    value: "_-=",
  },
];
export const userRoles: any = [
  {
    title: "مدیر پست",
    value: "PostManager",
  },
  {
    title: "کارشناس پست",
    value: "PostExpert",
  },
  {
    title: "مدیر موضوع",
    value: "IssueManager",
  },
  {
    title: "کارشناس موضوع",
    value: "IssueExpert",
  },
];
let daysIndex = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];

export const days: any = {
  Sa: "شنبه",
  Su: "یک‌‌ شنبه",
  Mo: "دوشنبه",
  Tu: "سه شنبه",
  We: "چهارشنبه",
  Th: "پنجشنبه",
  Fr: "جمعه",
};
export const showDateTime = (date: any, time: any) => {
  //
  //
  return `${moment(date).format("dddd")} ${moment(date).format("jD")} ${moment(date).format("jMMMM")} ماه ${moment(date).format("jYYYY")} ${time ? `ساعت ${time}` : ""}`;
};
