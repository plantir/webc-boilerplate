import { writable } from "svelte/store";

function createModal() {
    const { set, update, subscribe } = writable<any[]>([]);
    return {
        set,
        update,
        subscribe,
    };
}

export const layoutStore = writable<boolean>(true);
export const apiToken = writable<string>('');
export const baseURL = import.meta.env.VITE_BASE_URL ?? 'http://localhost:3000';
