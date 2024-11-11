import { writable } from "svelte/store";

function createModal() {
    const { set, update, subscribe } = writable<any[]>([]);
    return {
        set,
        update,
        subscribe,
    };
}

export const modal = createModal();
