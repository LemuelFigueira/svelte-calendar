import { writable } from 'svelte/store';

export const isMounting = writable<boolean>(true);
