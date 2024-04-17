import { writable } from 'svelte/store';
import { Users } from './types';
import { browser } from '$app/environment';

const stored = browser ? localStorage.content || Users.chz : Users.chz;
export const currentUser = writable(stored);

currentUser.subscribe((value) => {
    if (browser && value){
        localStorage.content = value;
    }
})