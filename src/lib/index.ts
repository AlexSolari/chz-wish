import { get as getFromStore } from 'svelte/store';
import { currentUser as userStore  } from "$lib/stores";

export function get(url: string, data: any = {}) : Promise<Response>{
    const currentUser = getFromStore(userStore);
    const dataWithUser = {user: currentUser, ...data};
    const urlWithQuery = `${url}?${new URLSearchParams(dataWithUser)}`;

    return fetch(urlWithQuery);
}

export function post(url: string, data: any = {}) : Promise<Response>{
    const currentUser = getFromStore(userStore);

    return fetch(url, {
        method: "POST",
        body: JSON.stringify({
            user: currentUser,
            data: data,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}