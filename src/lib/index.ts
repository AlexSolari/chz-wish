export function post<TType>(url: string, data: TType): Promise<Response> {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            data: data
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
