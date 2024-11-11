import { writable } from 'svelte/store';

export type ToastItem = {
    id?: number;
    type?: 'error' | 'warning' | 'primary' | 'success' | 'info';
    text?: string;
    duration?: number;
    link?: string;
};

function createToasts() {
    const { set, update, subscribe } = writable<ToastItem[]>([]);

    function addToast(item: Partial<ToastItem>) {
        const id = new Date().getTime();

        setTimeout(() => {
            update((toasts) => toasts.filter((toast) => toast.id !== id));
        }, item.duration ?? 5000);

        update((toasts) => {
            return [
                ...toasts,
                {
                    id,
                    ...item
                }
            ];
        });
    }

    return {
        update,
        subscribe,
        addToast
    };
}

export const toasts = createToasts();
