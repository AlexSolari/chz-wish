import { User } from './types';
import { browser } from '$app/environment';

export const currentUser = $state({
    name: browser ? (localStorage.content as User) || User.chz : User.chz
});
