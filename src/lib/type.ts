import CallIcon from "./Components/Icons/CallIcon.svelte";

export type stepTypes = 'expert' | 'service' | 'date' | 'information' | 'confirm'
export let services = [
    {
        icon: CallIcon,
        title: 'مشاوره تلفنی',
        value: 'phone'
    },
    {
        icon: CallIcon,
        title: 'مشاوره حضوری',
        value: 'person'
    },
    {
        icon: CallIcon,
        title: 'مشاوره واتساپی',
        value: 'whatsapp'
    }
];
export let serviceLabel: any = {
    'phone': 'مشاوره تلفنی',
    'person': 'مشاوره حضوری',
    'whatsapp': 'مشاوره واتساپی',
} 