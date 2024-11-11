import { writable } from "svelte/store";

function createToasts() {
    const { set, update, subscribe } = writable<'dark' | 'light'>('dark');
    return {
        set,
        update,
        subscribe,
    };
}

export const theme = createToasts();
