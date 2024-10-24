import { currentUser } from '$lib/stores.svelte';

export function post<TType>(url: string, data: TType): Promise<Response> {
    const userName = currentUser.name;

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            user: userName,
            data: data
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
