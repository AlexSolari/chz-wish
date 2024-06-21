import { writable } from 'svelte/store';
import { User } from './types';
import { browser } from '$app/environment';

const stored = browser ? localStorage.content as User || User.chz : User.chz;
export const currentUser = writable(stored);